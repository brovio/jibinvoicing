import { useState } from 'react';
import { ClientEntry } from '../types/clients';

export const useClientSelection = () => {
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

  const handleSelectAll = (selectAll: boolean, clients: ClientEntry[]) => {
    if (selectAll) {
      const newSelected = new Set<string>();
      clients.forEach(client => newSelected.add(client.company));
      setSelectedClients(newSelected);
    } else {
      setSelectedClients(new Set());
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