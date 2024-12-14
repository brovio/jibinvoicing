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
      console.log('Deleting client:', client.company);
      
      const { error } = await supabase
        .from('brovio_clients')
        .delete()
        .eq('company', client.company);

      if (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete client');
        return;
      }

      console.log('Client deleted successfully');
      onClientDeleted?.(client);
      showClientDeletedToast(client.company);
    } catch (error) {
      console.error('Error in delete operation:', error);
      toast.error('Failed to delete client');
    }
  };

  const handleBulkDelete = async (selectedClients: Set<string>) => {
    try {
      console.log('Bulk deleting clients:', Array.from(selectedClients));
      
      const { error } = await supabase
        .from('brovio_clients')
        .delete()
        .in('company', Array.from(selectedClients));

      if (error) {
        console.error('Bulk delete error:', error);
        toast.error('Failed to delete selected clients');
        return;
      }

      console.log('Clients deleted successfully');
      toast.success(`Successfully deleted ${selectedClients.size} clients`);
      window.location.reload();
    } catch (error) {
      console.error('Error in bulk delete operation:', error);
      toast.error('Failed to delete clients');
    }
  };

  const handleDeleteAll = async () => {
    try {
      console.log('Deleting all clients');
      
      const { error } = await supabase
        .from('brovio_clients')
        .delete()
        .neq('id', 'none'); // This will delete all records

      if (error) {
        console.error('Delete all error:', error);
        toast.error('Failed to delete all clients');
        return;
      }

      console.log('All clients deleted successfully');
      toast.success('All clients have been deleted');
      window.location.reload();
    } catch (error) {
      console.error('Error in delete all operation:', error);
      toast.error('Failed to delete all clients');
    }
  };

  const handleBulkUpdate = async (field: string, value: string | number, selectedClients: Set<string>) => {
    try {
      console.log('Bulk updating clients:', Array.from(selectedClients));
      
      const { error } = await supabase
        .from('brovio_clients')
        .update({ [field]: value })
        .in('company', Array.from(selectedClients));

      if (error) {
        console.error('Bulk update error:', error);
        toast.error('Failed to update selected clients');
        return;
      }

      console.log('Clients updated successfully');
      toast.success(`Successfully updated ${selectedClients.size} clients`);
      window.location.reload();
    } catch (error) {
      console.error('Error in bulk update operation:', error);
      toast.error('Failed to update clients');
    }
  };

  return {
    handleDelete,
    handleBulkDelete,
    handleDeleteAll,
    handleBulkUpdate,
  };
};