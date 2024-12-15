import { TimesheetTable } from "@/components/Timesheets/TimesheetTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TimesheetEntry } from "@/components/Timesheets/types/timesheet";

const Timesheets = () => {
  const queryClient = useQueryClient();

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

  const handleTimesheetUpdated = async (updatedTimesheet: TimesheetEntry) => {
    const { error } = await supabase
      .from('imported_timesheets')
      .update(updatedTimesheet)
      .eq('timesheet_id', updatedTimesheet.timesheet_id);

    if (error) throw error;
    await queryClient.invalidateQueries({ queryKey: ['timesheets'] });
  };

  const handleTimesheetDeleted = async (timesheet: TimesheetEntry) => {
    const { error } = await supabase
      .from('imported_timesheets')
      .delete()
      .eq('timesheet_id', timesheet.timesheet_id);

    if (error) throw error;
    await queryClient.invalidateQueries({ queryKey: ['timesheets'] });
  };

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
        onTimesheetUpdated={handleTimesheetUpdated}
        onTimesheetDeleted={handleTimesheetDeleted}
      />
    </div>
  );
};

export default Timesheets;