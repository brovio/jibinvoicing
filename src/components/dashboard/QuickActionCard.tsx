import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";

interface QuickActionCardProps {
  title: string;
}

export const QuickActionCard = ({ title }: QuickActionCardProps) => {
  return (
    <div className="dashboard-card">
      <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>
      <div className="space-y-3">
        <Button 
          className="w-full justify-start bg-dashboard-card border border-dashboard-border text-white hover:bg-dashboard-hover" 
          variant="outline"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
        <Button 
          className="w-full justify-start bg-dashboard-card border border-dashboard-border text-white hover:bg-dashboard-hover" 
          variant="outline"
        >
          <Upload className="mr-2 h-4 w-4" /> Import
        </Button>
        <Button 
          className="w-full justify-start bg-dashboard-card border border-dashboard-border text-white hover:bg-dashboard-hover" 
          variant="outline"
        >
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  );
};