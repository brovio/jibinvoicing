import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TimesheetEntry } from "./types/timesheet";
import { Label } from "@/components/ui/label";

interface TimesheetDetailsDialogProps {
  timesheet: TimesheetEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (timesheet: TimesheetEntry) => void;
}

export const TimesheetDetailsDialog = ({
  timesheet,
  isOpen,
  onClose,
  onSave,
}: TimesheetDetailsDialogProps) => {
  if (!timesheet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#252A38] border border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Timesheet Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <Label className="text-gray-400">Timesheet ID</Label>
            <p className="text-white">{timesheet.timesheet_id}</p>
          </div>
          <div>
            <Label className="text-gray-400">Date</Label>
            <p className="text-white">{timesheet.date}</p>
          </div>
          <div>
            <Label className="text-gray-400">Time</Label>
            <p className="text-white">{timesheet.time || 'Not specified'}</p>
          </div>
          <div>
            <Label className="text-gray-400">Staff Member</Label>
            <p className="text-white">{timesheet.full_name}</p>
          </div>
          <div>
            <Label className="text-gray-400">Client</Label>
            <p className="text-white">{timesheet.client}</p>
          </div>
          <div>
            <Label className="text-gray-400">Activity</Label>
            <p className="text-white">{timesheet.activity || 'Not specified'}</p>
          </div>
          <div>
            <Label className="text-gray-400">Notes</Label>
            <p className="text-white">{timesheet.notes || 'No notes'}</p>
          </div>
          <div>
            <Label className="text-gray-400">Hours</Label>
            <p className="text-white">{timesheet.duration}</p>
          </div>
          <div className="col-span-2">
            <Label className="text-gray-400">Status</Label>
            <p className={`${timesheet.flagged ? 'text-red-500' : 'text-green-500'}`}>
              {timesheet.flagged ? 'Flagged' : 'Approved'}
            </p>
          </div>
          {timesheet.flagged && (
            <div className="col-span-2">
              <Label className="text-gray-400">Flag Reason</Label>
              <p className="text-red-500">{timesheet.flag_reason || 'No reason provided'}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};