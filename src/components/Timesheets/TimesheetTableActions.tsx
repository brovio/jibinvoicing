import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimesheetTableActionsProps {
  onSearchChange: (value: string) => void;
  onClientFilterChange: (value: string) => void;
  onActivityFilterChange: (value: string) => void;
  onStaffFilterChange: (value: string) => void;
  uniqueClients: string[];
  uniqueActivities: string[];
  uniqueStaffNames: string[];
}

export const TimesheetTableActions = ({
  onSearchChange,
  onClientFilterChange,
  onActivityFilterChange,
  onStaffFilterChange,
  uniqueClients,
  uniqueActivities,
  uniqueStaffNames,
}: TimesheetTableActionsProps) => {
  return (
    <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center">
      <Input
        placeholder="Search timesheets..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-[300px] bg-[#1F2937] border-gray-700 text-white"
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <Select onValueChange={onClientFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-[#1F2937] border-gray-700 text-white">
            <SelectValue placeholder="Filter by client" />
          </SelectTrigger>
          <SelectContent className="bg-[#1F2937] border-gray-700">
            <SelectItem value="all_clients" className="text-white hover:bg-[#2A303F] cursor-pointer">
              All Clients
            </SelectItem>
            {uniqueClients.map((client) => (
              <SelectItem 
                key={client} 
                value={client}
                className="text-white hover:bg-[#2A303F] cursor-pointer"
              >
                {client}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onActivityFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-[#1F2937] border-gray-700 text-white">
            <SelectValue placeholder="Filter by activity" />
          </SelectTrigger>
          <SelectContent className="bg-[#1F2937] border-gray-700">
            <SelectItem value="all_activities" className="text-white hover:bg-[#2A303F] cursor-pointer">
              All Activities
            </SelectItem>
            {uniqueActivities.map((activity) => (
              <SelectItem 
                key={activity} 
                value={activity}
                className="text-white hover:bg-[#2A303F] cursor-pointer"
              >
                {activity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onStaffFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-[#1F2937] border-gray-700 text-white">
            <SelectValue placeholder="Filter by staff" />
          </SelectTrigger>
          <SelectContent className="bg-[#1F2937] border-gray-700">
            <SelectItem value="all_staff" className="text-white hover:bg-[#2A303F] cursor-pointer">
              All Staff
            </SelectItem>
            {uniqueStaffNames.map((name) => (
              <SelectItem 
                key={name} 
                value={name}
                className="text-white hover:bg-[#2A303F] cursor-pointer"
              >
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};