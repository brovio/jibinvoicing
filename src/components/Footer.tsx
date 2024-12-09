import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="w-full mt-auto">
      <Separator className="bg-dashboard-border" />
      <div className="flex justify-center py-4">
        <a
          href="https://brov.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          brov.io
        </a>
      </div>
      <Separator className="bg-dashboard-border mb-4" />
      <div className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};