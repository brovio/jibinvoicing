import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TableActionsProps {
  onImportSuccess: (clients: any[]) => void;
  clients: any[];
  onAddClick: () => void;
}

export const TableActions = ({ onImportSuccess, clients, onAddClick }: TableActionsProps) => {
  return (
    <div className="flex justify-between items-center gap-4 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search clients..."
          className="pl-9 bg-[#252A38] border-gray-800 text-white placeholder:text-gray-500 rounded-[10px]"
        />
      </div>
      <div className="flex items-center gap-4">
        <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
          <option>All Countries</option>
        </select>
        <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
          <option>All Job Type</option>
        </select>
      </div>
    </div>
  );
};