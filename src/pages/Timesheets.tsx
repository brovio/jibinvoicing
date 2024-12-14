import { TimesheetTable } from "@/components/Timesheet/TimesheetTable";
import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportButton } from "@/components/ExportButton";
import { useRef, useState, useEffect } from "react";
import { processTimesheetZip, TimesheetEntry } from "@/utils/timesheetParser";
import { showImportSuccessToast, showImportErrorToast } from "@/utils/toastUtils";
import { supabase } from "@/integrations/supabase/client";

const Timesheets = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [timesheetData, setTimesheetData] = useState<TimesheetEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const { data, error } = await supabase
        .from('brovio-timesheets')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setTimesheetData(data || []);
    } catch (error) {
      console.error('Error fetching timesheets:', error);
      showImportErrorToast('Failed to load timesheets');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/zip') {
      showImportErrorToast('Please upload a ZIP file');
      return;
    }

    try {
      const entries = await processTimesheetZip(file);
      
      // Insert entries into Supabase
      const { data, error } = await supabase
        .from('brovio-timesheets')
        .insert(entries)
        .select();

      if (error) throw error;

      await fetchTimesheets(); // Refresh the table
      showImportSuccessToast(entries.length);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error importing timesheets:', error);
      showImportErrorToast();
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col gap-6">
        <div className="bg-[#252A38] border border-gray-800 rounded-[10px] p-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-2">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-medium text-white">Import/Export Timesheets</h2>
            <p className="text-gray-400 text-center max-w-lg">
              Import your timesheets using CSV or ZIP format. Required columns: Date, Project, Client, Task, and Hours.
            </p>
            <div className="flex gap-4">
              <input
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white gap-2 rounded-[10px]"
              >
                <Upload className="h-4 w-4" />
                Import Timesheets (ZIP)
              </Button>
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
        <span>Showing 1 to {Math.min(10, timesheetData.length)} of {timesheetData.length} results</span>
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

export default Timesheets;