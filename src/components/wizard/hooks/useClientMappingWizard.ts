import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ClientMapping } from "../types";

export const useClientMappingWizard = () => {
  const [mappings, setMappings] = useState<ClientMapping[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMappings = async () => {
    try {
      setIsLoading(true);
      
      // Fetch unique clients from timesheets
      const { data: timesheetClients } = await supabase
        .from('imported_timesheets')
        .select('client')
        .distinct();

      // Fetch all Brovio clients
      const { data: brovioClients } = await supabase
        .from('brovio-clients')
        .select('clientid, company');

      // Fetch existing mappings
      const { data: existingMappings } = await supabase
        .from('client_mappings')
        .select('*');

      if (!timesheetClients || !brovioClients) {
        throw new Error('Failed to fetch clients');
      }

      // Create mappings array
      const newMappings: ClientMapping[] = timesheetClients.map(({ client }) => {
        const existingMapping = existingMappings?.find(
          (m) => m.timesheet_client_name === client
        );

        // Simple string similarity for suggestions
        let bestMatch = null;
        let bestScore = 0;
        
        brovioClients.forEach((brovioClient) => {
          const score = calculateSimilarity(
            client.toLowerCase(),
            brovioClient.company.toLowerCase()
          );
          if (score > bestScore && score > 0.5) {
            bestScore = score;
            bestMatch = brovioClient.clientid;
          }
        });

        return {
          mapping_id: existingMapping?.mapping_id || 0,
          timesheet_client_name: client,
          brovio_client_id: existingMapping?.brovio_client_id || bestMatch,
          confidence_score: bestScore,
          manually_verified: existingMapping?.manually_verified || false,
          available_clients: brovioClients,
        };
      });

      setMappings(newMappings);
    } catch (error) {
      console.error('Error fetching mappings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch client mappings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMapping = async (mapping: ClientMapping) => {
    try {
      const { mapping_id, timesheet_client_name, brovio_client_id, manually_verified } = mapping;
      
      if (mapping_id) {
        await supabase
          .from('client_mappings')
          .update({
            brovio_client_id,
            manually_verified,
          })
          .eq('mapping_id', mapping_id);
      } else {
        const { data } = await supabase
          .from('client_mappings')
          .insert({
            timesheet_client_name,
            brovio_client_id,
            manually_verified,
          })
          .select()
          .single();
          
        if (data) {
          mapping.mapping_id = data.mapping_id;
        }
      }

      setMappings(mappings.map(m => 
        m.timesheet_client_name === mapping.timesheet_client_name ? mapping : m
      ));

      toast({
        title: "Success",
        description: "Client mapping updated successfully",
      });
    } catch (error) {
      console.error('Error updating mapping:', error);
      toast({
        title: "Error",
        description: "Failed to update client mapping",
        variant: "destructive",
      });
    }
  };

  const handleVerifyAll = async () => {
    const suggestedMappings = mappings.filter(
      m => !m.manually_verified && m.brovio_client_id && m.confidence_score && m.confidence_score > 0.8
    );

    for (const mapping of suggestedMappings) {
      await handleUpdateMapping({
        ...mapping,
        manually_verified: true,
      });
    }

    toast({
      title: "Success",
      description: `Verified ${suggestedMappings.length} suggested mappings`,
    });
  };

  useEffect(() => {
    fetchMappings();
  }, []);

  const unmappedCount = mappings.filter(m => !m.manually_verified).length;

  return {
    mappings,
    isLoading,
    handleUpdateMapping,
    handleVerifyAll,
    unmappedCount,
  };
};

// Simple string similarity function (Levenshtein distance based)
const calculateSimilarity = (str1: string, str2: string): number => {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const maxLen = Math.max(len1, len2);
  return maxLen === 0 ? 1 : 1 - matrix[len1][len2] / maxLen;
};