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

const parseCSVLine = (line: string): string[] => {
  // If the line starts with a comma, it's likely malformed
  if (line.startsWith(',')) {
    line = ' ' + line; // Add a space to ensure proper splitting
  }
  
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    
    if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
      continue;
    }
    
    current += char;
  }
  
  result.push(current.trim());
  return result;
}

export const parseTimesheetCSV = (csvContent: string): TimesheetEntry[] => {
  try {
    // Split content into lines and remove empty lines
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    // Get headers from first line and normalize them
    const headers = parseCSVLine(lines[0]).map(header => 
      header.trim().toLowerCase().replace(/['"]/g, '')
    );

    console.log('CSV Headers:', headers);

    // Process data rows (skip header row)
    return lines.slice(1).map((line, index) => {
      // Check if the line is a malformed single string containing multiple values
      if (line.includes('Desktop,Desktop') && line.startsWith(',')) {
        console.log(`Skipping malformed row ${index + 2}:`, line);
        return null;
      }

      const values = parseCSVLine(line);
      console.log(`Processing row ${index + 2}:`, values);

      const getValueOrDefault = (columnName: string): string => {
        const index = headers.indexOf(columnName);
        if (index === -1) return '-';
        const value = values[index];
        return value && value.trim() ? value.trim() : '-';
      };

      // Validate date format
      const dateValue = getValueOrDefault('date');
      const isValidDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateValue);

      const entry: TimesheetEntry = {
        date: isValidDate ? dateValue : '-',
        client: getValueOrDefault('client'),
        project: getValueOrDefault('project'),
        task: getValueOrDefault('notes') !== '-' ? getValueOrDefault('notes') : getValueOrDefault('task'),
        hours: parseFloat(getValueOrDefault('hours')) || 0,
        status: 'Pending',
        staffName: getValueOrDefault('staff name') !== '-' ? 
                  getValueOrDefault('staff name') : 
                  getValueOrDefault('staffname'),
        entryType: getValueOrDefault('entry type') !== '-' ? 
                  getValueOrDefault('entry type') : 
                  getValueOrDefault('entrytype'),
        time: getValueOrDefault('time'),
        break: getValueOrDefault('break').toLowerCase() === 'true',
        breakType: getValueOrDefault('break type') !== '-' ? 
                  getValueOrDefault('break type') : 
                  getValueOrDefault('breaktype')
      };

      return entry;
    })
    .filter(entry => entry !== null); // Remove any null entries from malformed rows

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