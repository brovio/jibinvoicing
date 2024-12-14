import { ClientsTable } from "@/components/Clients/ClientsTable";
import { useState, useEffect } from "react";
import { ImportedClient } from "@/utils/importUtils";
import { UserPlus } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import { ExportButton } from "@/components/ExportButton";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { fromDatabase } from "@/components/Clients/utils/clientTransforms";
import { ClientEntry } from "@/components/Clients/types/clients";
import { toast } from "sonner";

const Clients = () => {
  const [clients, setClients] = useState<ClientEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
  }>({ isOpen: false, mode: 'add' });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from('brovio_clients')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching clients:', error);
          toast.error('Failed to load clients');
          return;
        }

        setClients(data.map(fromDatabase));
      } catch (error) {
        console.error('Error in fetchClients:', error);
        toast.error('Failed to load clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientAdded = (newClient: ClientEntry) => {
    setClients(prev => [newClient, ...prev]);
  };

  const handleClientUpdated = (updatedClient: ClientEntry) => {
    setClients(prev => prev.map(client => 
      client.company === updatedClient.company ? updatedClient : client
    ));
  };

  const handleClientDeleted = (deletedClient: ClientEntry) => {
    setClients(prev => prev.filter(client => client.company !== deletedClient.company));
  };

  const handleImportSuccess = (importedClients: ImportedClient[]) => {
    const newClients = importedClients.map(client => ({
      ...client,
      rate: Number(client.rate)
    }));
    setClients(prev => [...newClients, ...prev]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
      </div>
    );
  }

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
                onClick={() => setModalState({ isOpen: true, mode: 'add' })}
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