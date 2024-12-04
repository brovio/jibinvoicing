import React, { useState } from "react";
import { TimesheetTable } from "@/components/Timesheet/TimesheetTable";
import { TimesheetUpload } from "@/components/Timesheet/TimesheetUpload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TimesheetEntry } from "@/utils/timesheetUtils";
import { Upload } from "lucide-react";

const Index = () => {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [selectedStaff, setSelectedStaff] = useState("All Staff");
  const [entriesPerPage, setEntriesPerPage] = useState("25");

  const handleImportSuccess = (newEntries: TimesheetEntry[]) => {
    setEntries(prev => [...prev, ...newEntries]);
  };

  const tableData = entries.map(entry => ({
    date: entry.date,
    client: entry.client,
    project: entry.project,
    task: entry.tasks,
    hours: entry.duration,
  }));

  return (
    <div className="space-y-6">
      {entries.length === 0 ? (
        <div className="border border-dashed border-[#30363D] rounded-lg p-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-[#21262D] rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-[#8B949E]" />
            </div>
            <h3 className="text-xl font-medium text-white">Import Timesheets</h3>
            <p className="text-[#8B949E]">Drag and drop your CSV file here, or click to browse</p>
            <TimesheetUpload onImportSuccess={handleImportSuccess} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Input
              className="flex-1 bg-[#161B22] border-[#30363D] text-white placeholder:text-[#8B949E] h-10 rounded-lg"
              placeholder="Search timesheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[180px] bg-[#161B22] border-[#30363D] text-white rounded-lg">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent className="bg-[#161B22] border-[#30363D]">
                <SelectItem value="All Projects">All Projects</SelectItem>
                <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStaff} onValueChange={setSelectedStaff}>
              <SelectTrigger className="w-[180px] bg-[#161B22] border-[#30363D] text-white rounded-lg">
                <SelectValue placeholder="All Staff" />
              </SelectTrigger>
              <SelectContent className="bg-[#161B22] border-[#30363D]">
                <SelectItem value="All Staff">All Staff</SelectItem>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TimesheetTable data={tableData} />
          <div className="flex items-center justify-between text-[#8B949E]">
            <p className="text-sm">
              Showing 1 to {Math.min(Number(entriesPerPage), tableData.length)} of {tableData.length} results
            </p>
            <div className="flex items-center gap-4">
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-[130px] bg-[#161B22] border-[#30363D] text-white rounded-lg">
                  <SelectValue placeholder="25 entries" />
                </SelectTrigger>
                <SelectContent className="bg-[#161B22] border-[#30363D]">
                  <SelectItem value="25">25 entries</SelectItem>
                  <SelectItem value="50">50 entries</SelectItem>
                  <SelectItem value="100">100 entries</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-[#8B949E] hover:bg-[#21262D]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 rounded-lg bg-[#0EA5E9] text-white">1</button>
                <button className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-[#8B949E] hover:bg-[#21262D]">2</button>
                <button className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-[#8B949E] hover:bg-[#21262D]">3</button>
                <button className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-[#8B949E] hover:bg-[#21262D]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;