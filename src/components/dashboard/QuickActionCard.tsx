import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Upload, Download } from "lucide-react";

interface QuickActionCardProps {
  title: string;
}

export const QuickActionCard = ({ title }: QuickActionCardProps) => {
  return (
    <Card className="p-6 bg-white">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Upload className="mr-2 h-4 w-4" /> Import
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
    </Card>
  );
};