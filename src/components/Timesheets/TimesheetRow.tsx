import { TableCell, TableRow } from "@/components/ui/table";
import { FileEdit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { TimesheetEntry } from "./types/timesheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TimesheetRowProps {
  data: TimesheetEntry;
  onView: (timesheet: TimesheetEntry) => void;
  onEdit: (timesheet: TimesheetEntry) => void;
  onDelete: (timesheet: TimesheetEntry) => void;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}

export const TimesheetRow = ({ 
  data, 
  onView, 
  onEdit, 
  onDelete,
  isSelected,
  onSelect
}: TimesheetRowProps) => {
  const isFlagged = data.flagged || false;
  
  return (
    <TableRow className="border-b border-gray-800 hover:bg-[#2A303F] transition-colors">
      <TableCell className="p-4">
        <input 
          type="checkbox" 
          className="rounded-sm border-gray-700"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
        />
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={() => onEdit(data)}
      >
        {data.date}
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={() => onEdit(data)}
      >
        {data.client}
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={() => onEdit(data)}
      >
        {data.activity}
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={() => onEdit(data)}
      >
        {data.notes}
      </TableCell>
      <TableCell 
        className="text-gray-300 text-right cursor-pointer hover:text-white"
        onClick={() => onEdit(data)}
      >
        {data.duration}
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {isFlagged ? (
                <XCircle className="w-5 h-5 text-red-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isFlagged
                  ? `Flagged: ${data.flag_reason || 'No reason provided'}`
                  : 'Entry Approved'}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 justify-end">
          <button 
            className="p-1 hover:bg-gray-700 rounded-md transition-colors"
            onClick={() => onEdit(data)}
          >
            <FileEdit className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            className="p-1 hover:bg-gray-700 rounded-md transition-colors"
            onClick={() => onDelete(data)}
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};