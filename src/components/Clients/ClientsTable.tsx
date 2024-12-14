import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ClientsRow } from "./ClientsRow";
import { ClientModal } from "./ClientModal";
import { TableActions } from "./TableActions";
import { TablePagination } from "./TablePagination";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { BulkEditDialog } from "./BulkEditDialog";
import { SharedTableHeader } from "@/components/shared/TableHeader";
import { useClientsTable } from "./hooks/useClientsTable";
import { ClientsTableProps } from "./types/clients";

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
    filteredAndSortedData,
    handleSelectAll,
    handleRowSelect,
    isSelected,
    excludedItems,
    selectAllMode,
    getSelectedItems,
    modalState,
    setModalState,
    deleteConfirm,
    setDeleteConfirm,
    bulkEditDialog,
    setBulkEditDialog,
    handleSave,
    handleDelete,
    handleBulkAction,
    handleBulkEdit
  } = useClientsTable(data, onClientAdded, onClientUpdated, onClientDeleted);

  const handleImportSuccess = (importedClients: any[]) => {
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