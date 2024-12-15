import { TimesheetTable } from "@/components/Timesheets/TimesheetTable";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { TimesheetEntry } from "@/components/Timesheets/types/timesheet";

const fetchTimesheets = async (): Promise<TimesheetEntry[]> => {
  const { data, error } = await supabase
    .from('imported_timesheets')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

const Timesheets = () => {
  const { data: timesheets = [], isLoading, error } = useQuery({
    queryKey: ['timesheets'],
    queryFn: fetchTimesheets,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="animate-pulse bg-gray-800 h-96 rounded-[10px]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-red-900/20 text-red-400 p-4 rounded-[10px]">
          Error loading timesheets
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <TimesheetTable data={timesheets} />
    </div>
  );
};

export default Timesheets;