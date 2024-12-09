import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const ImportExportSection = () => {
  const { toast } = useToast();

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const content = await file.text();
        const templates = JSON.parse(content);
        toast({
          title: "Import successful",
          description: "Invoice templates have been imported successfully",
        });
      } catch (error) {
        toast({
          title: "Import failed",
          description: "There was an error importing your templates",
          variant: "destructive",
        });
      }
    };
    input.click();
  };

  const handleExport = () => {
    try {
      const exportData = [
        {
          name: "Theme Y",
          description: "Modern and professional invoice template",
          config: {
            colors: {
              primary: '#0EA5E9',
              secondary: '#252A38',
              accent: '#374151'
            },
            fonts: {
              primary: 'Inter',
              secondary: 'system-ui'
            },
            spacing: {
              padding: '2rem',
              gap: '1.5rem'
            }
          }
        },
        {
          name: "Theme - New",
          description: "Modern and professional invoice template",
          config: {
            colors: {
              primary: '#0EA5E9',
              secondary: '#252A38',
              accent: '#374151'
            },
            fonts: {
              primary: 'Inter',
              secondary: 'system-ui'
            },
            spacing: {
              padding: '2rem',
              gap: '1.5rem'
            }
          }
        }
      ];

      const data = JSON.stringify(exportData, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoice-templates.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: "Invoice templates have been exported successfully",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your templates",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-[#252A38] border border-gray-800 rounded-[10px] p-8">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-2">
          <Upload className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-medium text-white">Import/Export Templates</h2>
        <p className="text-gray-400 text-center max-w-lg">
          Import and export your invoice templates using JSON format. Templates include layout, styling, and configuration settings.
        </p>
        <div className="flex gap-4">
          <Button 
            onClick={handleImport}
            className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white gap-2 rounded-[10px]"
          >
            <Upload className="h-4 w-4" />
            Import Templates
          </Button>
          <Button 
            onClick={handleExport}
            className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white gap-2 rounded-[10px]"
          >
            <Download className="h-4 w-4" />
            Export Templates
          </Button>
        </div>
      </div>
    </div>
  );
};