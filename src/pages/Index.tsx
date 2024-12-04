import { useState } from "react";
import { TimesheetTable } from "@/components/Timesheet/TimesheetTable";
import { TimesheetUpload } from "@/components/Timesheet/TimesheetUpload";
import type { TimesheetEntry } from "@/utils/timesheetUtils";

const Index = () => {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);

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
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-200">Timesheets</h1>
        <TimesheetUpload onImportSuccess={handleImportSuccess} />
      </div>
      <TimesheetTable data={tableData} />
    </div>
  );
};

export default Index;