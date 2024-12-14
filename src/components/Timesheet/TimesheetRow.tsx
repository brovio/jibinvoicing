import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, FileEdit, Trash2, Info } from "lucide-react";
import { TimesheetEntry } from "@/utils/timesheetParser";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const TimesheetRow = ({ data }: { data: TimesheetEntry }) => {
  const isError = data.status.startsWith('Error');

  return (
    <TableRow className={`border-b border-gray-800 hover:bg-[#2A303F] transition-colors ${
      isError ? 'bg-red-900/20' : ''
    }`}>
      <TableCell className="p-4">
        <input type="checkbox" className="rounded-sm border-gray-700" />
      </TableCell>
      <TableCell className="text-gray-300">{data.date}</TableCell>
      <TableCell className="text-gray-300">{data.client}</TableCell>
      <TableCell className="text-gray-300">{data.project}</TableCell>
      <TableCell className="text-gray-300">{data.task}</TableCell>
      <TableCell className="text-gray-300 text-right">{data.hours}</TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info 
                className={`w-4 h-4 ${isError ? 'text-red-400' : 'text-green-400'}`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{isError ? data.flag_reason : 'Success'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
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