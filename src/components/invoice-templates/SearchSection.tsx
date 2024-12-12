import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchSection = () => {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search templates..."
          className="pl-9 bg-[#252A38] border-gray-800 text-white placeholder:text-gray-500 rounded-[10px]"
        />
      </div>
      <div className="flex gap-4">
        <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
          <option>All Categories</option>
        </select>
        <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
          <option>All Types</option>
        </select>
      </div>
    </div>
  );
};