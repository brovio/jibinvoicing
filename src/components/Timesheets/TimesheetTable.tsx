import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TimesheetRow } from "./TimesheetRow";
import { SharedTableHeader } from "@/components/shared/TableHeader";
import { useTableSelection } from "@/hooks/useTableSelection";
import { TimesheetEntry, TimesheetTableProps } from "./types/timesheet";
import { TimesheetDetailsDialog } from "./TimesheetDetailsDialog";
import { useToast } from "@/components/ui/use-toast";

const timesheetColumns = [
  { key: 'date', label: 'Date', width: 15, minWidth: 10 },
  { key: 'client', label: 'Client', width: 20, minWidth: 15 },
  { key: 'activity', label: 'Activity', width: 15, minWidth: 10 },
  { key: 'notes', label: 'Task', width: 25, minWidth: 15 },
  { key: 'duration', label: 'Hours', width: 10, minWidth: 8, align: 'right' as const },
  { key: 'status', label: 'Status', width: 15, minWidth: 10 },
];

export const TimesheetTable = ({ 
  data,
  onTimesheetAdded,
  onTimesheetUpdated,
  onTimesheetDeleted
}: TimesheetTableProps) => {
  const [selectedTimesheet, setSelectedTimesheet] = useState<TimesheetEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();

  const {
    handleSelectAll,
    handleRowSelect,
    isSelected,
    excludedItems,
    selectAllMode,
    getSelectedItems,
  } = useTableSelection<TimesheetEntry>();

  const selectedCount = selectAllMode ? 
    data.length - excludedItems.size : 
    getSelectedItems(data).length;

  const handleRowClick = (timesheet: TimesheetEntry) => {
    setSelectedTimesheet(timesheet);
    setIsDialogOpen(true);
    setEditMode(false);
  };

  const handleEdit = (timesheet: TimesheetEntry) => {
    setSelectedTimesheet(timesheet);
    setIsDialogOpen(true);
    setEditMode(true);
  };

  const handleDelete = async (timesheet: TimesheetEntry) => {
    try {
      await onTimesheetDeleted?.(timesheet);
      toast({
        title: "Timesheet deleted",
        description: "The timesheet entry has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting timesheet:', error);
      toast({
        title: "Error",
        description: "Failed to delete the timesheet entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedTimesheet(null);
    setEditMode(false);
  };

  const handleTimesheetUpdate = async (updatedTimesheet: TimesheetEntry) => {
    try {
      await onTimesheetUpdated?.(updatedTimesheet);
      toast({
        title: "Timesheet updated",
        description: "The timesheet entry has been successfully updated.",
      });
      handleDialogClose();
    } catch (error) {
      console.error('Error updating timesheet:', error);
      toast({
        title: "Error",
        description: "Failed to update the timesheet entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="w-full bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
        <Table>
          <SharedTableHeader 
            columns={timesheetColumns}
            onSort={() => {}}
            onSelectAll={handleSelectAll}
            totalItems={data.length}
            visibleItems={data.length}
            selectedCount={selectedCount}
            excludedCount={excludedItems.size}
            selectAllMode={selectAllMode}
          />
          <TableBody>
            {data.map((item) => (
              <TimesheetRow 
                key={item.timesheet_id || item.date}
                data={item}
                isSelected={isSelected(item)}
                onSelect={(selected) => handleRowSelect(item, selected)}
                onView={handleRowClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <TimesheetDetailsDialog
        timesheet={selectedTimesheet}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSave={handleTimesheetUpdate}
        isEditMode={editMode}
      />
    </>
  );
};
