import { TableCell, TableRow } from "@/components/ui/table";
import { FileEdit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { TimesheetEntry } from "./types/timesheet";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
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
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={5} minSize={5}>
          <TableCell className="flex items-center justify-center py-2">
            <input 
              type="checkbox" 
              className="rounded-sm border-gray-700"
              checked={isSelected}
              onChange={(e) => onSelect(e.target.checked)}
            />
          </TableCell>
        </ResizablePanel>
        <ResizablePanel defaultSize={12} minSize={12}>
          <TableCell 
            className="text-gray-300 cursor-pointer hover:text-white py-2 pl-4"
            onClick={() => onEdit(data)}
          >
            {data.date}
          </TableCell>
        </ResizablePanel>
        <ResizablePanel defaultSize={15} minSize={15}>
          <TableCell 
            className="text-gray-300 cursor-pointer hover:text-white py-2 pl-4"
            onClick={() => onEdit(data)}
          >
            {data.client}
          </TableCell>
        </ResizablePanel>
        <ResizablePanel defaultSize={15} minSize={15}>
          <TableCell 
            className="text-gray-300 cursor-pointer hover:text-white py-2 pl-4"
            onClick={() => onEdit(data)}
          >
            {data.activity}
          </TableCell>
        </ResizablePanel>
        <ResizablePanel defaultSize={30} minSize={20}>
          <TableCell 
            className="text-gray-300 cursor-pointer hover:text-white py-2 pl-4"
            onClick={() => onEdit(data)}
          >
            {data.notes}
          </TableCell>
        </ResizablePanel>
        <ResizablePanel defaultSize={10} minSize={10}>
          <TableCell 
            className="text-gray-300 cursor-pointer hover:text-white py-2 text-center"
            onClick={() => onEdit(data)}
          >
            {data.duration}
          </TableCell>
        </ResizablePanel>
        <ResizablePanel defaultSize={10} minSize={10}>
          <TableCell className="py-2 flex items-center justify-center">
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
        </ResizablePanel>
        <ResizablePanel defaultSize={8} minSize={8}>
          <TableCell>
            <div className="flex items-center justify-center gap-2">
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </TableRow>
  );
};