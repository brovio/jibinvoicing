import { useState } from 'react';
import { ClientEntry } from '../types/clients';

export const useClientSelection = () => {
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

  const handleSelectAll = (selectAll: boolean, includeAll?: boolean) => {
    if (selectAll) {
      // Return the new Set but also update the state
      const newSelected = new Set<string>();
      setSelectedClients(newSelected);
      return newSelected;
    } else {
      // Clear selection and return empty Set
      setSelectedClients(new Set());
      return new Set<string>();
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
    setSelectedClients,
    handleSelectAll,
    handleRowSelect
  };
};