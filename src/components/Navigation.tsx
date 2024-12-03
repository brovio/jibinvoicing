import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Timesheets" },
  { path: "/clients", label: "Clients" },
  { path: "/invoices", label: "Invoices" },
  { path: "/staff", label: "Staff Info" },
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
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};