import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export interface Column {
  key: string;
  label: string;
  width?: number;
  minWidth?: number;
  align?: 'left' | 'right';
}

interface TableHeaderProps {
  columns: Column[];
  onSort: (key: string) => void;
  onSelectAll: (selectAll: boolean, includeAll?: boolean) => void;
  totalItems: number;
  visibleItems: number;
  selectedCount: number;
  excludedCount: number;
  selectAllMode: boolean;
}

export const SharedTableHeader = ({ 
  columns,
  onSort, 
  onSelectAll, 
  totalItems, 
  visibleItems,
  selectedCount,
  excludedCount,
  selectAllMode
}: TableHeaderProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const isChecked = selectAllMode ? 
    excludedCount === 0 : 
    selectedCount > 0 && selectedCount === visibleItems;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    
    if (checked && totalItems > visibleItems) {
      setIsConfirmDialogOpen(true);
    } else {
      onSelectAll(checked, checked);
    }
  };

  return (
    <>
      <TableHeader>
        <TableRow className="border-b border-gray-800 hover:bg-transparent">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={5} minSize={5}>
              <TableHead className="text-gray-400 font-medium w-[40px] p-4">
                <input 
                  type="checkbox" 
                  className="rounded-sm border-gray-700"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </TableHead>
            </ResizablePanel>
            {columns.map((column) => (
              <ResizablePanel 
                key={column.key} 
                defaultSize={column.width || 100 / columns.length}
                minSize={column.minWidth || 10}
              >
                <TableHead 
                  className={`text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors ${
                    column.align === 'right' ? 'text-right' : ''
                  }`}
                  onClick={() => onSort(column.key)}
                >
                  {column.label}
                </TableHead>
              </ResizablePanel>
            ))}
            <ResizablePanel defaultSize={10} minSize={10}>
              <TableHead className="text-gray-400 font-medium">
                Actions
              </TableHead>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TableRow>
      </TableHeader>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select All Items</DialogTitle>
          </DialogHeader>
          <p>Do you want to select all {totalItems} items, including those not shown on this page?</p>
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
              Select All {totalItems} Items
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};