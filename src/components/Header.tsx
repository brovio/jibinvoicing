import { Settings, Upload, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="h-[60px] bg-[#0D1117] border-b border-[#21262D] flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-white font-semibold text-lg hover:text-gray-300 transition-colors flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#0EA5E9"/>
            <path d="M19.5 10H12.5C11.1193 10 10 11.1193 10 12.5V19.5C10 20.8807 11.1193 22 12.5 22H19.5C20.8807 22 22 20.8807 22 19.5V12.5C22 11.1193 20.8807 10 19.5 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Bronance
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-9 h-9 text-[#8B949E] hover:text-white hover:bg-[#21262D] rounded-lg">
          <Upload className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="w-9 h-9 text-[#8B949E] hover:text-white hover:bg-[#21262D] rounded-lg">
          <Settings className="h-5 w-5" />
        </Button>

        <Button 
          className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white px-4 py-2 h-9 rounded-lg flex items-center gap-2"
        >
          <Wand2 className="h-4 w-4" />
          Start Wizard
        </Button>
      </div>
    </header>
  );
};