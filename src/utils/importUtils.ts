import { toast } from "@/components/ui/use-toast";

export interface ImportedClient {
  company: string;
  contactName: string;
  email: string;
  phone?: string;
  address?: string;
  rate: number;
  currency: string;
  notes?: string;
  website?: string;
}

export const parseCSV = (content: string): ImportedClient[] => {
  try {
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
    
    if (!headers.includes('company') || !headers.includes('contactname') || !headers.includes('email')) {
      toast({
        title: "Invalid CSV format",
        description: "CSV must include company, contactName, and email columns",
        variant: "destructive",
      });
      return [];
    }

    return lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',').map(value => value.trim());
        const client: Partial<ImportedClient> = {};
        
        headers.forEach((header, index) => {
          if (header === 'company') {
            client.company = values[index];
          } else if (header === 'contactname') {
            client.contactName = values[index];
          } else if (header === 'rate') {
            client.rate = parseFloat(values[index]) || 0;
          } else if (['email', 'phone', 'address', 'currency', 'notes', 'website'].includes(header)) {
            (client as any)[header] = values[index];
          }
        });
        
        return client as ImportedClient;
      });
  } catch (error) {
    toast({
      title: "Error parsing CSV",
      description: "Please check your CSV format and try again",
      variant: "destructive",
    });
    return [];
  }
};

export const parseJSON = (content: string): ImportedClient[] => {
  try {
    const data = JSON.parse(content);
    if (!Array.isArray(data)) {
      toast({
        title: "Invalid JSON format",
        description: "File must contain an array of clients",
        variant: "destructive",
      });
      return [];
    }
    return data;
  } catch (error) {
    toast({
      title: "Error parsing JSON",
      description: "Please check your JSON format and try again",
      variant: "destructive",
    });
    return [];
  }
};

export const validateClients = (clients: ImportedClient[]): boolean => {
  if (!clients.length) {
    toast({
      title: "Validation Error",
      description: "No valid clients found in the file",
      variant: "destructive",
    });
    return false;
  }

  for (const client of clients) {
    if (!client.company || !client.contactName || !client.email || !client.currency || client.rate === undefined) {
      toast({
        title: "Validation Error",
        description: "All clients must have company, contactName, email, currency, and rate fields",
        variant: "destructive",
      });
      return false;
    }
    
    if (isNaN(Number(client.rate))) {
      toast({
        title: "Validation Error",
        description: "Rate must be a number",
        variant: "destructive",
      });
      return false;
    }
  }
  
  return true;
};