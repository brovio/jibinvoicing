import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";

interface ClientEntry {
  company: string;
  contactName: string;
  email: string;
  currency: string;
  rate: number;
  phone?: string;
  address?: string;
  notes?: string;
  website?: string;
}

interface ClientsRowProps {
  data: ClientEntry;
  onView: (client: ClientEntry) => void;
  onEdit: (client: ClientEntry) => void;
  onDelete: (client: ClientEntry) => void;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
}

export const ClientsRow = ({ 
  data, 
  onView, 
  onEdit, 
  onDelete,
  isSelected,
  onSelect
}: ClientsRowProps) => {
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
        onClick={() => onView(data)}
      >
        {data.company}
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={() => onView(data)}
      >
        {data.contactName}
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={() => onView(data)}
      >
        {data.email}
      </TableCell>
      <TableCell 
        className="text-gray-300 cursor-pointer hover:text-white"
        onClick={() => onView(data)}
      >
        {data.currency}
      </TableCell>
      <TableCell 
        className="text-gray-300 text-right cursor-pointer hover:text-white"
        onClick={() => onView(data)}
      >
        {data.rate}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 justify-end">
          <button 
            className="p-1 hover:bg-gray-700 rounded-md transition-colors"
            onClick={() => onView(data)}
          >
            <Eye className="w-4 h-4 text-gray-400" />
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