import JSZip from 'jszip';

export interface TimesheetEntry {
  tsid?: number;
  date: string;
  client: string;
  project: string;
  task: string;
  hours: number;
  status?: string;
  staff_name?: string;
  entry_type?: string;
  time?: string | null;
  break?: boolean;
  break_type?: string;
}

const generateTsid = (): number => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

export const parseTimesheetCSV = (csvContent: string): TimesheetEntry[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].toLowerCase().split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const rawEntry: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      rawEntry[header.trim()] = values[index]?.trim() || '';
    });

    // Map CSV fields to database columns
    const entry: TimesheetEntry = {
      tsid: generateTsid(),
      date: rawEntry.date || new Date().toISOString().split('T')[0],
      client: rawEntry.client || 'Unknown Client',
      project: rawEntry.activity || 'Unknown Project', // Map 'activity' to project
      task: rawEntry.notes || 'No Description', // Map 'notes' to task
      hours: parseFloat(rawEntry.duration) || 0, // Map 'duration' to hours
      staff_name: rawEntry.fullname || null,
      time: rawEntry.time || null,
      status: rawEntry.flagged === 'true' ? 'Flagged' : 'Pending',
      entry_type: rawEntry.flagreason || null
    };

    return entry;
  });
};

export const processTimesheetZip = async (zipFile: File): Promise<TimesheetEntry[]> => {
  try {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipFile);
    
    const csvFile = Object.values(zipContent.files).find(file => 
      file.name.toLowerCase().endsWith('.csv')
    );

    if (!csvFile) {
      throw new Error('No CSV file found in the ZIP archive');
    }

    const csvContent = await csvFile.async('string');
    return parseTimesheetCSV(csvContent);
  } catch (error) {
    console.error('Error processing ZIP file:', error);
    throw new Error('Invalid timesheet format');
  }
};