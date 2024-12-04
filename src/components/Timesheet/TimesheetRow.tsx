import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, FileEdit, Trash2 } from "lucide-react";

interface TimesheetEntry {
  date: string;
  project: string;
  client: string;
  task: string;
  hours: number;
}

export const TimesheetRow = ({ data }: { data: TimesheetEntry }) => {
  return (
    <TableRow className="border-b border-[#30363D] hover:bg-[#21262D] transition-colors">
      <TableCell className="p-4">
        <input type="checkbox" className="rounded-sm border-[#30363D]" />
      </TableCell>
      <TableCell className="text-white">{data.date}</TableCell>
      <TableCell className="text-white">{data.client}</TableCell>
      <TableCell className="text-white">{data.project}</TableCell>
      <TableCell className="text-white">{data.task}</TableCell>
      <TableCell className="text-white text-right">{data.hours}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2 justify-end">
          <button className="p-1 hover:bg-[#30363D] rounded-md transition-colors">
            <Eye className="w-4 h-4 text-[#8B949E]" />
          </button>
          <button className="p-1 hover:bg-[#30363D] rounded-md transition-colors">
            <FileEdit className="w-4 h-4 text-[#8B949E]" />
          </button>
          <button className="p-1 hover:bg-[#30363D] rounded-md transition-colors">
            <Trash2 className="w-4 h-4 text-[#8B949E]" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};