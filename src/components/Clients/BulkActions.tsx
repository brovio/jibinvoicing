import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  totalCount: number;
  visibleCount: number;
  onSelectAll: (selectAll: boolean, includeAll?: boolean) => void;
  onBulkUpdate: (field: string, value: string | number) => void;
  onBulkDelete: () => void;
}

export const BulkActions = ({
  selectedCount,
  totalCount,
  visibleCount,
  onSelectAll,
  onBulkUpdate,
  onBulkDelete
}: BulkActionsProps) => {
  return (
    <div className="flex items-center gap-2 justify-end">
      <span className="text-sm text-gray-400">
        {selectedCount} selected
      </span>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 border-gray-800 bg-[#252A38]">
            Actions <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#252A38] border-gray-800">
          <DropdownMenuLabel className="text-gray-400">Selection</DropdownMenuLabel>
          <DropdownMenuItem
            className="text-gray-300 focus:text-white focus:bg-[#2A303F]"
            onClick={() => onSelectAll(true, true)}
          >
            Select all ({totalCount})
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-gray-300 focus:text-white focus:bg-[#2A303F]"
            onClick={() => onSelectAll(true)}
          >
            Select visible ({visibleCount})
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-gray-300 focus:text-white focus:bg-[#2A303F]"
            onClick={() => onSelectAll(false)}
          >
            Clear selection
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuLabel className="text-gray-400">Bulk Actions</DropdownMenuLabel>
          
          <DropdownMenuItem
            className="text-gray-300 focus:text-white focus:bg-[#2A303F]"
            onClick={() => onBulkUpdate('currency', 'USD')}
          >
            Set Currency to USD
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-gray-300 focus:text-white focus:bg-[#2A303F]"
            onClick={() => onBulkUpdate('currency', 'EUR')}
          >
            Set Currency to EUR
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-gray-800" />
          
          <DropdownMenuItem
            className="text-red-500 focus:text-red-400 focus:bg-[#2A303F]"
            onClick={onBulkDelete}
          >
            Delete Selected
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};