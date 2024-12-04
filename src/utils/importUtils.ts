import { toast } from "@/components/ui/use-toast";

export interface ImportedClient {
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  rate: number;
  currency: string;
  notes: string;
  website: string;
}

export const parseCSV = (content: string): ImportedClient[] => {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(value => value.trim());
      const client: Partial<ImportedClient> = {};
      
      headers.forEach((header, index) => {
        if (header === 'company') {
          client.name = values[index];
        } else if (header === 'contact') {
          client.contact = values[index];
        } else if (header === 'rate') {
          client.rate = parseFloat(values[index]) || 0;
        } else if (['email', 'phone', 'address', 'currency', 'notes', 'website'].includes(header)) {
          (client as any)[header] = values[index];
        }
      });
      
      return client as ImportedClient;
    });
};

export const parseJSON = (content: string): ImportedClient[] => {
  try {
    const data = JSON.parse(content);
    if (!Array.isArray(data)) {
      throw new Error('JSON must contain an array of clients');
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
  const requiredFields = ['name', 'contact', 'email', 'currency', 'rate'];
  
  for (const client of clients) {
    for (const field of requiredFields) {
      if (!client[field as keyof ImportedClient]) {
        toast({
          title: "Validation Error",
          description: `Missing required field: ${field}`,
          variant: "destructive",
        });
        return false;
      }
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