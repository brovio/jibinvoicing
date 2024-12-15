import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TimesheetRow } from "./TimesheetRow";
import { SharedTableHeader } from "@/components/shared/TableHeader";
import { useTableSelection } from "@/hooks/useTableSelection";
import { TimesheetEntry, TimesheetTableProps } from "./types/timesheet";

const timesheetColumns = [
  { key: 'date', label: 'Date' },
  { key: 'client', label: 'Client' },
  { key: 'activity', label: 'Activity' },
  { key: 'task', label: 'Task' },
  { key: 'hours', label: 'Hours', align: 'right' as const },
];

export const TimesheetTable = ({ 
  data,
  onTimesheetAdded,
  onTimesheetUpdated,
  onTimesheetDeleted
}: TimesheetTableProps) => {
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

  return (
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
              key={item.id || item.date}
              data={item}
              isSelected={isSelected(item)}
              onSelect={(selected) => handleRowSelect(item, selected)}
              onView={(timesheet) => {}}
              onEdit={(timesheet) => {}}
              onDelete={(timesheet) => onTimesheetDeleted?.(timesheet)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};