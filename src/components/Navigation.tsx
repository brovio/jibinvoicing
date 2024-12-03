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
    <nav className="h-12 bg-white/10 backdrop-blur-sm border-b border-white/20 flex items-center px-4 fixed top-[35px] left-0 right-0 z-40">
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-white text-[#4895EF]"
                : "text-white hover:bg-white/20"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};