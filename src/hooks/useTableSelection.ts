import { useState } from 'react';

export interface SelectableItem {
  [key: string]: any;
  id?: string;
  company?: string;
  date?: string;
}

export const useTableSelection = <T extends SelectableItem>() => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectAllMode, setSelectAllMode] = useState<boolean>(false);
  const [excludedItems, setExcludedItems] = useState<Set<string>>(new Set());

  const getItemIdentifier = (item: T): string => {
    return item.company || item.date || item.id || '';
  };

  const handleSelectAll = (selectAll: boolean, includeAll?: boolean) => {
    setSelectAllMode(false);
    if (selectAll) {
      const newSelectedItems = new Set<string>();
      if (includeAll) {
        setSelectAllMode(true);
      }
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems(new Set());
    }
    setExcludedItems(new Set());
  };

  const handleRowSelect = (item: T, selected: boolean) => {
    const itemId = getItemIdentifier(item);
    setSelectedItems(prev => {
      const newSelected = new Set(prev);
      if (selected) {
        newSelected.add(itemId);
      } else {
        newSelected.delete(itemId);
      }
      return newSelected;
    });
  };

  const isSelected = (item: T): boolean => {
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

  const getSelectedItems = (items: T[]): T[] => {
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