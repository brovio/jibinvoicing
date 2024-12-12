import { useState } from "react";
import ThemeYTemplate from "@/components/themes/Theme-Y";
import ThemeNewTemplate from "@/components/themes/Theme-New";
import { sampleInvoiceData } from "@/data/sampleInvoiceData";

export const TemplateGrid = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const templates = [
    {
      name: "Theme Y",
      component: ThemeYTemplate,
      description: "Modern and professional invoice template"
    },
    {
      name: "Theme - New",
      component: ThemeNewTemplate,
      description: "Modern and professional invoice template"
    }
  ];

  return (
    <>
      <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
        <div className="grid grid-cols-2 gap-6 p-6">
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
    </>
  );
};