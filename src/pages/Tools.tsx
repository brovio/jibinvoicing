import React from 'react';
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Tools = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-2">Tools</h1>
        <p className="text-gray-400">Access helpful tools and utilities</p>
      </div>
      
      <Accordion type="single" collapsible defaultValue="timesheet-parser">
        <AccordionItem value="timesheet-parser" className="dashboard-card border-none">
          <AccordionTrigger className="text-xl font-medium text-white hover:no-underline flex items-center gap-2">
            <ChevronDown className="h-5 w-5 text-[#0EA5E9] shrink-0" />
            Timesheet Parser
          </AccordionTrigger>
          <AccordionContent className="h-[70%]">
            <div className="w-full aspect-[16/9] overflow-hidden rounded-[10px] bg-[#3f475e]">
              <iframe
                src="https://j-parser.lovable.app/"
                className="w-full h-full border border-dashboard-border rounded-[10px]"
                title="Timesheet Parser Tool"
                style={{ 
                  minHeight: '600px',
                  backgroundColor: '#3f475e',
                  color: '#FFFFFF'
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Tools;