import { ClientsTable } from "@/components/Clients/ClientsTable";
import { useState, useEffect } from "react";
import { ImportedClient } from "@/utils/importUtils";
import { UserPlus } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import { ExportButton } from "@/components/ExportButton";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = 'stored_clients';

const initialData = [
  {
    company: "Google",
    contactName: "John Smith",
    email: "john@google.com",
    currency: "USD",
    rate: 150,
  },
  {
    company: "Microsoft",
    contactName: "Jane Doe",
    email: "jane@microsoft.com",
    currency: "EUR",
    rate: 140,
  },
  {
    company: "Apple",
    contactName: "Bob Wilson",
    email: "bob@apple.com",
    currency: "GBP",
    rate: 160,
  }
];

const Clients = () => {
  const [clients, setClients] = useState(() => {
    const storedClients = localStorage.getItem(STORAGE_KEY);
    return storedClients ? JSON.parse(storedClients) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  }, [clients]);

  const handleImportSuccess = (importedClients: ImportedClient[]) => {
    const formattedClients = importedClients.map(client => ({
      company: client.company,
      contactName: client.contactName,
      email: client.email,
      phone: client.phone || '',
      address: client.address || '',
      currency: client.currency,
      rate: Number(client.rate),
      notes: client.notes || '',
      website: client.website || ''
    }));
    setClients(prev => [...prev, ...formattedClients]);
  };

  const handleClientAdded = (newClient: any) => {
    setClients(prev => [...prev, newClient]);
  };

  const handleClientUpdated = (updatedClient: any) => {
    setClients(prev => prev.map(client => 
      client.company === updatedClient.company ? updatedClient : client
    ));
  };

  const handleClientDeleted = (deletedClient: any) => {
    setClients(prev => prev.filter(client => client.company !== deletedClient.company));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="bg-[#252A38] border border-gray-800 rounded-[10px] p-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-2">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-medium text-white">Import/Export Clients</h2>
            <p className="text-gray-400 text-center max-w-lg">
              Import your clients using CSV or JSON format. Required columns:
              Company, Contact, Email, Currency, and Rate. Additional fields: Phone,
              Address, Notes, and Website.
            </p>
            <div className="flex gap-4 mt-4">
              <FileUpload onImportSuccess={handleImportSuccess} />
              <ExportButton clients={clients} format="csv" />
              <ExportButton clients={clients} format="json" />
              <Button
                onClick={() => handleClientAdded({})}
                className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white gap-2 rounded-[10px]"
              >
                <UserPlus className="h-4 w-4" />
                Add Client
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ClientsTable 
        data={clients}
        onClientAdded={handleClientAdded}
        onClientUpdated={handleClientUpdated}
        onClientDeleted={handleClientDeleted}
      />
    </div>
  );
};

export default Clients;