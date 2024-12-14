import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  totalCount: number;
  visibleCount: number;
  onSelectAll: (selectAll: boolean, includeAll?: boolean) => void;
  onBulkUpdate: (updates: { currency?: string; rate?: number }) => void;
  onBulkDelete: () => void;
}

export const BulkActions = ({
  selectedCount,
  totalCount,
  visibleCount,
  onSelectAll,
  onBulkUpdate,
  onBulkDelete,
}: BulkActionsProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [bulkEdits, setBulkEdits] = useState({ currency: "", rate: "" });

  const handleBulkUpdate = () => {
    const updates: { currency?: string; rate?: number } = {};
    if (bulkEdits.currency) updates.currency = bulkEdits.currency;
    if (bulkEdits.rate) updates.rate = Number(bulkEdits.rate);
    onBulkUpdate(updates);
    setIsEditDialogOpen(false);
    setBulkEdits({ currency: "", rate: "" });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400">
        {selectedCount} of {totalCount} selected
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#252A38] border-gray-800">
          <DropdownMenuItem
            className="text-white hover:bg-[#2A303F] cursor-pointer"
            onClick={() => setIsEditDialogOpen(true)}
          >
            Edit Selected
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white hover:bg-[#2A303F] cursor-pointer"
            onClick={onBulkDelete}
          >
            Delete Selected
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#252A38] border border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Edit Selected Clients</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={bulkEdits.currency}
                onValueChange={(value) => setBulkEdits((prev) => ({ ...prev, currency: value }))}
              >
                <SelectTrigger className="bg-[#1A1F2C] border-gray-700">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1F2C] border-gray-700">
                  {["USD", "EUR", "GBP", "AUD"].map((currency) => (
                    <SelectItem 
                      key={currency} 
                      value={currency}
                      className="text-white hover:bg-[#2A303F] cursor-pointer"
                    >
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Rate</Label>
              <Input
                id="rate"
                type="number"
                value={bulkEdits.rate}
                onChange={(e) => setBulkEdits((prev) => ({ ...prev, rate: e.target.value }))}
                className="bg-[#1A1F2C] border-gray-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="bg-transparent text-white hover:bg-[#2A303F] border-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkUpdate}
              className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
            >
              Update Selected
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};