import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ClientsRow } from "./ClientsRow";
import { ClientModal } from "./ClientModal";
import { TableActions } from "./TableActions";
import { TablePagination } from "./TablePagination";
import { showClientDeletedToast } from "@/utils/toastUtils";
import { useClientFilters } from "./hooks/useClientFilters";
import { ClientEntry, ClientsTableProps } from "./types/clients";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { BulkEditDialog } from "./BulkEditDialog";
import { useTableSelection } from "@/hooks/useTableSelection";
import { SharedTableHeader } from "@/components/shared/TableHeader";

const clientColumns = [
  { key: 'company', label: 'Company' },
  { key: 'contactName', label: 'Contact Name' },
  { key: 'email', label: 'Email' },
  { key: 'currency', label: 'Currency' },
  { key: 'rate', label: 'Rate', align: 'right' as const },
];

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
    handleSelectAll,
    handleRowSelect,
    clearSelection,
    isSelected,
    excludedItems,
    selectAllMode,
    getSelectedItems
  } = useTableSelection<ClientEntry>();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    client?: ClientEntry;
  }>({ isOpen: false, mode: 'add' });

  const [deleteConfirm, setDeleteConfirm] = useState<{ 
    isOpen: boolean; 
    client?: ClientEntry; 
    isMultiple?: boolean 
  }>({ isOpen: false });

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
    clearSelection();
  };

  const handleBulkAction = (action: 'deleteAll' | 'editCurrency' | 'editRate' | 'deleteSelected') => {
    switch (action) {
      case 'deleteAll':
        handleDelete(data);
        break;
      case 'deleteSelected':
        const selectedClientsList = getSelectedItems(data);
        if (selectedClientsList.length > 0) {
          handleDelete(selectedClientsList);
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
    const selectedClientsList = getSelectedItems(data);
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
    clearSelection();
  };

  const handleImportSuccess = (importedClients: ClientEntry[]) => {
    importedClients.forEach(client => {
      onClientAdded?.(client);
    });
  };

  const selectedCount = selectAllMode ? 
    data.length - excludedItems.size : 
    getSelectedItems(filteredAndSortedData).length;

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
          <SharedTableHeader 
            columns={clientColumns}
            onSort={requestSort}
            onSelectAll={handleSelectAll}
            totalItems={data.length}
            visibleItems={filteredAndSortedData.length}
            selectedCount={selectedCount}
            excludedCount={excludedItems.size}
            selectAllMode={selectAllMode}
          />
          <TableBody>
            {filteredAndSortedData.map((item) => (
              <ClientsRow 
                key={item.company}
                data={item}
                isSelected={isSelected(item)}
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
        onOpenChange={(open) => setDeleteConfirm(current => ({ ...current, isOpen: open }))}
        onConfirm={handleDelete}
        client={deleteConfirm.client}
        isMultiple={deleteConfirm.isMultiple}
        getSelectedClients={() => getSelectedItems(data)}
      />

      <BulkEditDialog 
        isOpen={bulkEditDialog.isOpen}
        onOpenChange={(open) => setBulkEditDialog(current => ({ ...current, isOpen: open }))}
        type={bulkEditDialog.type}
        value={bulkEditDialog.value}
        onValueChange={(value) => setBulkEditDialog(current => ({ ...current, value }))}
        onConfirm={handleBulkEdit}
      />
    </>
  );
};