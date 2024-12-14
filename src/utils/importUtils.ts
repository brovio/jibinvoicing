import { toast } from "@/components/ui/use-toast";

export interface ImportedClient {
  clientId: string;
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
        const client: Partial<ImportedClient> = {
          clientId: `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
        
        headers.forEach((header, index) => {
          switch(header) {
            case 'company':
              client.company = values[index];
              break;
            case 'contactname':
              client.contactName = values[index];
              break;
            case 'email':
              client.email = values[index];
              break;
            case 'phone':
              client.phone = values[index];
              break;
            case 'address':
              client.address = values[index];
              break;
            case 'rate':
              client.rate = parseFloat(values[index]) || 0;
              break;
            case 'currency':
              client.currency = values[index];
              break;
            case 'notes':
              client.notes = values[index];
              break;
            case 'website':
              client.website = values[index];
              break;
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

    return data.map(item => ({
      clientId: `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      company: item.company,
      contactName: item.contactName,
      email: item.email,
      phone: item.phone,
      address: item.address,
      rate: parseFloat(item.rate) || 0,
      currency: item.currency,
      notes: item.notes,
      website: item.website
    }));
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