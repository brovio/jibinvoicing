import JSZip from 'jszip';

export interface TimesheetEntry {
  tsid?: number;
  date: string;
  project: string;
  client: string;
  task: string;
  hours: number;
  status?: string;
  staffName?: string;
  entryType?: string;
  time?: string | null;
  break?: boolean;
  breakType?: string;
}

const generateTsid = (): number => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

const isValidTimeFormat = (time: string): boolean => {
  // Check if the time string matches HH:MM or HH:MM:SS format
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  return timeRegex.test(time);
};

export const parseTimesheetCSV = (csvContent: string): TimesheetEntry[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const entry: Record<string, any> = {
      tsid: generateTsid()
    };
    
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
        case 'staff name':
          entry.staffName = value;
          break;
        case 'entrytype':
          entry.entryType = value;
          break;
        case 'time':
          // Only set time if it's in a valid format, otherwise set to null
          entry.time = value && isValidTimeFormat(value) ? value : null;
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
    
    const csvFile = Object.values(zipContent.files).find(file => 
      file.name.toLowerCase().endsWith('.csv')
    );

    if (!csvFile) {
      throw new Error('No CSV file found in the ZIP archive');
    }

    const csvContent = await csvFile.async('string');
    console.log('CSV Content:', csvContent);
    
    return parseTimesheetCSV(csvContent);
  } catch (error) {
    console.error('Error processing ZIP file:', error);
    throw new Error('Invalid timesheet format');
  }
};