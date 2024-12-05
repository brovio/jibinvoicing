import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TimesheetEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: {
    date: string;
    project: string;
    client: string;
    task: string;
    hours: number;
  };
}

export const TimesheetEntryModal = ({ isOpen, onClose, entry }: TimesheetEntryModalProps) => {
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
          </div>
          <div>
            <label className="text-sm text-gray-400">Task</label>
            <p className="text-white">{entry.task}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};