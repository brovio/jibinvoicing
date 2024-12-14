import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TimesheetEntry } from "@/utils/timesheetParser";

interface TimesheetDeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (entries: TimesheetEntry | TimesheetEntry[]) => void;
  entry?: TimesheetEntry;
  isMultiple?: boolean;
  getSelectedEntries: () => TimesheetEntry[];
}

export const TimesheetDeleteDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  entry,
  isMultiple,
  getSelectedEntries,
}: TimesheetDeleteDialogProps) => {
  const handleConfirm = () => {
    if (isMultiple) {
      onConfirm(getSelectedEntries());
    } else if (entry) {
      onConfirm(entry);
    }
  };

  const getTitle = () => {
    if (isMultiple) {
      const count = getSelectedEntries().length;
      return `Delete ${count} Selected ${count === 1 ? 'Entry' : 'Entries'}`;
    }
    return 'Delete Entry';
  };

  const getMessage = () => {
    if (isMultiple) {
      const count = getSelectedEntries().length;
      return `Are you sure you want to delete ${count} selected ${
        count === 1 ? 'entry' : 'entries'
      }? This action cannot be undone.`;
    }
    return 'Are you sure you want to delete this entry? This action cannot be undone.';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getMessage()}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};