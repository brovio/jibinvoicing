import { Input } from "@/components/ui/input";
import { Search, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeYTemplate from "@/components/themes/Theme-Y";
import { sampleInvoiceData } from "@/data/sampleInvoiceData";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const InvoiceTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const { toast } = useToast();

  const templates = [
    {
      name: "Theme Y",
      component: ThemeYTemplate,
      description: "Modern and professional invoice template"
    }
  ];

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
      // Create a deep copy of the template data without the component property
      const exportData = templates.map(template => ({
        name: template.name,
        description: template.description,
        // Include any template-specific configuration or styling here
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
      }));

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
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col gap-6">
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

        <div className="flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search templates..."
              className="pl-9 bg-[#252A38] border-gray-800 text-white placeholder:text-gray-500 rounded-[10px]"
            />
          </div>
          <div className="flex gap-4">
            <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
              <option>All Categories</option>
            </select>
            <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
              <option>All Types</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
        <div className="grid grid-cols-1 gap-6 p-6">
          {templates.map((template, index) => (
            <div key={index} className="group relative">
              <div 
                className="invoice-preview"
                onClick={() => setSelectedTemplate(index)}
              >
                <div className="invoice-container">
                  <template.component {...sampleInvoiceData} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-medium">{template.name}</h3>
                <p className="text-gray-200 text-sm">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTemplate !== null && (
        <div className="invoice-modal" onClick={() => setSelectedTemplate(null)}>
          <div className="invoice-modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-button"
              onClick={() => setSelectedTemplate(null)}
            >
              ✕
            </button>
            {templates[selectedTemplate].component({...sampleInvoiceData})}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center text-gray-400">
        <span>Showing 1 to 1 of 1 results</span>
        <div className="flex items-center gap-2">
          <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
            <option>25 entries</option>
          </select>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-[10px] bg-[#252A38] border border-gray-800">
              &lt;
            </button>
            <button className="px-3 py-1 rounded-[10px] bg-[#0EA5E9] text-white">
              1
            </button>
            <button className="px-3 py-1 rounded-[10px] bg-[#252A38] border border-gray-800">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplates;