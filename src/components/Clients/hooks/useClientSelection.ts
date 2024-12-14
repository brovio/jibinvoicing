import { useState } from 'react';
import { ClientEntry } from '../types/clients';

export const useClientSelection = () => {
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [selectAllMode, setSelectAllMode] = useState<boolean>(false);
  const [excludedClients, setExcludedClients] = useState<Set<string>>(new Set());

  const handleSelectAll = (selectAll: boolean, includeAll?: boolean) => {
    setSelectAllMode(selectAll && !!includeAll);
    setSelectedClients(new Set());
    setExcludedClients(new Set());
  };

  const handleRowSelect = (client: ClientEntry, selected: boolean) => {
    if (selectAllMode) {
      setExcludedClients(prev => {
        const newExcluded = new Set(prev);
        if (!selected) {
          newExcluded.add(client.company);
        } else {
          newExcluded.delete(client.company);
        }
        return newExcluded;
      });
    } else {
      setSelectedClients(prev => {
        const newSelected = new Set(prev);
        if (selected) {
          newSelected.add(client.company);
        } else {
          newSelected.delete(client.company);
        }
        return newSelected;
      });
    }
  };

  const isSelected = (client: ClientEntry) => {
    if (selectAllMode) {
      return !excludedClients.has(client.company);
    }
    return selectedClients.has(client.company);
  };

  const clearSelection = () => {
    setSelectedClients(new Set());
    setSelectAllMode(false);
    setExcludedClients(new Set());
  };

  return {
    selectedClients,
    selectAllMode,
    handleSelectAll,
    handleRowSelect,
    clearSelection,
    isSelected
  };
};