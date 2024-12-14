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
  flag_reason?: string;
}

export const fetchTimesheets = async (): Promise<TimesheetEntry[]> => {
  try {
    const { data: timesheets, error } = await supabase
      .from('imported_timesheets')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    return (timesheets || []).map(timesheet => ({
      tsid: timesheet.timesheet_id,
      date: timesheet.date,
      time: timesheet.time,
      client: timesheet.client,
      project: timesheet.activity || 'No Project',
      task: timesheet.notes || 'No Task',
      hours: timesheet.duration,
      status: timesheet.flagged ? 'Error' : 'Success',
      staff_name: timesheet.full_name,
      flag_reason: timesheet.flag_reason
    }));
  } catch (error) {
    console.error('Error fetching timesheets:', error);
    throw error;
  }
};