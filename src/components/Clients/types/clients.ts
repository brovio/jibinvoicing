export interface ClientEntry {
  company: string;
  contactName: string;
  email: string;
  currency: string;
  rate: number;
  phone?: string;
  address?: string;
  notes?: string;
  website?: string;
}

export interface ClientsTableProps {
  data: ClientEntry[];
  onClientAdded?: (client: ClientEntry) => void;
  onClientUpdated?: (client: ClientEntry) => void;
  onClientDeleted?: (client: ClientEntry) => void;
}