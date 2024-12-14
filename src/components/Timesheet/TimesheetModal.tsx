import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TimesheetEntry } from "@/utils/timesheetParser";

interface TimesheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry?: TimesheetEntry;
}

export const TimesheetModal = ({ isOpen, onClose, entry }: TimesheetModalProps) => {
  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#252A38] border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Timesheet Entry Details</DialogTitle>
          <DialogDescription className="text-gray-400">
            View timesheet entry information below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="font-medium text-gray-300">Date & Time</h3>
            <p className="text-sm text-gray-400">{entry.date} {entry.time || 'N/A'}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-300">Client</h3>
            <p className="text-sm text-gray-400">{entry.client}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-300">Project</h3>
            <p className="text-sm text-gray-400">{entry.project}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-300">Task</h3>
            <p className="text-sm text-gray-400">{entry.task}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-300">Hours</h3>
            <p className="text-sm text-gray-400">{entry.hours}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-300">Status</h3>
            <p className="text-sm text-gray-400">{entry.status || 'N/A'}</p>
          </div>
          {entry.staff_name && (
            <div>
              <h3 className="font-medium text-gray-300">Staff Name</h3>
              <p className="text-sm text-gray-400">{entry.staff_name}</p>
            </div>
          )}
          {entry.entry_type && (
            <div>
              <h3 className="font-medium text-gray-300">Entry Type</h3>
              <p className="text-sm text-gray-400">{entry.entry_type}</p>
            </div>
          )}
          {entry.break && (
            <>
              <div>
                <h3 className="font-medium text-gray-300">Break</h3>
                <p className="text-sm text-gray-400">Yes</p>
              </div>
              {entry.break_type && (
                <div>
                  <h3 className="font-medium text-gray-300">Break Type</h3>
                  <p className="text-sm text-gray-400">{entry.break_type}</p>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};