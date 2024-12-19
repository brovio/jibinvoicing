import { Settings, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ClientMappingWizard } from "./wizard/ClientMappingWizard";

export const Header = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <header className="h-[60px] bg-[#1A1F2C] border-b border-gray-800 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <Link to="/" className="text-white font-semibold text-lg hover:text-gray-300 transition-colors">
        Bronance
      </Link>
      <div className="flex items-center gap-2">
        <button className="btn-icon">
          <Upload className="h-4 w-4" />
        </button>
        
        <button className="btn-icon">
          <Settings className="h-4 w-4" />
        </button>

        <button 
          className="btn-primary"
          onClick={() => setIsWizardOpen(true)}
        >
          Start Wizard
        </button>

        <ClientMappingWizard 
          isOpen={isWizardOpen}
          onClose={() => setIsWizardOpen(false)}
        />
      </div>
    </header>
  );
};