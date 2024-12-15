import { TimesheetTable } from "@/components/Timesheets/TimesheetTable";
import { useTimesheets } from "@/hooks/useTimesheets";

const Timesheets = () => {
  const { timesheets, isLoading, updateTimesheet, deleteTimesheet } = useTimesheets();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="animate-pulse bg-gray-700 h-96 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <TimesheetTable 
        data={timesheets} 
        onTimesheetUpdated={updateTimesheet}
        onTimesheetDeleted={deleteTimesheet}
      />
    </div>
  );
};

export default Timesheets;