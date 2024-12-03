export interface Timesheet {
  id: string;
  date: Date;
  project: string;
  task: string;
  hours: number;
  status: 'pending' | 'approved' | 'rejected';
  clientId: string;
}