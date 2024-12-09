import JSZip from 'jszip';

export interface TimesheetEntry {
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

export const parseTimesheetCSV = (csvContent: string): TimesheetEntry[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const entry: Record<string, any> = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      switch(header) {
        case 'date':
          entry.date = value;
          break;
        case 'project':
          entry.project = value;
          break;
        case 'client':
          entry.client = value;
          break;
        case 'task':
        case 'notes':
          entry.task = value;
          break;
        case 'hours':
        case 'duration':
          entry.hours = parseFloat(value) || 0;
          break;
        case 'status':
          entry.status = value || 'Pending';
          break;
        case 'staff name':
        case 'full name':
          entry.staffName = value;
          break;
      }
    });

    // Set default values for required fields if they're missing
    entry.project = entry.project || 'Unspecified Project';
    entry.client = entry.client || 'Unspecified Client';
    entry.task = entry.task || 'General Task';
    entry.hours = entry.hours || 0;
    entry.status = entry.status || 'Pending';

    return entry as TimesheetEntry;
  });
};

export const processTimesheetZip = async (zipFile: File): Promise<TimesheetEntry[]> => {
  try {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipFile);
    
    // Find all CSV files in the ZIP
    const csvFiles = Object.values(zipContent.files).filter(file => 
      file.name.toLowerCase().endsWith('.csv')
    );

    if (csvFiles.length === 0) {
      throw new Error('No CSV files found in the ZIP archive');
    }

    // Process all CSV files and combine their entries
    const allEntries: TimesheetEntry[] = [];
    
    for (const csvFile of csvFiles) {
      const csvContent = await csvFile.async('string');
      const entries = parseTimesheetCSV(csvContent);
      allEntries.push(...entries);
    }

    return allEntries;
  } catch (error) {
    console.error('Error processing ZIP file:', error);
    throw new Error('Invalid timesheet format');
  }
};