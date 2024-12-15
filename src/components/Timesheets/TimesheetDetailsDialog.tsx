import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TimesheetDetailsDialogProps } from "./types/timesheet";

export const TimesheetDetailsDialog = ({ 
  timesheet, 
  open, 
  onClose 
}: TimesheetDetailsDialogProps) => {
  if (!timesheet) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#252A38] text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Timesheet Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400">ID</h4>
              <p>{timesheet.timesheet_id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Date</h4>
              <p>{timesheet.date}</p>
            </div>
            {timesheet.time && (
              <div>
                <h4 className="text-sm font-medium text-gray-400">Time</h4>
                <p>{timesheet.time}</p>
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium text-gray-400">Staff Member</h4>
              <p>{timesheet.full_name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Client</h4>
              <p>{timesheet.client}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Activity</h4>
              <p>{timesheet.activity || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Duration</h4>
              <p>{timesheet.duration} hours</p>
            </div>
          </div>
          {timesheet.notes && (
            <div>
              <h4 className="text-sm font-medium text-gray-400">Notes</h4>
              <p className="mt-1">{timesheet.notes}</p>
            </div>
          )}
          {timesheet.flagged && (
            <div className="bg-red-900/20 p-4 rounded-md">
              <h4 className="text-sm font-medium text-red-400">Flagged</h4>
              <p className="mt-1">{timesheet.flag_reason}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};