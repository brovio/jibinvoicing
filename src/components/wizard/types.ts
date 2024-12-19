import { Database } from "@/integrations/supabase/types";

export interface BrovioClient {
  clientid: number;
  company: string;
}

export interface ClientMapping {
  mapping_id: number;
  timesheet_client_name: string;
  brovio_client_id: number | null;
  confidence_score: number | null;
  manually_verified: boolean;
  available_clients: BrovioClient[];
}