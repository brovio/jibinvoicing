import { Settings, Sun, Moon, PlusCircle } from "lucide-react";
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
  const [colorTheme, setColorTheme] = useState<"default" | "purple" | "blue">("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const savedColorTheme = localStorage.getItem("colorTheme") as "default" | "purple" | "blue";
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
    
    if (savedColorTheme) {
      setColorTheme(savedColorTheme);
      document.documentElement.setAttribute("data-theme", savedColorTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  const changeColorTheme = (newTheme: "default" | "purple" | "blue") => {
    setColorTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("colorTheme", newTheme);
  };

  return (
    <header className="h-[35px] border-b border-gray-200 bg-background flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <div className="text-primary font-semibold">Bronance</div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <PlusCircle className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeColorTheme("default")}>
              Default Theme
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeColorTheme("purple")}>
              Purple Theme
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeColorTheme("blue")}>
              Blue Theme
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={toggleTheme}>
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