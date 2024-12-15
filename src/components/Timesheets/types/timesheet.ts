export interface TimesheetEntry {
  timesheet_id: number;
  date: string;
  time?: string;
  client: string;
  activity?: string;
  notes?: string;
  duration: number;
  flagged?: boolean;
  flag_reason?: string;
}

export interface TimesheetTableProps {
  data: TimesheetEntry[];
  onTimesheetAdded?: (timesheet: TimesheetEntry) => void;
  onTimesheetUpdated?: (timesheet: TimesheetEntry) => void;
  onTimesheetDeleted?: (timesheet: TimesheetEntry) => void;
}

export interface TimesheetDetailsDialogProps {
  timesheet: TimesheetEntry | null;
  open: boolean;
  onClose: () => void;
}