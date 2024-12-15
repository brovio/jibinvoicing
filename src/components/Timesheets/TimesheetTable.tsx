import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TimesheetRow } from "./TimesheetRow";
import { SharedTableHeader } from "@/components/shared/TableHeader";
import { useTableSelection } from "@/hooks/useTableSelection";
import { TimesheetEntry, TimesheetTableProps } from "./types/timesheet";
import { TimesheetDetailsDialog } from "./TimesheetDetailsDialog";

const timesheetColumns = [
  { key: 'date', label: 'Date' },
  { key: 'client', label: 'Client' },
  { key: 'activity', label: 'Activity' },
  { key: 'task', label: 'Task' },
  { key: 'duration', label: 'Hours', align: 'right' as const },
];

export const TimesheetTable = ({ 
  data,
  onTimesheetAdded,
  onTimesheetUpdated,
  onTimesheetDeleted
}: TimesheetTableProps) => {
  const [selectedTimesheet, setSelectedTimesheet] = useState<TimesheetEntry | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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

  const handleViewTimesheet = (timesheet: TimesheetEntry) => {
    setSelectedTimesheet(timesheet);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
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
                key={item.timesheet_id}
                data={item}
                isSelected={isSelected(item)}
                onSelect={(selected) => handleRowSelect(item, selected)}
                onView={handleViewTimesheet}
                onEdit={(timesheet) => {}}
                onDelete={(timesheet) => onTimesheetDeleted?.(timesheet)}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <TimesheetDetailsDialog 
        timesheet={selectedTimesheet}
        open={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedTimesheet(null);
        }}
      />
    </>
  );
};