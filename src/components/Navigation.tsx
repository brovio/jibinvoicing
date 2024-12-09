import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/timesheets", label: "Timesheets" },
  { path: "/clients", label: "Clients" },
  { path: "/invoice-templates", label: "Invoice Templates" },
  { path: "/invoices", label: "Invoices" },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="h-[50px] bg-[#1A1F2C] border-b border-gray-800 flex items-center px-4 fixed top-[60px] left-0 right-0 z-40">
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "px-4 py-1.5 rounded-[10px] text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-[#0EA5E9] text-white"
                : "text-gray-400 hover:bg-gray-800"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};