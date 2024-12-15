export interface TimesheetEntry {
  timesheet_id?: number;
  date: string;
  time?: string;
  full_name?: string;
  client: string;
  activity?: string;
  notes?: string;
  duration: number;
  flagged?: boolean;
  flag_reason?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TimesheetTableProps {
  data: TimesheetEntry[];
  onTimesheetAdded?: (timesheet: TimesheetEntry) => void;
  onTimesheetUpdated?: (timesheet: TimesheetEntry) => void;
  onTimesheetDeleted?: (timesheet: TimesheetEntry) => void;
}