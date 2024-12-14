import { supabase } from "@/integrations/supabase/client";

export interface TimesheetEntry {
  tsid: number;
  date: string;
  time?: string;
  client: string;
  project: string;
  task: string;
  hours: number;
  status?: string;
  staff_name?: string;
  entry_type?: string;
  break?: boolean;
  break_type?: string;
  flag_reason?: string;
}

export const fetchTimesheets = async (): Promise<TimesheetEntry[]> => {
  try {
    const { data: timesheets, error } = await supabase
      .from('brovio-timesheets')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    return timesheets || [];
  } catch (error) {
    console.error('Error fetching timesheets:', error);
    throw error;
  }
};