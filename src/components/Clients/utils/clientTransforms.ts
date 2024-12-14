import { ClientEntry } from "../types/clients";

type DatabaseClient = {
  id?: string;
  company: string;
  contact_name: string;
  email: string;
  phone?: string;
  address?: string;
  rate: number;
  currency: string;
  notes?: string;
  website?: string;
  created_at?: string;
  updated_at?: string;
}

export const toDatabase = (client: ClientEntry): DatabaseClient => ({
  company: client.company,
  contact_name: client.contactName,
  email: client.email,
  phone: client.phone,
  address: client.address,
  rate: client.rate,
  currency: client.currency,
  notes: client.notes,
  website: client.website
});

export const fromDatabase = (dbClient: DatabaseClient): ClientEntry => ({
  company: dbClient.company,
  contactName: dbClient.contact_name,
  email: dbClient.email,
  phone: dbClient.phone,
  address: dbClient.address,
  rate: dbClient.rate,
  currency: dbClient.currency,
  notes: dbClient.notes,
  website: dbClient.website
});