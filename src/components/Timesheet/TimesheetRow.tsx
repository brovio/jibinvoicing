import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, FileEdit, Trash2 } from "lucide-react";
import { TimesheetEntryModal } from "./TimesheetEntryModal";
import { useState } from "react";
import { TimesheetEntry } from "@/utils/timesheetUtils";

interface TimesheetRowProps {
  data: TimesheetEntry;
}

export const TimesheetRow = ({ data }: TimesheetRowProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = () => {
    setShowModal(true);
  };

  return (
    <>
      <TableRow className="border-b border-[#30363D] hover:bg-[#21262D] transition-colors cursor-pointer" onClick={handleViewDetails}>
        <TableCell className="p-4">
          <input 
            type="checkbox" 
            className="rounded-sm border-[#30363D]"
            onClick={(e) => e.stopPropagation()} 
          />
        </TableCell>
        <TableCell className="text-white">{data.date}</TableCell>
        <TableCell className="text-white">{data.client}</TableCell>
        <TableCell className="text-white">{data.project}</TableCell>
        <TableCell className="text-white">{data.tasks}</TableCell>
        <TableCell className="text-white text-right">{data.duration}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2 justify-end">
            <button 
              className="p-1 hover:bg-[#30363D] rounded-md transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              <Eye className="w-4 h-4 text-[#8B949E]" />
            </button>
            <button 
              className="p-1 hover:bg-[#30363D] rounded-md transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FileEdit className="w-4 h-4 text-[#8B949E]" />
            </button>
            <button 
              className="p-1 hover:bg-[#30363D] rounded-md transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 className="w-4 h-4 text-[#8B949E]" />
            </button>
          </div>
        </TableCell>
      </TableRow>
      <TimesheetEntryModal
        entry={data}
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};