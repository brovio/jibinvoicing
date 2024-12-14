import { useState } from 'react';
import { ClientEntry } from '../types/clients';

export const useClientSelection = () => {
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [selectAllMode, setSelectAllMode] = useState<boolean>(false);

  const handleSelectAll = (selectAll: boolean, includeAll?: boolean) => {
    if (selectAll) {
      if (includeAll) {
        // This would typically involve selecting ALL clients, even those not currently visible
        // For now, we'll just set a flag to indicate all-selection mode
        setSelectAllMode(true);
      } else {
        // Select only currently visible clients
        setSelectAllMode(false);
      }
    } else {
      // Deselect all
      setSelectedClients(new Set());
      setSelectAllMode(false);
    }
  };

  const handleRowSelect = (client: ClientEntry, selected: boolean) => {
    const newSelected = new Set(selectedClients);
    if (selected) {
      newSelected.add(client.company);
    } else {
      newSelected.delete(client.company);
    }
    setSelectedClients(newSelected);
  };

  return {
    selectedClients,
    selectAllMode,
    handleSelectAll,
    handleRowSelect
  };
};