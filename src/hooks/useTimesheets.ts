import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TimesheetEntry } from "@/components/Timesheets/types/timesheet";

export const useTimesheets = () => {
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

  const updateTimesheet = async (updatedTimesheet: TimesheetEntry) => {
    const { error } = await supabase
      .from('imported_timesheets')
      .update(updatedTimesheet)
      .eq('timesheet_id', updatedTimesheet.timesheet_id);

    if (error) throw error;
    await queryClient.invalidateQueries({ queryKey: ['timesheets'] });
  };

  const deleteTimesheet = async (timesheet: TimesheetEntry) => {
    const { error } = await supabase
      .from('imported_timesheets')
      .delete()
      .eq('timesheet_id', timesheet.timesheet_id);

    if (error) throw error;
    await queryClient.invalidateQueries({ queryKey: ['timesheets'] });
  };

  return {
    timesheets,
    isLoading,
    updateTimesheet,
    deleteTimesheet,
  };
};