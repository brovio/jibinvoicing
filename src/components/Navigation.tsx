import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Clock, 
  Users, 
  FileText, 
  Receipt, 
  UserCircle, 
  Settings 
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: <Clock className="h-4 w-4" /> },
  { path: "/timesheets", label: "Timesheets", icon: <Clock className="h-4 w-4" /> },
  { path: "/clients", label: "Clients", icon: <Users className="h-4 w-4" /> },
  { path: "/invoice-preview", label: "Invoice Preview", icon: <FileText className="h-4 w-4" /> },
  { path: "/invoices", label: "Invoices", icon: <Receipt className="h-4 w-4" /> },
  { path: "/staff", label: "Staff Info", icon: <UserCircle className="h-4 w-4" /> },
  { path: "/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> }
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="h-12 border-b border-gray-200 bg-white flex items-center px-4 fixed top-[35px] left-0 right-0 z-40">
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
              location.pathname === item.path
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};