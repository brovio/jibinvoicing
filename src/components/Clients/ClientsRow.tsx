import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, FileEdit, Trash2 } from "lucide-react";

interface ClientEntry {
  company: string;
  contactName: string;
  email: string;
  currency: string;
  rate: number;
}

export const ClientsRow = ({ data }: { data: ClientEntry }) => {
  return (
    <TableRow className="border-b border-gray-800 hover:bg-[#2A303F] transition-colors">
      <TableCell className="p-4">
        <input type="checkbox" className="rounded-sm border-gray-700" />
      </TableCell>
      <TableCell className="text-gray-300">{data.company}</TableCell>
      <TableCell className="text-gray-300">{data.contactName}</TableCell>
      <TableCell className="text-gray-300">{data.email}</TableCell>
      <TableCell className="text-gray-300">{data.currency}</TableCell>
      <TableCell className="text-gray-300 text-right">{data.rate}</TableCell>
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