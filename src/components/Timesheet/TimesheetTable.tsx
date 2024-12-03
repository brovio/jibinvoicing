import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => requestSort('date')}
            >
              Date
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => requestSort('project')}
            >
              Project
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => requestSort('task')}
            >
              Task
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50 text-right"
              onClick={() => requestSort('hours')}
            >
              Hours
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => requestSort('status')}
            >
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.project}</TableCell>
              <TableCell>{entry.task}</TableCell>
              <TableCell className="text-right">{entry.hours}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  entry.status === 'Approved' 
                    ? 'bg-green-100 text-green-800' 
                    : entry.status === 'Pending' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {entry.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};