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
  time?: string;
  break?: boolean;
  breakType?: string;
}

const generateTsid = (): number => {
  // Generate a random 8-digit number
  return Math.floor(10000000 + Math.random() * 90000000);
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