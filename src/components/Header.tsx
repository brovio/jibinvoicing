import { Settings, Sun, Moon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="h-[35px] bg-white/10 backdrop-blur-sm border-b border-white/20 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <div className="text-white font-semibold">Bronance</div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/20">
          <Upload className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/20">
          <Settings className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" className="w-8 h-8 text-white hover:bg-white/20" onClick={toggleTheme}>
          {theme === "light" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </header>
  );
};