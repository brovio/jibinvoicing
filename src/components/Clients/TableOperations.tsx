import { useState } from "react";
import { ClientEntry } from "./types/clients";
import { supabase } from "@/integrations/supabase/client";
import { toDatabase } from "./utils/clientTransforms";
import { toast } from "sonner";
import { showClientDeletedToast } from "@/utils/toastUtils";

interface TableOperationsProps {
  onClientDeleted?: (client: ClientEntry) => void;
}

export const useTableOperations = ({ onClientDeleted }: TableOperationsProps) => {
  const handleDelete = async (client: ClientEntry) => {
    try {
      const { data: clientData, error: fetchError } = await supabase
        .from('clients')
        .select('id')
        .eq('company', client.company)
        .single();

      if (fetchError) {
        console.error('Error fetching client:', fetchError);
        toast.error('Failed to delete client');
        return;
      }

      const { error: deleteError } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientData.id);

      if (deleteError) {
        console.error('Error deleting client:', deleteError);
        toast.error('Failed to delete client');
        return;
      }

      onClientDeleted?.(client);
      showClientDeletedToast(client.company);
      window.location.reload(); // Ensure UI is updated
    } catch (error) {
      console.error('Error in delete operation:', error);
      toast.error('Failed to delete client');
    }
  };

  const handleBulkDelete = async (selectedClients: Set<string>) => {
    try {
      // First get the IDs of all selected clients
      const { data: clientsData, error: fetchError } = await supabase
        .from('clients')
        .select('id')
        .in('company', Array.from(selectedClients));

      if (fetchError) {
        console.error('Error fetching clients:', fetchError);
        toast.error('Failed to delete clients');
        return;
      }

      const clientIds = clientsData.map(client => client.id);

      const { error: deleteError } = await supabase
        .from('clients')
        .delete()
        .in('id', clientIds);

      if (deleteError) {
        console.error('Error deleting clients:', deleteError);
        toast.error('Failed to delete clients');
        return;
      }

      toast.success(`Successfully deleted ${selectedClients.size} clients`);
      window.location.reload(); // Ensure UI is updated
    } catch (error) {
      console.error('Error in bulk delete operation:', error);
      toast.error('Failed to delete clients');
    }
  };

  const handleBulkUpdate = async (field: string, value: string | number, selectedClients: Set<string>) => {
    try {
      // First get the IDs of all selected clients
      const { data: clientsData, error: fetchError } = await supabase
        .from('clients')
        .select('id')
        .in('company', Array.from(selectedClients));

      if (fetchError) {
        console.error('Error fetching clients:', fetchError);
        toast.error('Failed to update clients');
        return;
      }

      const clientIds = clientsData.map(client => client.id);

      const { error: updateError } = await supabase
        .from('clients')
        .update({ [field]: value })
        .in('id', clientIds);

      if (updateError) {
        console.error('Error updating clients:', updateError);
        toast.error('Failed to update clients');
        return;
      }

      toast.success(`Successfully updated ${selectedClients.size} clients`);
      window.location.reload(); // Ensure UI is updated
    } catch (error) {
      console.error('Error in bulk update operation:', error);
      toast.error('Failed to update clients');
    }
  };

  return {
    handleDelete,
    handleBulkDelete,
    handleBulkUpdate,
  };
};