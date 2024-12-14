import { TimesheetTable } from "@/components/Timesheet/TimesheetTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportButton } from "@/components/ExportButton";
import { useState, useEffect } from "react";
import { TimesheetEntry, fetchTimesheets } from "@/utils/timesheetParser";
import { showErrorToast } from "@/utils/toastUtils";

const Timesheets = () => {
  const [timesheetData, setTimesheetData] = useState<TimesheetEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTimesheets();
  }, []);

  const loadTimesheets = async () => {
    try {
      const entries = await fetchTimesheets();
      setTimesheetData(entries);
    } catch (error) {
      console.error('Error loading timesheets:', error);
      showErrorToast('Failed to load timesheets', 'Please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-gray-400">Loading timesheets...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col gap-6">
        <div className="bg-[#252A38] border border-gray-800 rounded-[10px] p-8">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-medium text-white">Timesheet Management</h2>
            <p className="text-gray-400 text-center max-w-lg">
              View and manage imported timesheet entries. Entries with errors are highlighted and can be edited.
            </p>
            <div className="flex gap-4">
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
        <span>Showing {timesheetData.length} entries</span>
        <div className="flex items-center gap-2">
          <select className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2">
            <option>25 entries</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Timesheets;