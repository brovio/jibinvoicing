import { Settings, Sun, Moon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <header className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <Link to="/" className="text-[#4895EF] font-semibold text-lg hover:text-[#3A0CA3] transition-colors">
        Bronance
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-700 hover:bg-gray-100">
          <Upload className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-700 hover:bg-gray-100">
          <Settings className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-700 hover:bg-gray-100" onClick={toggleTheme}>
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