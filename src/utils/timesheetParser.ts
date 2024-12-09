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
  const headers = lines[0].split(',').map(h => h.trim());
  
  // Create a map of column indices for faster lookup
  const columnMap = headers.reduce((acc: Record<string, number>, header, index) => {
    acc[header.toLowerCase()] = index;
    return acc;
  }, {});

  return lines.slice(1).map(line => {
    // Split the line, handling quoted values that might contain commas
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      .map(val => val.trim().replace(/^"|"$/g, ''));
    
    const entry: Record<string, any> = {
      status: 'Pending' // Default status
    };

    // Helper function to get value by column name
    const getValue = (columnName: string): string => {
      const index = columnMap[columnName.toLowerCase()];
      return index !== undefined ? values[index]?.trim() || '' : '';
    };

    // Date
    entry.date = getValue('Date');
    if (!entry.date || entry.date === '') {
      entry.date = new Date().toISOString().split('T')[0];
    }

    // Client (with Project fallback)
    entry.client = getValue('Client');
    if (!entry.client || entry.client === '') {
      entry.client = getValue('Project') || 'Unspecified Client';
    }

    // Project (from Activity)
    entry.project = getValue('Activity') || 'Unspecified Project';

    // Task (from Notes)
    entry.task = getValue('Notes') || 'General Task';

    // Hours (from Duration)
    const duration = getValue('Duration');
    entry.hours = parseFloat(duration) || 0;

    // Additional fields for modal
    entry.staffName = getValue('Full Name');
    entry.entryType = getValue('EntryType');
    entry.time = getValue('Time');
    entry.break = getValue('Break').toLowerCase() === 'true';
    entry.breakType = getValue('Break Type');

    // Validate and ensure required fields have values
    return {
      date: entry.date,
      client: entry.client,
      project: entry.project,
      task: entry.task,
      hours: entry.hours,
      status: entry.status,
      staffName: entry.staffName,
      entryType: entry.entryType,
      time: entry.time,
      break: entry.break,
      breakType: entry.breakType
    } as TimesheetEntry;
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