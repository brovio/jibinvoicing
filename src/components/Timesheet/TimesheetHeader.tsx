import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TimesheetHeaderProps {
  onSort: (key: string) => void;
}

export const TimesheetHeader = ({ onSort }: TimesheetHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="border-b border-[#30363D] hover:bg-transparent">
        <TableHead className="w-[40px] p-4">
          <input type="checkbox" className="rounded-sm border-[#30363D]" />
        </TableHead>
        <TableHead 
          className="text-[#8B949E] font-medium cursor-pointer hover:bg-[#21262D] transition-colors"
          onClick={() => onSort('date')}
        >
          Date
        </TableHead>
        <TableHead 
          className="text-[#8B949E] font-medium cursor-pointer hover:bg-[#21262D] transition-colors"
          onClick={() => onSort('client')}
        >
          Client
        </TableHead>
        <TableHead 
          className="text-[#8B949E] font-medium cursor-pointer hover:bg-[#21262D] transition-colors"
          onClick={() => onSort('project')}
        >
          Project
        </TableHead>
        <TableHead 
          className="text-[#8B949E] font-medium cursor-pointer hover:bg-[#21262D] transition-colors"
          onClick={() => onSort('task')}
        >
          Task
        </TableHead>
        <TableHead 
          className="text-[#8B949E] font-medium cursor-pointer hover:bg-[#21262D] transition-colors text-right"
          onClick={() => onSort('hours')}
        >
          Hours
        </TableHead>
        <TableHead className="text-[#8B949E] font-medium w-[100px] text-right">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};