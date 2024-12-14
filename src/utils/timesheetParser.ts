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