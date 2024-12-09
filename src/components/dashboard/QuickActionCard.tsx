import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickActionCardProps {
  title: string;
}

export const QuickActionCard = ({ title }: QuickActionCardProps) => {
  return (
    <div className="bg-dashboard-card h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-white p-6 pb-0">{title}</h2>
      <div className="space-y-4 p-6 flex-grow flex flex-col">
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
            {title === "Clients" && (
              <Link to="/clients" className="mt-auto">
                <button className="w-full border border-dashboard-primary bg-transparent text-dashboard-primary hover:bg-dashboard-primary/10 rounded-[10px] px-4 py-2 transition-colors duration-200">
                  View Clients Page
                </button>
              </Link>
            )}
            {title === "Timesheets" && (
              <Link to="/timesheets" className="mt-auto">
                <button className="w-full border border-dashboard-primary bg-transparent text-dashboard-primary hover:bg-dashboard-primary/10 rounded-[10px] px-4 py-2 transition-colors duration-200">
                  View Timesheets Page
                </button>
              </Link>
            )}
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
            <Link to="/invoices" className="mt-auto">
              <button className="w-full border border-dashboard-primary bg-transparent text-dashboard-primary hover:bg-dashboard-primary/10 rounded-[10px] px-4 py-2 transition-colors duration-200">
                View Invoices Page
              </button>
            </Link>
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
            {title === "Invoice Templates" && (
              <Link to="/invoice-templates" className="mt-auto">
                <button className="w-full border border-dashboard-primary bg-transparent text-dashboard-primary hover:bg-dashboard-primary/10 rounded-[10px] px-4 py-2 transition-colors duration-200">
                  View Invoice Templates
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};