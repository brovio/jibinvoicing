import { Input } from "@/components/ui/input";
import { Search, Settings } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TableActionsProps {
  onImportSuccess: (clients: any[]) => void;
  clients: any[];
  onAddClick: () => void;
  onRateFilterChange: (range: string) => void;
  onCurrencyFilterChange: (currency: string) => void;
  onBulkAction?: (action: 'deleteAll' | 'editCurrency' | 'editRate' | 'deleteSelected') => void;
}

export const TableActions = ({ 
  onImportSuccess, 
  clients, 
  onAddClick,
  onRateFilterChange,
  onCurrencyFilterChange,
  onBulkAction
}: TableActionsProps) => {
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
        <select 
          className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2"
          onChange={(e) => onRateFilterChange(e.target.value)}
        >
          <option value="">All Rates</option>
          <option value="0-30">$0 - $30</option>
          <option value="30-50">$30 - $50</option>
          <option value="50-100">$50 - $100</option>
        </select>
        <select 
          className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2"
          onChange={(e) => onCurrencyFilterChange(e.target.value)}
        >
          <option value="">All Currencies</option>
          <option value="AUD">AUD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="USD">USD</option>
        </select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] p-2 hover:bg-[#2A303F] transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-[#252A38] border-gray-800">
            <DropdownMenuItem 
              className="text-gray-400 hover:text-white cursor-pointer"
              onClick={() => onBulkAction?.('deleteAll')}
            >
              Delete All
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-gray-400 hover:text-white cursor-pointer"
              onClick={() => onBulkAction?.('editCurrency')}
            >
              Edit Currency
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-gray-400 hover:text-white cursor-pointer"
              onClick={() => onBulkAction?.('editRate')}
            >
              Edit Rate
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-gray-400 hover:text-white cursor-pointer"
              onClick={() => onBulkAction?.('deleteSelected')}
            >
              Delete Selected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};