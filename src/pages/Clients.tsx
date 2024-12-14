import { ClientsTable } from "@/components/Clients/ClientsTable";
import { useState, useEffect } from "react";
import { ImportedClient } from "@/utils/importUtils";
import { UserPlus } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import { ExportButton } from "@/components/ExportButton";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { showErrorToast } from "@/utils/toastUtils";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('brovio-clients')
        .select('*')
        .order('clientid', { ascending: true });

      if (error) throw error;
      
      const transformedData = data?.map(client => ({
        clientId: client.clientid,
        company: client.company,
        contactName: client.contact_name,
        email: client.email,
        phone: client.phone,
        address: client.address,
        currency: client.currency,
        rate: client.rate,
        notes: client.notes,
        website: client.website
      })) || [];
      
      setClients(transformedData);
    } catch (error) {
      console.error('Error fetching clients:', error);
      showErrorToast(
        "Failed to load clients",
        "Please try again later or contact support if the problem persists"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportSuccess = async (importedClients: ImportedClient[]) => {
    try {
      const { data, error } = await supabase
        .from('brovio-clients')
        .insert(
          importedClients.map(client => ({
            company: client.company,
            contact_name: client.contactName,
            email: client.email,
            phone: client.phone || null,
            address: client.address || null,
            currency: client.currency,
            rate: Number(client.rate),
            notes: client.notes || null,
            website: client.website || null
          }))
        )
        .select();

      if (error) throw error;
      await fetchClients();
    } catch (error) {
      console.error('Import error:', error);
      showErrorToast(
        "Import failed",
        "There was an error importing the clients. Please try again."
      );
    }
  };

  const handleClientAdded = async (newClient: any) => {
    try {
      const { error } = await supabase
        .from('brovio-clients')
        .insert({
          company: newClient.company,
          contact_name: newClient.contactName,
          email: newClient.email,
          phone: newClient.phone || null,
          address: newClient.address || null,
          currency: newClient.currency,
          rate: Number(newClient.rate),
          notes: newClient.notes || null,
          website: newClient.website || null
        });

      if (error) throw error;
      await fetchClients();
    } catch (error) {
      console.error('Add client error:', error);
      showErrorToast(
        "Failed to add client",
        "Please try again or contact support if the problem persists"
      );
    }
  };

  const handleClientUpdated = async (updatedClient: any) => {
    try {
      if (!updatedClient.clientId) {
        throw new Error('Client ID is required for update');
      }

      const { error } = await supabase
        .from('brovio-clients')
        .update({
          company: updatedClient.company,
          contact_name: updatedClient.contactName,
          email: updatedClient.email,
          phone: updatedClient.phone || null,
          address: updatedClient.address || null,
          currency: updatedClient.currency,
          rate: Number(updatedClient.rate),
          notes: updatedClient.notes || null,
          website: updatedClient.website || null
        })
        .eq('clientid', parseInt(updatedClient.clientId, 10)); // Convert clientId to integer and use eq

      if (error) throw error;
      
      await fetchClients();
    } catch (error) {
      console.error('Update client error:', error);
      showErrorToast(
        "Failed to update client",
        "Please try again or contact support if the problem persists"
      );
    }
  };

  const handleClientDeleted = async (deletedClient: any) => {
    try {
      if (!deletedClient.clientId) {
        throw new Error('Client ID is required for deletion');
      }
      
      const { error } = await supabase
        .from('brovio-clients')
        .delete()
        .eq('clientid', deletedClient.clientId);

      if (error) throw error;
      await fetchClients();
    } catch (error) {
      console.error('Delete client error:', error);
      showErrorToast(
        "Failed to delete client",
        "Please try again or contact support if the problem persists"
      );
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
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
