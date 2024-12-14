import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ClientsHeader } from "./ClientsHeader";
import { ClientsRow } from "./ClientsRow";
import { ClientModal } from "./ClientModal";
import { TableActions } from "./TableActions";
import { TablePagination } from "./TablePagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { showClientDeletedToast } from "@/utils/toastUtils";
import { useClientFilters } from "./hooks/useClientFilters";
import { useClientSelection } from "./hooks/useClientSelection";
import { ClientEntry, ClientsTableProps } from "./types/clients";
import { supabase } from "@/integrations/supabase/client";

export const ClientsTable = ({ 
  data,
  onClientAdded,
  onClientUpdated,
  onClientDeleted
}: ClientsTableProps) => {
  const {
    rateFilter,
    setRateFilter,
    currencyFilter,
    setCurrencyFilter,
    requestSort,
    filteredAndSortedData
  } = useClientFilters(data);

  const {
    selectedClients,
    handleSelectAll,
    handleRowSelect
  } = useClientSelection();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    client?: ClientEntry;
  }>({ isOpen: false, mode: 'add' });

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; client?: ClientEntry }>({
    isOpen: false
  });

  const handleSave = (client: ClientEntry) => {
    if (modalState.mode === 'add') {
      onClientAdded?.(client);
    } else if (modalState.mode === 'edit') {
      onClientUpdated?.(client);
    }
    setModalState({ isOpen: false, mode: 'add' });
  };

  const handleDelete = (client: ClientEntry) => {
    setDeleteConfirm({ isOpen: false });
    onClientDeleted?.(client);
    showClientDeletedToast(client.company);
  };

  const handleImportSuccess = (importedClients: ClientEntry[]) => {
    importedClients.forEach(client => {
      onClientAdded?.(client);
    });
  };

  const handleClientsDeleted = () => {
    window.location.reload();
  };

  const handleBulkUpdate = async (field: string, value: string | number) => {
    try {
      const selectedCompanies = Array.from(selectedClients);
      const { error } = await supabase
        .from('clients')
        .update({ [field]: value })
        .in('company', selectedCompanies);

      if (error) throw error;

      // Refresh the data after bulk update
      window.location.reload();
    } catch (error) {
      console.error('Error updating clients:', error);
      toast.error('Failed to update clients');
    }
  };

  return (
    <>
      <TableActions
        onImportSuccess={handleImportSuccess}
        clients={data}
        onAddClick={() => setModalState({ isOpen: true, mode: 'add' })}
        onRateFilterChange={setRateFilter}
        onCurrencyFilterChange={setCurrencyFilter}
      />

      <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
        <Table>
          <ClientsHeader 
            onSort={requestSort} 
            onSelectAll={handleSelectAll}
            totalClients={data.length}
            visibleClients={filteredAndSortedData.length}
            onClientsDeleted={handleClientsDeleted}
            selectedClients={selectedClients}
            onBulkUpdate={handleBulkUpdate}
          />
          <TableBody>
            {filteredAndSortedData.map((item, index) => (
              <ClientsRow 
                key={index} 
                data={item}
                isSelected={selectedClients.has(item.company)}
                onSelect={(selected) => handleRowSelect(item, selected)}
                onView={(client) => setModalState({ isOpen: true, mode: 'view', client })}
                onEdit={(client) => setModalState({ isOpen: true, mode: 'edit', client })}
                onDelete={(client) => setDeleteConfirm({ isOpen: true, client })}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination totalResults={data.length} />

      <ClientModal 
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        client={modalState.client}
        onClose={() => setModalState({ isOpen: false, mode: 'add' })}
        onSave={handleSave}
      />

      <AlertDialog 
        open={deleteConfirm.isOpen} 
        onOpenChange={(open) => setDeleteConfirm(current => ({ ...current, isOpen: open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the client
              {deleteConfirm.client && ` "${deleteConfirm.client.company}"`} and remove their data
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirm({ isOpen: false })}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm.client && handleDelete(deleteConfirm.client)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};