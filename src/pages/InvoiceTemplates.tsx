import { ImportExportSection } from "@/components/invoice-templates/ImportExportSection";
import { SearchSection } from "@/components/invoice-templates/SearchSection";
import { TemplateGrid } from "@/components/invoice-templates/TemplateGrid";

const InvoiceTemplates = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col gap-6">
        <ImportExportSection />
        <SearchSection />
      </div>

      <TemplateGrid />

      <div className="mt-4 flex justify-between items-center text-gray-400">
        <span>Showing 1 to 2 of 2 results</span>
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