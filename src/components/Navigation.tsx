import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Timesheets" },
  { path: "/clients", label: "Clients" },
  { path: "/invoice-preview", label: "Invoice Preview" },
  { path: "/invoices", label: "Invoices" },
  { path: "/staff", label: "Staff Info" },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="h-[50px] bg-white border-b border-gray-200 flex items-center px-4 fixed top-[60px] left-0 right-0 z-40">
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-[#4895EF] text-white"
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