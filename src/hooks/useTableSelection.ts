import { useState } from 'react';

export interface SelectableItem {
  [key: string]: any;
  id?: string;
  company?: string; // for clients
  date?: string;    // for timesheets
}

export const useTableSelection = <T extends SelectableItem>(
  getItemIdentifier: (item: T) => string = (item) => item.company || item.date || ''
) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectAllMode, setSelectAllMode] = useState<boolean>(false);
  const [excludedItems, setExcludedItems] = useState<Set<string>>(new Set());

  const handleSelectAll = (selectAll: boolean, includeAll?: boolean) => {
    setSelectAllMode(selectAll && !!includeAll);
    setSelectedItems(new Set());
    setExcludedItems(new Set());
  };

  const handleRowSelect = (item: T, selected: boolean) => {
    const itemId = getItemIdentifier(item);
    
    if (selectAllMode) {
      setExcludedItems(prev => {
        const newExcluded = new Set(prev);
        if (!selected) {
          newExcluded.add(itemId);
        } else {
          newExcluded.delete(itemId);
        }
        return newExcluded;
      });
    } else {
      setSelectedItems(prev => {
        const newSelected = new Set(prev);
        if (selected) {
          newSelected.add(itemId);
        } else {
          newSelected.delete(itemId);
        }
        return newSelected;
      });
    }
  };

  const isSelected = (item: T) => {
    const itemId = getItemIdentifier(item);
    if (selectAllMode) {
      return !excludedItems.has(itemId);
    }
    return selectedItems.has(itemId);
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
    setSelectAllMode(false);
    setExcludedItems(new Set());
  };

  const getSelectedItems = <T extends SelectableItem>(items: T[]) => {
    if (selectAllMode) {
      return items.filter(item => !excludedItems.has(getItemIdentifier(item)));
    }
    return items.filter(item => selectedItems.has(getItemIdentifier(item)));
  };

  return {
    selectedItems,
    selectAllMode,
    handleSelectAll,
    handleRowSelect,
    clearSelection,
    isSelected,
    excludedItems,
    getSelectedItems
  };
};