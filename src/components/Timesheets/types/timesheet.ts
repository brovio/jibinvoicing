export interface TimesheetEntry {
  id?: string;
  date: string;
  client: string;
  activity: string;
  task: string;
  hours: number;
}

export interface TimesheetTableProps {
  data: TimesheetEntry[];
  onTimesheetAdded?: (timesheet: TimesheetEntry) => void;
  onTimesheetUpdated?: (timesheet: TimesheetEntry) => void;
  onTimesheetDeleted?: (timesheet: TimesheetEntry) => void;
}