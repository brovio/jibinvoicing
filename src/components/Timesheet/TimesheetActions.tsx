import React from 'react';
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const TimesheetActions = () => {
  return (
    <div className="flex justify-end mb-4">
      <Button variant="outline" size="sm">
        <MoreHorizontal className="h-4 w-4" />
        <span className="ml-2">Options</span>
      </Button>
    </div>
  );
};