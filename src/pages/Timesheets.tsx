import { TimesheetTable } from "@/components/Timesheets/TimesheetTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TimesheetEntry } from "@/components/Timesheets/types/timesheet";

const Timesheets = () => {
  const { data: timesheets = [], isLoading } = useQuery({
    queryKey: ['timesheets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('imported_timesheets')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data as TimesheetEntry[];
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="animate-pulse bg-gray-700 h-96 rounded-lg" />
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