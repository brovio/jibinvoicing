import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="h-[40px] bg-[#0D1117] border-b border-[#21262D] flex items-center px-4 fixed top-[60px] left-0 right-0 z-40">
      <div className="flex gap-6">
        <Link
          to="/timesheets"
          className={`text-sm ${
            isActive("/timesheets")
              ? "text-white border-b-2 border-[#0EA5E9]"
              : "text-[#8B949E] hover:text-white"
          } h-[40px] flex items-center transition-colors`}
        >
          Timesheets
        </Link>
        <Link
          to="/clients"
          className={`text-sm ${
            isActive("/clients")
              ? "text-white border-b-2 border-[#0EA5E9]"
              : "text-[#8B949E] hover:text-white"
          } h-[40px] flex items-center transition-colors`}
        >
          Clients
        </Link>
        <Link
          to="/invoice-templates"
          className={`text-sm ${
            isActive("/invoice-templates")
              ? "text-white border-b-2 border-[#0EA5E9]"
              : "text-[#8B949E] hover:text-white"
          } h-[40px] flex items-center transition-colors`}
        >
          Invoice Templates
        </Link>
        <Link
          to="/invoices"
          className={`text-sm ${
            isActive("/invoices")
              ? "text-white border-b-2 border-[#0EA5E9]"
              : "text-[#8B949E] hover:text-white"
          } h-[40px] flex items-center transition-colors`}
        >
          Invoices
        </Link>
      </div>
    </nav>
  );
};