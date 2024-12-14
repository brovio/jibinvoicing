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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; client?: ClientEntry; isMultiple?: boolean }>({
    isOpen: false
  });

  const [bulkEditDialog, setBulkEditDialog] = useState<{
    isOpen: boolean;
    type: 'currency' | 'rate';
    value: string;
  }>({ isOpen: false, type: 'currency', value: '' });

  const handleSave = (client: ClientEntry) => {
    if (modalState.mode === 'add') {
      onClientAdded?.(client);
    } else if (modalState.mode === 'edit') {
      onClientUpdated?.(client);
    }
    setModalState({ isOpen: false, mode: 'add' });
  };

  const handleDelete = (clientsToDelete: ClientEntry | ClientEntry[]) => {
    if (Array.isArray(clientsToDelete)) {
      clientsToDelete.forEach(client => {
        onClientDeleted?.(client);
      });
      showClientDeletedToast(`${clientsToDelete.length} clients`);
    } else {
      onClientDeleted?.(clientsToDelete);
      showClientDeletedToast(clientsToDelete.company);
    }
    setDeleteConfirm({ isOpen: false });
  };

  const handleBulkAction = (action: 'deleteAll' | 'editCurrency' | 'editRate' | 'deleteSelected') => {
    switch (action) {
      case 'deleteAll':
        setDeleteConfirm({ isOpen: true, isMultiple: true });
        break;
      case 'deleteSelected':
        const selectedClientsList = data.filter(client => selectedClients.has(client.company));
        if (selectedClientsList.length > 0) {
          setDeleteConfirm({ isOpen: true, isMultiple: true });
        }
        break;
      case 'editCurrency':
        setBulkEditDialog({ isOpen: true, type: 'currency', value: '' });
        break;
      case 'editRate':
        setBulkEditDialog({ isOpen: true, type: 'rate', value: '' });
        break;
    }
  };

  const handleBulkEdit = () => {
    const selectedClientsList = data.filter(client => selectedClients.has(client.company));
    selectedClientsList.forEach(client => {
      const updatedClient = { ...client };
      if (bulkEditDialog.type === 'currency') {
        updatedClient.currency = bulkEditDialog.value;
      } else {
        updatedClient.rate = Number(bulkEditDialog.value);
      }
      onClientUpdated?.(updatedClient);
    });
    setBulkEditDialog({ isOpen: false, type: 'currency', value: '' });
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
        onBulkAction={handleBulkAction}
      />

      <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
        <Table>
          <ClientsHeader 
            onSort={requestSort} 
            onSelectAll={handleSelectAll}
            totalClients={data.length}
            visibleClients={filteredAndSortedData.length}
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
              This action cannot be undone. This will permanently delete
              {deleteConfirm.isMultiple 
                ? " all selected clients"
                : deleteConfirm.client 
                  ? ` the client "${deleteConfirm.client.company}"` 
                  : " all clients"
              } from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirm({ isOpen: false })}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirm.isMultiple) {
                  const clientsToDelete = deleteConfirm.client 
                    ? [deleteConfirm.client]
                    : data.filter(client => selectedClients.has(client.company));
                  handleDelete(clientsToDelete);
                } else if (deleteConfirm.client) {
                  handleDelete(deleteConfirm.client);
                }
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog 
        open={bulkEditDialog.isOpen} 
        onOpenChange={(open) => setBulkEditDialog(current => ({ ...current, isOpen: open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Bulk Edit {bulkEditDialog.type === 'currency' ? 'Currency' : 'Rate'}
            </DialogTitle>
          </DialogHeader>
          {bulkEditDialog.type === 'currency' ? (
            <select
              className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2 w-full"
              value={bulkEditDialog.value}
              onChange={(e) => setBulkEditDialog(current => ({ ...current, value: e.target.value }))}
            >
              <option value="">Select Currency</option>
              <option value="AUD">AUD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
            </select>
          ) : (
            <Input
              type="number"
              placeholder="Enter new rate"
              value={bulkEditDialog.value}
              onChange={(e) => setBulkEditDialog(current => ({ ...current, value: e.target.value }))}
              className="bg-[#252A38] border-gray-800 text-white"
            />
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBulkEditDialog({ isOpen: false, type: 'currency', value: '' })}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkEdit}
              className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
              disabled={!bulkEditDialog.value}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
