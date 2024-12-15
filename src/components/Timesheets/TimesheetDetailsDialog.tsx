import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TimesheetEntry } from "./types/timesheet";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { TimesheetField } from "./TimesheetField";
import { TimesheetStatus } from "./TimesheetStatus";

interface TimesheetDetailsDialogProps {
  timesheet: TimesheetEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (timesheet: TimesheetEntry) => void;
  isEditMode?: boolean;
}

export const TimesheetDetailsDialog = ({
  timesheet,
  isOpen,
  onClose,
  onSave,
  isEditMode = false,
}: TimesheetDetailsDialogProps) => {
  const [editedTimesheet, setEditedTimesheet] = useState<TimesheetEntry | null>(null);

  useEffect(() => {
    if (timesheet) {
      setEditedTimesheet({ ...timesheet });
    }
  }, [timesheet]);

  if (!timesheet || !editedTimesheet) return null;

  const handleInputChange = (field: keyof TimesheetEntry, value: string | number | boolean) => {
    setEditedTimesheet(prev => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#252A38] border border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEditMode ? 'Edit Timesheet' : 'Timesheet Details'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <TimesheetField
            label="Timesheet ID"
            value={timesheet.timesheet_id}
            className="col-span-1"
          />
          <TimesheetField
            label="Date"
            value={editedTimesheet.date}
            onChange={(value) => handleInputChange('date', value)}
            isEditMode={isEditMode}
            className="col-span-1"
          />
          <TimesheetField
            label="Time"
            value={editedTimesheet.time || ''}
            onChange={(value) => handleInputChange('time', value)}
            isEditMode={isEditMode}
            className="col-span-1"
          />
          <TimesheetField
            label="Staff Member"
            value={editedTimesheet.full_name}
            onChange={(value) => handleInputChange('full_name', value)}
            isEditMode={isEditMode}
            className="col-span-1"
          />
          <TimesheetField
            label="Client"
            value={editedTimesheet.client}
            onChange={(value) => handleInputChange('client', value)}
            isEditMode={isEditMode}
            className="col-span-1"
          />
          <TimesheetField
            label="Activity"
            value={editedTimesheet.activity || ''}
            onChange={(value) => handleInputChange('activity', value)}
            isEditMode={isEditMode}
            className="col-span-1"
          />
          <TimesheetField
            label="Notes"
            value={editedTimesheet.notes || ''}
            onChange={(value) => handleInputChange('notes', value)}
            isEditMode={isEditMode}
            className="col-span-1"
          />
          <TimesheetField
            label="Hours"
            value={editedTimesheet.duration}
            onChange={(value) => handleInputChange('duration', parseFloat(value))}
            isEditMode={isEditMode}
            type="number"
            className="col-span-1"
          />
          <TimesheetStatus
            flagged={timesheet.flagged || false}
            flagReason={editedTimesheet.flag_reason}
            isEditMode={isEditMode}
            onFlagReasonChange={(value) => handleInputChange('flag_reason', value)}
          />
        </div>
        {isEditMode && (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-transparent text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSave(editedTimesheet)}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Save Changes
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};