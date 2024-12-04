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
    <div className="space-y-8">
      {entries.length === 0 ? (
        <div className="border border-dashed border-gray-600 rounded-lg p-20 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-gray-800 rounded-full">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300">Import Timesheets</h3>
            <p className="text-gray-400">Drag and drop your CSV file here, or click to browse</p>
            <TimesheetUpload onImportSuccess={handleImportSuccess} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Input
              className="flex-1 bg-[#1E2330] border-gray-700"
              placeholder="Search timesheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-[180px] bg-[#1E2330] border-gray-700">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Projects">All Projects</SelectItem>
                <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStaff} onValueChange={setSelectedStaff}>
              <SelectTrigger className="w-[180px] bg-[#1E2330] border-gray-700">
                <SelectValue placeholder="All Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Staff">All Staff</SelectItem>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TimesheetTable data={tableData} />
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Showing 1 to {Math.min(Number(entriesPerPage), tableData.length)} of {tableData.length} results
            </p>
            <div className="flex items-center gap-4">
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-[130px] bg-[#1E2330] border-gray-700">
                  <SelectValue placeholder="25 entries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 entries</SelectItem>
                  <SelectItem value="50">50 entries</SelectItem>
                  <SelectItem value="100">100 entries</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-[#1E2330] border border-gray-700 text-gray-400 hover:bg-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 rounded-lg bg-blue-500 text-white">1</button>
                <button className="p-2 rounded-lg bg-[#1E2330] border border-gray-700 text-gray-400 hover:bg-gray-700">2</button>
                <button className="p-2 rounded-lg bg-[#1E2330] border border-gray-700 text-gray-400 hover:bg-gray-700">3</button>
                <button className="p-2 rounded-lg bg-[#1E2330] border border-gray-700 text-gray-400 hover:bg-gray-700">
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