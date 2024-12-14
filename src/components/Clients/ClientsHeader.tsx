import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ClientsHeaderProps {
  onSort: (key: string) => void;
  onSelectAll: (selectAll: boolean, includeAll?: boolean) => void;
  totalClients: number;
  visibleClients: number;
}

export const ClientsHeader = ({ onSort, onSelectAll, totalClients, visibleClients }: ClientsHeaderProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    
    if (checked && totalClients > visibleClients) {
      setIsConfirmDialogOpen(true);
    } else {
      onSelectAll(checked, false);
    }
  };

  // Reset checkbox state when total clients changes
  useEffect(() => {
    setIsChecked(false);
  }, [totalClients]);

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
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select All Clients</DialogTitle>
          </DialogHeader>
          <p>Do you want to select all {totalClients} clients, including those not shown on this page?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                onSelectAll(true, false);
                setIsConfirmDialogOpen(false);
              }}
            >
              Current Page Only
            </Button>
            <Button
              className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
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
    </>
  );
};