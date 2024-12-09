import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";

interface QuickActionCardProps {
  title: string;
}

export const QuickActionCard = ({ title }: QuickActionCardProps) => {
  return (
    <div className="bg-dashboard-card border-dashboard-card rounded-[10px] p-6">
      <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>
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
        {title !== "Clients" && title !== "Timesheets" && title !== "Invoices" && (
          <>
            <button className="btn-secondary w-full">
              <Upload className="h-4 w-4 mr-2" />
              Import {title}
            </button>
            <button className="btn-secondary w-full">
              <Download className="h-4 w-4 mr-2" />
              Export {title}
            </button>
          </>
        )}
      </div>
    </div>
  );
};