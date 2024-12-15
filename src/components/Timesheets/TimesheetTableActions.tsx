import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TimesheetTableActionsProps {
  onSearchChange: (query: string) => void;
  onClientFilterChange: (client: string) => void;
  onActivityFilterChange: (activity: string) => void;
  uniqueClients: string[];
  uniqueActivities: string[];
}

export const TimesheetTableActions = ({ 
  onSearchChange,
  onClientFilterChange,
  onActivityFilterChange,
  uniqueClients,
  uniqueActivities
}: TimesheetTableActionsProps) => {
  return (
    <div className="flex justify-between items-center gap-4 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search timesheets..."
          className="pl-9 bg-[#252A38] border-gray-800 text-white placeholder:text-gray-500 rounded-[10px]"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <select 
          className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2"
          onChange={(e) => onClientFilterChange(e.target.value)}
        >
          <option value="">All Clients</option>
          {uniqueClients.map(client => (
            <option key={client} value={client}>{client}</option>
          ))}
        </select>
        <select 
          className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2"
          onChange={(e) => onActivityFilterChange(e.target.value)}
        >
          <option value="">All Activities</option>
          {uniqueActivities.map(activity => (
            <option key={activity} value={activity}>{activity}</option>
          ))}
        </select>
      </div>
    </div>
  );
};