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

  // Helper function to display value or dash
  const displayValue = (value: any) => {
    return value || value === 0 ? value : "-";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#252A38] border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Timesheet Entry Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Date</label>
              <p className="text-white">{displayValue(entry.date)}</p>
            </div>
            {entry.time && (
              <div>
                <label className="text-sm text-gray-400">Time</label>
                <p className="text-white">{displayValue(entry.time)}</p>
              </div>
            )}
            {entry.staffName && (
              <div>
                <label className="text-sm text-gray-400">Staff Name</label>
                <p className="text-white">{displayValue(entry.staffName)}</p>
              </div>
            )}
            <div>
              <label className="text-sm text-gray-400">Hours</label>
              <p className="text-white">{displayValue(entry.hours)}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Client</label>
              <p className="text-white">{displayValue(entry.client)}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Project</label>
              <p className="text-white">{displayValue(entry.project)}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Break</label>
              <p className="text-white">{displayValue(entry.break ? 'Yes' : 'No')}</p>
            </div>
            {entry.breakType && (
              <div>
                <label className="text-sm text-gray-400">Break Type</label>
                <p className="text-white">{displayValue(entry.breakType)}</p>
              </div>
            )}
            <div>
              <label className="text-sm text-gray-400">Row Number</label>
              <p className="text-white">{displayValue(rowIndex !== undefined ? rowIndex + 2 : 'N/A')}</p>
            </div>
            {entry.entryType && (
              <div>
                <label className="text-sm text-gray-400">Entry Type</label>
                <p className="text-white">{displayValue(entry.entryType)}</p>
              </div>
            )}
            <div className="col-span-2">
              <label className="text-sm text-gray-400">Task</label>
              <p className="text-white">{displayValue(entry.task)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};