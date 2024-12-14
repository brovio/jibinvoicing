import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface TimesheetActionsProps {
  onBulkAction: (action: string) => void;
}

export const TimesheetActions = ({ onBulkAction }: TimesheetActionsProps) => {
  return (
    <div className="flex justify-end mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
            <span className="ml-2">Options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onBulkAction('deleteSelected')}>
            Delete Selected
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onBulkAction('deleteAll')}>
            Delete All
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};