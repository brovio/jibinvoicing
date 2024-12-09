import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TimesheetEntry } from "@/utils/timesheetUtils";

interface TimesheetEntryModalProps {
  entry: TimesheetEntry;
  open: boolean;
  onClose: () => void;
}

export const TimesheetEntryModal = ({ entry, open, onClose }: TimesheetEntryModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#161B22] border-[#30363D] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Timesheet Entry Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#8B949E] text-sm">Date</label>
              <p className="text-white">{entry.date}</p>
            </div>
            <div>
              <label className="text-[#8B949E] text-sm">Staff Member</label>
              <p className="text-white">{entry.staffMember}</p>
            </div>
            <div>
              <label className="text-[#8B949E] text-sm">Entry Type</label>
              <p className="text-white">{entry.entryType}</p>
            </div>
            <div>
              <label className="text-[#8B949E] text-sm">Time</label>
              <p className="text-white">{entry.time}</p>
            </div>
            <div>
              <label className="text-[#8B949E] text-sm">Client</label>
              <p className="text-white">{entry.client}</p>
            </div>
            <div>
              <label className="text-[#8B949E] text-sm">Project</label>
              <p className="text-white">{entry.project}</p>
            </div>
            <div>
              <label className="text-[#8B949E] text-sm">Duration</label>
              <p className="text-white">{entry.duration} hours</p>
            </div>
            <div>
              <label className="text-[#8B949E] text-sm">Break</label>
              <p className="text-white">{entry.break || 'N/A'}</p>
            </div>
            <div>
              <label className="text-[#8B949E] text-sm">Break Type</label>
              <p className="text-white">{entry.breakType || 'N/A'}</p>
            </div>
          </div>
          <div>
            <label className="text-[#8B949E] text-sm">Tasks/Notes</label>
            <p className="text-white">{entry.tasks || 'No tasks recorded'}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};