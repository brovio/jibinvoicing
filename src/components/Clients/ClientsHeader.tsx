import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ClientsHeaderProps {
  onSort: (key: string) => void;
  onSelectAll: (selectAll: boolean, includeAll?: boolean) => void;
  totalClients: number;
  visibleClients: number;
  onClientsDeleted?: () => void;
}

export const ClientsHeader = ({ 
  onSort, 
  onSelectAll, 
  totalClients, 
  visibleClients,
  onClientsDeleted 
}: ClientsHeaderProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    
    if (checked && totalClients > visibleClients) {
      setIsConfirmDialogOpen(true);
    } else {
      onSelectAll(checked);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .neq('id', 'placeholder'); // This will delete all records

      if (error) throw error;

      toast.success('All clients have been deleted');
      onClientsDeleted?.();
      setIsDeleteAllDialogOpen(false);
    } catch (error) {
      console.error('Error deleting clients:', error);
      toast.error('Failed to delete clients');
    }
  };

  return (
    <>
      <TableHeader>
        <TableRow className="border-b border-gray-800 hover:bg-transparent">
          <TableHead 
            className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors w-[40px] p-4"
          >
            <input 
              type="checkbox" 
              className="rounded-sm border-gray-700"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </TableHead>
          <TableHead 
            className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors"
            onClick={() => onSort('company')}
          >
            Company
          </TableHead>
          <TableHead 
            className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors"
            onClick={() => onSort('contactName')}
          >
            Contact Name
          </TableHead>
          <TableHead 
            className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors"
            onClick={() => onSort('email')}
          >
            Email
          </TableHead>
          <TableHead 
            className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors"
            onClick={() => onSort('currency')}
          >
            Currency
          </TableHead>
          <TableHead 
            className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors text-right"
            onClick={() => onSort('rate')}
          >
            Rate
          </TableHead>
          <TableHead 
            className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors w-[100px]"
          >
            <div className="flex justify-between items-center">
              Actions
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#252A38] border-gray-800">
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                    onClick={() => setIsDeleteAllDialogOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete All Clients
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="bg-[#252A38] border border-gray-800 text-white rounded-[10px]">
          <DialogHeader>
            <DialogTitle className="text-white">Select All Clients</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">Do you want to select all {totalClients} clients, including those not shown on this page?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                onSelectAll(true, false);
                setIsConfirmDialogOpen(false);
              }}
              className="bg-transparent border-gray-700 text-white hover:bg-gray-800 rounded-[10px]"
            >
              Current Page Only
            </Button>
            <Button
              className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 rounded-[10px]"
              onClick={() => {
                onSelectAll(true, true);
                setIsConfirmDialogOpen(false);
              }}
            >
              Select All {totalClients} Clients
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteAllDialogOpen} onOpenChange={setIsDeleteAllDialogOpen}>
        <DialogContent className="bg-[#252A38] border border-gray-800 text-white rounded-[10px]">
          <DialogHeader>
            <DialogTitle className="text-white">Delete All Clients</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">Are you sure you want to delete all clients? This action cannot be undone.</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteAllDialogOpen(false)}
              className="bg-transparent border-gray-700 text-white hover:bg-gray-800 rounded-[10px]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAll}
              className="bg-red-500 hover:bg-red-600 rounded-[10px]"
            >
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};