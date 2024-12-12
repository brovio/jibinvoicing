import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickActionCardProps {
  title: string;
}

export const QuickActionCard = ({ title }: QuickActionCardProps) => {
  const getPagePath = (title: string) => {
    switch (title.toLowerCase()) {
      case "clients":
        return "/clients";
      case "invoices":
        return "/invoice-templates";
      case "timesheets":
        return "/timesheets";
      default:
        return "/";
    }
  };

  return (
    <div className="bg-dashboard-card border-dashboard-card rounded-[10px] p-6">
      <div className="flex justify-between items-center mb-4">
        <Link to={getPagePath(title)} className="text-lg font-semibold text-white hover:text-dashboard-primary transition-colors">
          {title}
        </Link>
        <Link to={getPagePath(title)} className="btn-icon">
          <Eye className="h-4 w-4" />
        </Link>
      </div>
      <div className="space-y-4">
        <button className="btn-primary w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add {title}
        </button>
        {(title === "Clients" || title === "Timesheets") && (
          <>
            <button className="btn-primary w-full">
              <Upload className="h-4 w-4 mr-2" />
              Import {title}
            </button>
            <button className="btn-primary w-full">
              <Download className="h-4 w-4 mr-2" />
              Export {title}
            </button>
          </>
        )}
        {title === "Invoices" && (
          <>
            <button className="btn-primary w-full">
              <Upload className="h-4 w-4 mr-2" />
              Import {title}
            </button>
            <button className="btn-primary w-full">
              <Download className="h-4 w-4 mr-2" />
              Export {title}
            </button>
          </>
        )}
      </div>
    </div>
  );
};