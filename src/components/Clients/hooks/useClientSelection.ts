import { useState } from 'react';
import { ClientEntry } from '../types/clients';

export const useClientSelection = () => {
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

  const handleSelectAll = (selectAll: boolean, includeAll?: boolean) => {
    // If includeAll is true or not specified, select all clients
    // If includeAll is false, deselect all clients
    if (selectAll) {
      const newSelected = new Set<string>();
      // This part depends on how you want to handle the selection
      // You might need to pass the clients as a prop to the component using this hook
      return newSelected;
    } else {
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
    handleSelectAll,
    handleRowSelect
  };
};