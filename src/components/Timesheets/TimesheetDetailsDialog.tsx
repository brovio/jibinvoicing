import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TimesheetEntry } from "./types/timesheet";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

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

  const handleSave = () => {
    if (editedTimesheet) {
      onSave(editedTimesheet);
    }
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
          <div>
            <Label className="text-gray-400">Timesheet ID</Label>
            <p className="text-white">{timesheet.timesheet_id}</p>
          </div>
          <div>
            <Label className="text-gray-400">Date</Label>
            {isEditMode ? (
              <Input
                value={editedTimesheet.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="bg-[#1F2937] border-gray-700 text-white"
              />
            ) : (
              <p className="text-white">{timesheet.date}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-400">Time</Label>
            {isEditMode ? (
              <Input
                value={editedTimesheet.time || ''}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="bg-[#1F2937] border-gray-700 text-white"
              />
            ) : (
              <p className="text-white">{timesheet.time || 'Not specified'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-400">Staff Member</Label>
            {isEditMode ? (
              <Input
                value={editedTimesheet.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                className="bg-[#1F2937] border-gray-700 text-white"
              />
            ) : (
              <p className="text-white">{timesheet.full_name}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-400">Client</Label>
            {isEditMode ? (
              <Input
                value={editedTimesheet.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                className="bg-[#1F2937] border-gray-700 text-white"
              />
            ) : (
              <p className="text-white">{timesheet.client}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-400">Activity</Label>
            {isEditMode ? (
              <Input
                value={editedTimesheet.activity || ''}
                onChange={(e) => handleInputChange('activity', e.target.value)}
                className="bg-[#1F2937] border-gray-700 text-white"
              />
            ) : (
              <p className="text-white">{timesheet.activity || 'Not specified'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-400">Notes</Label>
            {isEditMode ? (
              <Input
                value={editedTimesheet.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="bg-[#1F2937] border-gray-700 text-white"
              />
            ) : (
              <p className="text-white">{timesheet.notes || 'No notes'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-400">Hours</Label>
            {isEditMode ? (
              <Input
                type="number"
                value={editedTimesheet.duration}
                onChange={(e) => handleInputChange('duration', parseFloat(e.target.value))}
                className="bg-[#1F2937] border-gray-700 text-white"
              />
            ) : (
              <p className="text-white">{timesheet.duration}</p>
            )}
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
              {isEditMode ? (
                <Input
                  value={editedTimesheet.flag_reason || ''}
                  onChange={(e) => handleInputChange('flag_reason', e.target.value)}
                  className="bg-[#1F2937] border-gray-700 text-white"
                />
              ) : (
                <p className="text-red-500">{timesheet.flag_reason || 'No reason provided'}</p>
              )}
            </div>
          )}
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
              onClick={handleSave}
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