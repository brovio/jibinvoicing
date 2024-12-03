import { FileUpload } from "@/components/FileUpload";
import { TimesheetTable } from "@/components/Timesheet/TimesheetTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Sample data - this would normally come from the ZIP file
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
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search timesheets..."
            className="pl-8"
          />
        </div>
        <FileUpload />
      </div>
      <div className="bg-background rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-6">Timesheets</h1>
        <TimesheetTable data={sampleData} />
      </div>
    </div>
  );
};

export default Index;