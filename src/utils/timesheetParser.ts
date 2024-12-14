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
  flag_reason?: string | null;
}

const generateTsid = (): number => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

const isValidTimeFormat = (time: string): boolean => {
  // Check if time matches HH:MM or HH:MM:SS format
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  return timeRegex.test(time);
};

const parseDuration = (duration: string): number => {
  // Parse duration in format "Xh YYm" to hours
  const match = duration.match(/(\d+)h\s*(\d+)m/);
  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    return hours + (minutes / 60);
  }
  return 0;
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

    const entry: TimesheetEntry = {
      tsid: generateTsid(),
      date: rawEntry.date || new Date().toISOString().split('T')[0],
      client: rawEntry.client?.trim() || 'Unknown Client',
      project: rawEntry.activity?.trim() || 'Unknown Project',
      task: rawEntry.notes?.trim() || 'No Description',
      hours: parseDuration(rawEntry.duration || '0h 0m'),
      staff_name: rawEntry.fullname?.trim() || null,
      time: rawEntry.time && isValidTimeFormat(rawEntry.time) ? rawEntry.time : null,
      status: rawEntry.flagged === 'true' ? 'Error' : 'Success',
      flag_reason: rawEntry.flagged === 'true' ? rawEntry.flagreason : null
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