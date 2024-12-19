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
      <DialogContent className="max-w-5xl bg-dashboard-card border-dashboard-border">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Client Mapping Wizard</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">
              {unmappedCount} clients need to be mapped
            </p>
            <Button 
              variant="outline" 
              onClick={handleVerifyAll}
              disabled={isLoading || unmappedCount === 0}
              className="bg-dashboard-hover border-dashboard-border text-white hover:bg-dashboard-primary hover:text-white"
            >
              Verify All Suggested Matches
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-dashboard-primary" />
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto">
              <ClientMappingTable 
                mappings={mappings} 
                onUpdateMapping={handleUpdateMapping} 
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};