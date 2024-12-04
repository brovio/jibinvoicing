import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeYTemplate from "@/components/themes/Theme-Y";
import PeekoTemplate from "@/components/themes/Theme-peeko";
import { sampleInvoiceData } from "@/data/sampleInvoiceData";

const InvoiceTemplates = () => {
  const templates = [
    {
      name: "Theme Y",
      component: ThemeYTemplate,
      description: "Modern and professional invoice template"
    },
    {
      name: "Peeko",
      component: PeekoTemplate,
      description: "Clean and minimal invoice design"
    },
    {
      name: "Classic",
      component: ThemeYTemplate,
      description: "Traditional business invoice layout"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Import and Search Section */}
      <div className="mb-6 flex flex-col gap-6">
        <div className="bg-[#252A38] border border-gray-800 rounded-[10px] p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-2">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-white">Import Templates</h2>
            <p className="text-gray-400">Drag and drop your template files here, or click to browse</p>
            <Button className="mt-4 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white">
              Browse Files
            </Button>
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
        <div className="grid grid-cols-3 gap-6 p-6">
          {templates.map((template, index) => (
            <div key={index} className="group relative">
              <div className="aspect-[8.5/11] bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="absolute inset-0 m-[2%]">
                  <div className="transform scale-[0.235] origin-top-left absolute top-0 left-0 w-[425%] h-[425%]">
                    <template.component {...sampleInvoiceData} />
                  </div>
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

      {/* Pagination Section */}
      <div className="mt-4 flex justify-between items-center text-gray-400">
        <span>Showing 1 to 3 of 3 results</span>
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
