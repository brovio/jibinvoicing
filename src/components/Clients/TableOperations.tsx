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
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('company', client.company);

      if (error) throw error;

      onClientDeleted?.(client);
      showClientDeletedToast(client.company);
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Failed to delete client');
    }
  };

  const handleBulkDelete = async (selectedClients: Set<string>) => {
    try {
      const selectedCompanies = Array.from(selectedClients);
      const { error } = await supabase
        .from('clients')
        .delete()
        .in('company', selectedCompanies);

      if (error) throw error;

      toast.success(`Successfully deleted ${selectedCompanies.length} clients`);
      window.location.reload(); // Refresh to show updated state
    } catch (error) {
      console.error('Error deleting clients:', error);
      toast.error('Failed to delete clients');
    }
  };

  const handleBulkUpdate = async (field: string, value: string | number, selectedClients: Set<string>) => {
    try {
      const selectedCompanies = Array.from(selectedClients);
      const { error } = await supabase
        .from('clients')
        .update({ [field]: value })
        .in('company', selectedCompanies);

      if (error) throw error;

      window.location.reload(); // Refresh to show updated state
    } catch (error) {
      console.error('Error updating clients:', error);
      toast.error('Failed to update clients');
    }
  };

  return {
    handleDelete,
    handleBulkDelete,
    handleBulkUpdate,
  };
};