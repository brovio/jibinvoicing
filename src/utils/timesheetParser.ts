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
  // Handle lines that are already split (appear as arrays)
  if (Array.isArray(line)) {
    return line.map(item => item?.toString().trim() || '');
  }

  // If the line is a single string containing multiple values separated by commas
  if (typeof line === 'string' && line.includes(',Desktop,Desktop,')) {
    // Split the string by commas and extract the date value
    const parts = line.split(',');
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].includes('/')) {
        // Found a date-like string, reconstruct the line with this as the date
        return [`${parts[i]}`, ...Array(20).fill('')];
      }
    }
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

const isValidDate = (dateStr: string): boolean => {
  if (!dateStr) return false;
  
  // Extract date part if it includes time
  if (dateStr.includes(' ')) {
    dateStr = dateStr.split(' ')[0];
  }
  
  // Check if it matches MM/DD/YYYY format
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!dateRegex.test(dateStr)) return false;

  // Parse the date and verify it's valid
  const [month, day, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getMonth() === month - 1 && date.getDate() === day && date.getFullYear() === year;
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
      const values = parseCSVLine(line);
      console.log(`Processing row ${index + 1}:`, values);

      const getValueOrDefault = (columnName: string): string => {
        const index = headers.indexOf(columnName);
        if (index === -1) return '-';
        const value = values[index];
        return value && value.trim() ? value.trim() : '-';
      };

      // Get the date value and validate it
      let dateValue = getValueOrDefault('date');
      if (!isValidDate(dateValue)) {
        // Try to find a valid date in any column
        for (const value of values) {
          if (isValidDate(value)) {
            dateValue = value.split(' ')[0]; // Take only the date part if there's a time
            break;
          }
        }
      }

      // If still no valid date found, mark as invalid
      if (!isValidDate(dateValue)) {
        dateValue = 'Invalid Date';
      }

      const entry: TimesheetEntry = {
        date: dateValue,
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