import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, FileEdit, Trash2 } from "lucide-react";
import { useState } from "react";
import { TimesheetEntryModal } from "./TimesheetEntryModal";

interface TimesheetEntry {
  date: string;
  project: string;
  client: string;
  task: string;
  hours: number;
}

export const TimesheetRow = ({ data }: { data: TimesheetEntry }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <TableRow 
        className="border-b border-[#30363D] hover:bg-[#21262D] transition-colors cursor-pointer"
        onClick={handleRowClick}
      >
        <TableCell className="p-4" onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" className="rounded-sm border-[#30363D]" />
        </TableCell>
        <TableCell className="text-white">{data.date}</TableCell>
        <TableCell className="text-white">{data.client}</TableCell>
        <TableCell className="text-white">{data.project}</TableCell>
        <TableCell className="text-white">{data.task}</TableCell>
        <TableCell className="text-white text-right">{data.hours}</TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 justify-end">
            <button 
              className="p-1 hover:bg-[#30363D] rounded-md transition-colors"
              onClick={handleRowClick}
            >
              <Eye className="w-4 h-4 text-[#8B949E]" />
            </button>
            <button 
              className="p-1 hover:bg-[#30363D] rounded-md transition-colors"
              onClick={handleRowClick}
            >
              <FileEdit className="w-4 h-4 text-[#8B949E]" />
            </button>
            <button className="p-1 hover:bg-[#30363D] rounded-md transition-colors">
              <Trash2 className="w-4 h-4 text-[#8B949E]" />
            </button>
          </div>
        </TableCell>
      </TableRow>
      <TimesheetEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        entry={data}
      />
    </>
  );
};