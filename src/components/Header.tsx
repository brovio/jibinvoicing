import { Settings, Sun, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="h-[35px] border-b border-gray-200 bg-white flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <div className="text-primary font-semibold">Bronance</div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <PlusCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Sun className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};