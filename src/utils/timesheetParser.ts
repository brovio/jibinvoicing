import JSZip from 'jszip';

export interface TimesheetEntry {
  date: string;
  client: string;
  project: string;
  task: string;
  hours: number;
  status: string;
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
    // Split the line, handling quoted values that might contain commas
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      .map(val => val.trim().replace(/^"|"$/g, ''));
    
    const entry: Record<string, any> = {};
    let duration = 0;
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim() || '';
      
      switch(header) {
        case 'date':
          entry.date = value;
          break;
        case 'full name':
          entry.staffName = value;
          break;
        case 'entrytype':
          entry.entryType = value;
          break;
        case 'time':
          entry.time = value;
          break;
        case 'duration':
          duration = parseFloat(value) || 0;
          entry.hours = duration;
          break;
        case 'break':
          entry.break = value.toLowerCase() === 'true';
          break;
        case 'break type':
          entry.breakType = value;
          break;
        case 'activity':
          entry.project = value;
          break;
        case 'client':
          // If client is empty, use project as fallback
          if (!value && headers.includes('project')) {
            const projectIndex = headers.indexOf('project');
            entry.client = values[projectIndex]?.trim() || 'Unspecified Client';
          } else {
            entry.client = value || 'Unspecified Client';
          }
          break;
        case 'notes':
          entry.task = value || 'General Task';
          break;
      }
    });

    // Set default values for required fields if they're missing
    entry.project = entry.project || 'Unspecified Project';
    entry.client = entry.client || 'Unspecified Client';
    entry.task = entry.task || 'General Task';
    entry.hours = entry.hours || 0;
    entry.status = 'Pending';
    entry.date = entry.date || new Date().toISOString().split('T')[0];

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