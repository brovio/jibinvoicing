import { Table, TableBody } from "@/components/ui/table";
import { useState } from "react";
import { TimesheetHeader } from "./TimesheetHeader";
import { TimesheetRow } from "./TimesheetRow";

interface TimesheetEntry {
  date: string;
  project: string;
  task: string;
  hours: number;
  status: string;
}

interface TimesheetTableProps {
  data: TimesheetEntry[];
}

export const TimesheetTable = ({ data }: TimesheetTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TimesheetEntry;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: keyof TimesheetEntry) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="rounded-lg border border-gray-200">
      <Table>
        <TimesheetHeader onSort={requestSort} />
        <TableBody>
          {sortedData.map((entry, index) => (
            <TimesheetRow key={index} entry={entry} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};