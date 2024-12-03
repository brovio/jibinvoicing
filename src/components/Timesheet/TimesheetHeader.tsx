import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TimesheetHeaderProps {
  onSort: (key: string) => void;
}

export const TimesheetHeader = ({ onSort }: TimesheetHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort('date')}
        >
          Date
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort('project')}
        >
          Project
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort('task')}
        >
          Task
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50 text-right"
          onClick={() => onSort('hours')}
        >
          Hours
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => onSort('status')}
        >
          Status
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};