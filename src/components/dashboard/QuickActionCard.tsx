import { Plus, Upload, Download } from "lucide-react";

interface QuickActionCardProps {
  title: string;
}

export const QuickActionCard = ({ title }: QuickActionCardProps) => {
  return (
    <div className="dashboard-card">
      <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>
      <div className="space-y-3">
        <button className="btn-secondary w-full flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add New
        </button>
        <button className="btn-secondary w-full flex items-center">
          <Upload className="mr-2 h-4 w-4" /> Import
        </button>
        <button className="btn-secondary w-full flex items-center">
          <Download className="mr-2 h-4 w-4" /> Export
        </button>
      </div>
    </div>
  );
};