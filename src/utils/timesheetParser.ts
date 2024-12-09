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
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  // Create a map of column indices for faster lookup
  const columnMap = headers.reduce((acc: Record<string, number>, header, index) => {
    acc[header.toLowerCase()] = index;
    return acc;
  }, {});

  console.log('CSV Headers:', headers);
  console.log('Column Map:', columnMap);

  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      // Split the line, handling quoted values that might contain commas
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(val => val.trim().replace(/^"|"$/g, ''));

      console.log('Processing line values:', values);

      // Helper function to get value by column name
      const getValue = (columnName: string): string => {
        const index = columnMap[columnName.toLowerCase()];
        return index !== undefined ? values[index]?.trim() || '' : '';
      };

      // Parse date from the Date column
      const rawDate = getValue('date');
      console.log('Raw date value:', rawDate);
      let formattedDate = '';
      try {
        const date = new Date(rawDate);
        formattedDate = date.toISOString().split('T')[0];
      } catch (error) {
        console.error('Error parsing date:', error);
        formattedDate = new Date().toISOString().split('T')[0];
      }

      // Get client (with Project fallback)
      let client = getValue('client');
      if (!client) {
        client = getValue('project') || 'Unspecified Client';
      }

      // Get project from Activity
      const project = getValue('activity') || 'Unspecified Project';

      // Get task from Notes
      const task = getValue('notes') || 'General Task';

      // Parse duration/hours
      const duration = getValue('duration');
      const hours = parseFloat(duration) || 0;

      // Additional fields for modal
      const staffName = getValue('full name');
      const entryType = getValue('entrytype');
      const time = getValue('time');
      const breakValue = getValue('break').toLowerCase() === 'true';
      const breakType = getValue('break type');

      console.log('Parsed entry:', {
        date: formattedDate,
        client,
        project,
        task,
        hours,
        staffName,
        entryType,
        time,
        break: breakValue,
        breakType
      });

      return {
        date: formattedDate,
        client,
        project,
        task,
        hours,
        status: 'Pending',
        staffName,
        entryType,
        time,
        break: breakValue,
        breakType
      };
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