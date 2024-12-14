import { useState } from 'react';
import { ClientEntry } from '../types/clients';

export const useClientSelection = () => {
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [selectAllMode, setSelectAllMode] = useState<boolean>(false);

  const handleSelectAll = (selectAll: boolean, includeAll?: boolean) => {
    setSelectAllMode(selectAll && !!includeAll);
    setSelectedClients(new Set());
  };

  const handleRowSelect = (client: ClientEntry, selected: boolean) => {
    setSelectedClients(prev => {
      const newSelected = new Set(prev);
      if (selected) {
        newSelected.add(client.company);
      } else {
        newSelected.delete(client.company);
      }
      return newSelected;
    });
    
    // If selecting individual items, ensure we're not in selectAll mode
    if (selected) {
      setSelectAllMode(false);
    }
  };

  return {
    selectedClients,
    selectAllMode,
    handleSelectAll,
    handleRowSelect
  };
};