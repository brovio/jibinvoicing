import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TimesheetHeaderProps {
  onSort: (key: string) => void;
}

export const TimesheetHeader = ({ onSort }: TimesheetHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-700">
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#252A38] transition-colors w-[40px] p-4"
        >
          <input type="checkbox" className="rounded-sm border-gray-600" />
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#252A38] transition-colors"
          onClick={() => onSort('date')}
        >
          Date
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#252A38] transition-colors"
          onClick={() => onSort('client')}
        >
          Client
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#252A38] transition-colors"
          onClick={() => onSort('project')}
        >
          Project
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#252A38] transition-colors"
          onClick={() => onSort('task')}
        >
          Task
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#252A38] transition-colors text-right"
          onClick={() => onSort('hours')}
        >
          Hours
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#252A38] transition-colors w-[100px]"
        >
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};