import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useClientMappingWizard } from "./hooks/useClientMappingWizard";
import { ClientMappingTable } from "./ClientMappingTable";
import { Loader2 } from "lucide-react";

export const ClientMappingWizard = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    mappings,
    isLoading,
    handleUpdateMapping,
    handleVerifyAll,
    unmappedCount,
  } = useClientMappingWizard();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Client Mapping Wizard</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {unmappedCount} clients need to be mapped
            </p>
            <Button 
              variant="outline" 
              onClick={handleVerifyAll}
              disabled={isLoading || unmappedCount === 0}
            >
              Verify All Suggested Matches
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <ClientMappingTable 
              mappings={mappings} 
              onUpdateMapping={handleUpdateMapping} 
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};