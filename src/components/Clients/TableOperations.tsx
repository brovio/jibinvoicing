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
      const selectedArray = Array.from(selectedClients);
      console.log('Bulk deleting clients:', selectedArray);
      
      // Delete each selected client individually to ensure proper error handling
      const deletePromises = selectedArray.map(async (company) => {
        const { error } = await supabase
          .from('brovio_clients')
          .delete()
          .eq('company', company);
          
        if (error) {
          throw new Error(`Failed to delete client ${company}: ${error.message}`);
        }
        return company;
      });

      const results = await Promise.all(deletePromises);
      
      console.log('Clients deleted successfully');
      toast.success(`Successfully deleted ${results.length} clients`);
      
      // Notify about each deleted client
      results.forEach(company => {
        onClientDeleted?.({ company } as ClientEntry);
      });
      
    } catch (error) {
      console.error('Error in bulk delete operation:', error);
      toast.error('Failed to delete some clients');
    }
  };

  const handleDeleteAll = async () => {
    try {
      console.log('Deleting all clients');
      
      // First, fetch all clients to notify about their deletion
      const { data: allClients, error: fetchError } = await supabase
        .from('brovio_clients')
        .select('company');

      if (fetchError) {
        console.error('Error fetching clients:', fetchError);
        toast.error('Failed to delete all clients');
        return;
      }

      // Then delete all records
      const { error: deleteError } = await supabase
        .from('brovio_clients')
        .delete()
        .gte('created_at', '1900-01-01'); // This will delete all records

      if (deleteError) {
        console.error('Delete all error:', deleteError);
        toast.error('Failed to delete all clients');
        return;
      }

      console.log('All clients deleted successfully');
      toast.success('All clients have been deleted');

      // Notify about each deleted client immediately
      allClients?.forEach(client => {
        onClientDeleted?.({ company: client.company } as ClientEntry);
      });
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