import { FileUpload } from "@/components/FileUpload";
import { TimesheetTable } from "@/components/Timesheet/TimesheetTable";
import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";

const sampleData = [
  {
    date: "2024-02-01",
    project: "Project A",
    task: "Development",
    hours: 8,
    status: "Approved"
  },
  {
    date: "2024-02-02",
    project: "Project B",
    task: "Design",
    hours: 6,
    status: "Pending"
  },
  {
    date: "2024-02-03",
    project: "Project A",
    task: "Testing",
    hours: 4,
    status: "Rejected"
  }
];

const Index = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search timesheets..."
            className="pl-9 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg"
          />
        </div>
        <button className="bg-[#4895EF] text-white px-4 py-2 rounded-lg hover:bg-[#3d7fd3] transition-colors flex items-center gap-2 shadow-sm">
          <Upload className="h-4 w-4" />
          Upload Timesheet
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900">Timesheets</h1>
        <TimesheetTable data={sampleData} />
      </div>
    </div>
  );
};

export default Index;