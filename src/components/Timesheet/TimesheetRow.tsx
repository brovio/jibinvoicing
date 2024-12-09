import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, FileEdit, Trash2 } from "lucide-react";
import { TimesheetEntry } from "@/utils/timesheetParser";

interface TimesheetRowProps {
  data: TimesheetEntry;
  onView?: (entry: TimesheetEntry) => void;
  onEdit?: (entry: TimesheetEntry) => void;
  onDelete?: (entry: TimesheetEntry) => void;
}

export const TimesheetRow = ({ data, onView, onEdit, onDelete }: TimesheetRowProps) => {
  const handleCellClick = () => {
    if (onView) {
      onView(data);
    }
  };

  return (
    <TableRow className="border-b border-gray-800 hover:bg-[#2A303F] transition-colors">
      <TableCell className="p-4">
        <input type="checkbox" className="rounded-sm border-gray-700" />
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={handleCellClick}
      >
        {data.date}
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={handleCellClick}
      >
        {data.client}
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={handleCellClick}
      >
        {data.project}
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={handleCellClick}
      >
        {data.task}
      </TableCell>
      <TableCell 
        className="text-gray-300 text-right cursor-pointer hover:text-white"
        onClick={handleCellClick}
      >
        {data.hours}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 justify-end">
          <button 
            className="p-1 hover:bg-gray-700 rounded-md transition-colors"
            onClick={() => onView?.(data)}
          >
            <Eye className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            className="p-1 hover:bg-gray-700 rounded-md transition-colors"
            onClick={() => onEdit?.(data)}
          >
            <FileEdit className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            className="p-1 hover:bg-gray-700 rounded-md transition-colors"
            onClick={() => onDelete?.(data)}
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};