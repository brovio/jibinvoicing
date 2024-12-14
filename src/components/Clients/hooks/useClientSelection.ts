import { useState } from 'react';
import { ClientEntry } from '../types/clients';

export const useClientSelection = () => {
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

  const handleSelectAll = (selectAll: boolean, includeAll?: boolean) => {
    if (!selectAll) {
      setSelectedClients(new Set());
      return;
    }
    
    // Logic will be handled by the parent component
    // which has access to either filtered or all clients
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