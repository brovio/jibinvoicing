import { useState } from "react";
import { showClientDeletedToast } from "@/utils/toastUtils";
import { ClientEntry } from "../types/clients";
import { useClientFilters } from "./useClientFilters";
import { useTableSelection } from "@/hooks/useTableSelection";

export const useClientsTable = (
  data: ClientEntry[],
  onClientAdded?: (client: ClientEntry) => void,
  onClientUpdated?: (client: ClientEntry) => void,
  onClientDeleted?: (client: ClientEntry) => void
) => {
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

  return {
    rateFilter,
    setRateFilter,
    currencyFilter,
    setCurrencyFilter,
    requestSort,
    filteredAndSortedData,
    handleSelectAll,
    handleRowSelect,
    clearSelection,
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
  };
};