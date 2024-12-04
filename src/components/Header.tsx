import { Settings, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="h-[60px] bg-[#1A1F2C] border-b border-gray-800 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <Link to="/" className="text-white font-semibold text-lg hover:text-gray-300 transition-colors">
        Bronance
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:bg-gray-800">
          <Upload className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400 hover:bg-gray-800">
          <Settings className="h-4 w-4" />
        </Button>

        <Button 
          className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white px-4 py-2 rounded-[10px] flex items-center gap-2"
        >
          Start Wizard
        </Button>
      </div>
    </header>
  );
};