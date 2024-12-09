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
  
  const columnMap = headers.reduce((acc: Record<string, number>, header, index) => {
    acc[header.toLowerCase()] = index;
    return acc;
  }, {});

  console.log('CSV Headers:', headers);
  console.log('Column Map:', columnMap);

  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(val => val.trim().replace(/^"|"$/g, ''));

      console.log('Processing line values:', values);

      const getValue = (columnName: string): string => {
        const index = columnMap[columnName.toLowerCase()];
        return index !== undefined ? values[index]?.trim() || '' : '';
      };

      // Parse date
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

      // Get client with proper fallback logic
      let client = getValue('client');
      if (!client || client === '') {
        client = getValue('project');
      }
      // If both client and project are empty, leave it as an empty string
      if (!client) {
        client = '';
      }

      // Get project name
      const project = getValue('project') || '';

      // Get task description
      const task = getValue('task description') || getValue('notes') || 'General Task';

      // Parse duration (format: "Xh Ym")
      const durationStr = getValue('duration');
      let hours = 0;
      if (durationStr) {
        const hoursMatch = durationStr.match(/(\d+)h/);
        const minutesMatch = durationStr.match(/(\d+)m/);
        
        const hoursValue = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutesValue = minutesMatch ? parseInt(minutesMatch[1]) : 0;
        
        hours = hoursValue + (minutesValue / 60);
      }

      // Additional fields
      const staffName = getValue('full name');
      const entryType = getValue('entry type');
      const time = getValue('time');
      const breakValue = getValue('break')?.toLowerCase() === 'true';
      const breakType = getValue('break type');

      const entry = {
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

      console.log('Parsed entry:', entry);
      return entry;
    });
};

export const processTimesheetZip = async (zipFile: File): Promise<TimesheetEntry[]> => {
  try {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipFile);
    
    const csvFiles = Object.values(zipContent.files).filter(file => 
      file.name.toLowerCase().endsWith('.csv')
    );

    if (csvFiles.length === 0) {
      throw new Error('No CSV files found in the ZIP archive');
    }

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