import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TimesheetHeaderProps {
  onSort: (key: string) => void;
}

export const TimesheetHeader = ({ onSort }: TimesheetHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-200">
        <TableHead 
          className="text-gray-600 font-medium cursor-pointer hover:bg-gray-50"
          onClick={() => onSort('date')}
        >
          Date
        </TableHead>
        <TableHead 
          className="text-gray-600 font-medium cursor-pointer hover:bg-gray-50"
          onClick={() => onSort('project')}
        >
          Project
        </TableHead>
        <TableHead 
          className="text-gray-600 font-medium cursor-pointer hover:bg-gray-50"
          onClick={() => onSort('task')}
        >
          Task
        </TableHead>
        <TableHead 
          className="text-gray-600 font-medium cursor-pointer hover:bg-gray-50 text-right"
          onClick={() => onSort('hours')}
        >
          Hours
        </TableHead>
        <TableHead 
          className="text-gray-600 font-medium cursor-pointer hover:bg-gray-50"
          onClick={() => onSort('status')}
        >
          Status
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};