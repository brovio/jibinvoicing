import { TimesheetTable } from "@/components/Timesheet/TimesheetTable";
import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleData = [
  {
    date: "2024-02-20",
    project: "Website Redesign",
    client: "Google",
    task: "UI Development",
    hours: 6.5,
    status: "Approved"
  },
  {
    date: "2024-02-19",
    project: "Mobile App",
    client: "Microsoft",
    task: "API Integration",
    hours: 8.0,
    status: "Pending"
  },
  {
    date: "2024-02-18",
    project: "Cloud Migration",
    client: "Apple",
    task: "Database Setup",
    hours: 7.5,
    status: "Approved"
  }
];

const Index = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col gap-6">
        <div className="bg-[#252A38] border border-gray-800 rounded-[10px] p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-2">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-white">Import Timesheets</h2>
            <p className="text-gray-400">Drag and drop your CSV file here, or click to browse</p>
            <Button className="mt-4 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white">
              Browse Files
            </Button>
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

      <TimesheetTable data={sampleData} />

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

export default Index;