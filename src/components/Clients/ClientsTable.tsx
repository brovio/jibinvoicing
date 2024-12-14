import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ClientsHeader } from "./ClientsHeader";
import { ClientsRow } from "./ClientsRow";
import { ClientModal } from "./ClientModal";
import { TableActions } from "./TableActions";
import { TablePagination } from "./TablePagination";
import { toDatabase, fromDatabase } from "./utils/clientTransforms";
import { showClientDeletedToast } from "@/utils/toastUtils";
import { useClientFilters } from "./hooks/useClientFilters";
import { useClientSelection } from "./hooks/useClientSelection";
import { ClientEntry, ClientsTableProps } from "./types/clients";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { useTableOperations } from "./TableOperations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    setSelectedClients,
    handleSelectAll: baseHandleSelectAll,
    handleRowSelect
  } = useClientSelection();

  const { handleDelete, handleBulkDelete, handleBulkUpdate, handleDeleteAll } = useTableOperations({
    onClientDeleted
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    client?: ClientEntry;
  }>({ isOpen: false, mode: 'add' });

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; client?: ClientEntry }>({
    isOpen: false
  });

  const handleSelectAll = (selectAll: boolean, includeAll?: boolean) => {
    if (selectAll) {
      const clientsToSelect = includeAll ? data : filteredAndSortedData;
      const newSelected = new Set<string>();
      clientsToSelect.forEach(client => newSelected.add(client.company));
      setSelectedClients(newSelected);
    } else {
      setSelectedClients(new Set());
    }
    baseHandleSelectAll(selectAll, includeAll);
  };

  const handleBulkDeleteAction = async () => {
    if (selectedClients.size > 0) {
      await handleBulkDelete(selectedClients);
      setSelectedClients(new Set()); // Clear selection after deletion
    }
  };

  const handleSave = async (client: ClientEntry) => {
    try {
      const dbClient = toDatabase(client);
      
      if (modalState.mode === 'add') {
        const { error, data: insertedData } = await supabase
          .from('clients')
          .insert(dbClient)
          .select()
          .single();
        
        if (error) throw error;
        if (insertedData) {
          onClientAdded?.(fromDatabase(insertedData));
        }
      } else if (modalState.mode === 'edit') {
        const { error, data: updatedData } = await supabase
          .from('clients')
          .update(dbClient)
          .eq('company', client.company)
          .select()
          .single();
        
        if (error) throw error;
        if (updatedData) {
          onClientUpdated?.(fromDatabase(updatedData));
        }
      }
      setModalState({ isOpen: false, mode: 'add' });
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('Failed to save client');
    }
  };

  const handleImportSuccess = (importedClients: ClientEntry[]) => {
    importedClients.forEach(client => {
      onClientAdded?.(client);
    });
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
            onClientsDeleted={() => window.location.reload()}
            selectedClients={selectedClients}
            onBulkUpdate={(field, value) => handleBulkUpdate(field, value, selectedClients)}
            onBulkDelete={handleBulkDeleteAction}
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

      <DeleteConfirmDialog
        isOpen={deleteConfirm.isOpen}
        client={deleteConfirm.client}
        onClose={() => setDeleteConfirm({ isOpen: false })}
        onConfirm={(client) => {
          handleDelete(client);
          setDeleteConfirm({ isOpen: false });
        }}
      />
    </>
  );
};
