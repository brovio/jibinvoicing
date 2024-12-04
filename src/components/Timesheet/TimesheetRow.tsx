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
    <TableRow className="border-b border-gray-800 hover:bg-[#2A303F] transition-colors">
      <TableCell className="p-4">
        <input type="checkbox" className="rounded-sm border-gray-700" />
      </TableCell>
      <TableCell className="text-gray-300">{data.date}</TableCell>
      <TableCell className="text-gray-300">{data.client}</TableCell>
      <TableCell className="text-gray-300">{data.project}</TableCell>
      <TableCell className="text-gray-300">{data.task}</TableCell>
      <TableCell className="text-gray-300 text-right">{data.hours}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2 justify-end">
          <button className="p-1 hover:bg-gray-700 rounded-md transition-colors">
            <Eye className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded-md transition-colors">
            <FileEdit className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded-md transition-colors">
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};