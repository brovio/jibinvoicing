import JSZip from 'jszip';
import { supabase } from "@/integrations/supabase/client";

export interface TimesheetEntry {
  tsid: number;
  date: string;
  client: string;
  project: string;
  task: string;
  hours: number;
  time?: string;
  staff_name?: string;
  status: string;
  flag_reason?: string;
}

export const parseTimesheetCSV = (csvContent: string): TimesheetEntry[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const entry: Record<string, any> = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      switch(header.trim().toLowerCase()) {
        case 'date':
          entry.date = value;
          break;
        case 'activity':
        case 'project':
          entry.project = value;
          break;
        case 'client':
          entry.client = value;
          break;
        case 'notes':
        case 'task':
          entry.task = value;
          break;
        case 'duration':
        case 'hours':
          entry.hours = parseFloat(value) || 0;
          break;
        case 'full name':
        case 'staff name':
          entry.staffName = value;
          break;
        case 'entrytype':
          entry.entryType = value;
          break;
        case 'time':
          entry.time = value;
          break;
        case 'break':
          entry.break = value?.toLowerCase() === 'yes';
          break;
        case 'break type':
          entry.breakType = value;
          break;
      }
    });

    // Set default values for required fields if they're missing
    entry.project = entry.project || 'Unspecified Project';
    entry.client = entry.client || 'Unspecified Client';
    entry.task = entry.task || 'General Task';
    entry.hours = entry.hours || 0;
    entry.status = 'Pending';

    return entry as TimesheetEntry;
  });
};

export const processTimesheetZip = async (zipFile: File): Promise<TimesheetEntry[]> => {
  try {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipFile);
    
    // Find the first CSV file in the ZIP
    const csvFile = Object.values(zipContent.files).find(file => 
      file.name.toLowerCase().endsWith('.csv')
    );

    if (!csvFile) {
      throw new Error('No CSV file found in the ZIP archive');
    }

    // Read the CSV content
    const csvContent = await csvFile.async('string');
    console.log('CSV Content:', csvContent); // Debug log
    
    return parseTimesheetCSV(csvContent);
  } catch (error) {
    console.error('Error processing ZIP file:', error);
    throw new Error('Invalid timesheet format');
  }
};

export const fetchTimesheets = async (): Promise<TimesheetEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('imported_timesheets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching timesheets:', error);
      throw error;
    }

    return data.map(entry => ({
      tsid: entry.timesheet_id,
      date: entry.date,
      client: entry.client,
      project: entry.activity || 'Unspecified Project',
      task: entry.notes || 'General Task',
      hours: parseFloat(entry.duration) || 0,
      time: entry.time,
      staff_name: entry.full_name,
      status: entry.flagged ? `Error: ${entry.flag_reason}` : 'Success',
      flag_reason: entry.flagged ? entry.flag_reason : undefined
    }));
  } catch (error) {
    console.error('Error in fetchTimesheets:', error);
    throw error;
  }
};
