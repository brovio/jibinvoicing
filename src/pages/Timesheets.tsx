import { TimesheetTable } from "@/components/Timesheet/TimesheetTable";
import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportButton } from "@/components/ExportButton";
import { useRef, useState } from "react";
import { processTimesheetZip, TimesheetEntry, parseTimesheetCSV } from "@/utils/timesheetParser";
import { showImportSuccessToast, showImportErrorToast } from "@/utils/toastUtils";

const sampleData: TimesheetEntry[] = [
  {
    date: "2024-02-20",
    project: "Website Redesign",
    client: "Google",
    task: "UI Development",
    hours: 6.5,
    status: "Approved",
    rowNumber: 1,
    rawColumns: ["2024-02-20", "", "", "Google", "Website Redesign", "UI Development", "6.5", "Approved", "", "", "", "", "", "", "", "", "", "", ""]
  },
  {
    date: "2024-02-19",
    project: "Mobile App",
    client: "Microsoft",
    task: "API Integration",
    hours: 8.0,
    status: "Pending",
    rowNumber: 2,
    rawColumns: ["2024-02-19", "", "", "Microsoft", "Mobile App", "API Integration", "8.0", "Pending", "", "", "", "", "", "", "", "", "", "", ""]
  },
  {
    date: "2024-02-18",
    project: "Cloud Migration",
    client: "Apple",
    task: "Database Setup",
    hours: 7.5,
    status: "Approved",
    rowNumber: 3,
    rawColumns: ["2024-02-18", "", "", "Apple", "Cloud Migration", "Database Setup", "7.5", "Approved", "", "", "", "", "", "", "", "", "", "", ""]
  }
];

const Timesheets = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [timesheetData, setTimesheetData] = useState<TimesheetEntry[]>(sampleData);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    try {
      let entries: TimesheetEntry[] = [];

      if (fileExtension === 'zip') {
        entries = await processTimesheetZip(file);
      } else if (fileExtension === 'csv') {
        const text = await file.text();
        entries = parseTimesheetCSV(text);
      } else {
        showImportErrorToast('Please upload a ZIP or CSV file');
        return;
      }

      setTimesheetData(entries);
      showImportSuccessToast(entries.length);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error importing timesheets:', error);
      showImportErrorToast();
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
            <h2 className="text-xl font-medium text-white">Import/Export Timesheets</h2>
            <p className="text-gray-400 text-center max-w-lg">
              Import your timesheets using CSV or ZIP format. Required columns: Date, Project, Client, Task, and Hours.
            </p>
            <div className="flex gap-4">
              <input
                type="file"
                accept=".zip,.csv"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white gap-2 rounded-[10px]"
              >
                <Upload className="h-4 w-4" />
                Import Timesheets (ZIP/CSV)
              </Button>
              <ExportButton format="csv" clients={[]} />
              <ExportButton format="json" clients={[]} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search timesheets..."
              className="pl-9 bg-[#252A38] border-gray-800 text-white placeholder:text-gray-500 rounded-[10px]"
            />
          </div>
          <div className="flex gap-4">
            <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
              <option>All Projects</option>
            </select>
            <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
              <option>All Staff</option>
            </select>
          </div>
        </div>
      </div>

      <TimesheetTable data={timesheetData} />

      <div className="mt-4 flex justify-between items-center text-gray-400">
        <span>Showing 1 to 10 of 20 results</span>
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
              2
            </button>
            <button className="px-3 py-1 rounded-[10px] bg-[#252A38] border border-gray-800">
              3
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

export default Timesheets;