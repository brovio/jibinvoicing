import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";

interface QuickActionCardProps {
  title: string;
}

export const QuickActionCard = ({ title }: QuickActionCardProps) => {
  return (
    <div className="dashboard-card">
      <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>
      <div className="space-y-4">
        <button className="btn-primary w-full">
          + Add {title}
        </button>
        <button className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors">
          <Upload className="h-4 w-4" />
          Import {title}
        </button>
        <button className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors">
          <Download className="h-4 w-4" />
          Export {title}
        </button>
      </div>
    </div>
  );
};