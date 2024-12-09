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
  try {
    // Split content into lines and remove empty lines
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    // Get headers from first line and normalize them
    const headers = lines[0].split(',').map(header => 
      header.trim().toLowerCase().replace(/['"]/g, '')
    );

    console.log('CSV Headers:', headers);

    // Process data rows (skip header row)
    return lines.slice(1).map((line, index) => {
      // Split the line by comma, but preserve commas within quotes
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(val => val.trim().replace(/^"|"$/g, ''));

      console.log(`Processing row ${index + 2}:`, values);

      const entry: TimesheetEntry = {
        date: values[headers.indexOf('date')] || new Date().toISOString().split('T')[0],
        client: values[headers.indexOf('client')] || '-',
        project: values[headers.indexOf('project')] || '-',
        task: values[headers.indexOf('task')] || values[headers.indexOf('notes')] || 'General Task',
        hours: parseFloat(values[headers.indexOf('hours')]) || 0,
        status: 'Pending',
        staffName: values[headers.indexOf('staff name')] || values[headers.indexOf('staffname')] || '-',
        entryType: values[headers.indexOf('entry type')] || values[headers.indexOf('entrytype')] || '',
        time: values[headers.indexOf('time')] || '',
        break: values[headers.indexOf('break')]?.toLowerCase() === 'true',
        breakType: values[headers.indexOf('break type')] || values[headers.indexOf('breaktype')] || ''
      };

      return entry;
    });
  } catch (error) {
    console.error('Error parsing CSV:', error);
    throw new Error('Failed to parse CSV file');
  }
};

export const processTimesheetZip = async (file: File): Promise<TimesheetEntry[]> => {
  try {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);
    
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