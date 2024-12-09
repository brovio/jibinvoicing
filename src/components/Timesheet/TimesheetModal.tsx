import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TimesheetEntry } from "@/utils/timesheetParser";

interface TimesheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: TimesheetEntry | null;
  rowIndex?: number;
}

export const TimesheetModal = ({ isOpen, onClose, entry, rowIndex }: TimesheetModalProps) => {
  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#252A38] border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Timesheet Entry Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Row Number</label>
              <p className="text-white">{rowIndex !== undefined ? rowIndex + 1 : 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Date</label>
              <p className="text-white">{entry.date}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Hours</label>
              <p className="text-white">{entry.hours}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Client</label>
              <p className="text-white">{entry.client}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Project</label>
              <p className="text-white">{entry.project}</p>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-400">Task</label>
              <p className="text-white">{entry.task}</p>
            </div>
            {entry.staffName && (
              <div>
                <label className="text-sm text-gray-400">Staff Name</label>
                <p className="text-white">{entry.staffName}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};