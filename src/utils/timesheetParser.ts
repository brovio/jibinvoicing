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
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  // Handle case where the entire line is a single string with commas
  if (line.startsWith('"') && line.endsWith('"')) {
    const parts = line.slice(1, -1).split(',');
    return parts.map(part => part.trim());
  }
  
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

const isEmptyRow = (values: string[]): boolean => {
  // Check if all values in the row are empty or just whitespace
  return !values.some(value => value && value.trim() !== '');
}

export const parseTimesheetCSV = (csvContent: string): TimesheetEntry[] => {
  try {
    // Split content into lines and remove empty lines
    const lines = csvContent.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    if (lines.length === 0) return [];

    // Get headers from first line and normalize them
    const headers = parseCSVLine(lines[0]).map(header => 
      header.toLowerCase().replace(/['"]/g, '').trim()
    );

    // Process data rows (skip header row)
    return lines.slice(1)
      .map(line => {
        const values = parseCSVLine(line);
        if (isEmptyRow(values)) return null;

        const getValue = (headerName: string): string => {
          const index = headers.findIndex(h => h === headerName.toLowerCase());
          return index !== -1 && values[index] ? values[index].trim() : '';
        };

        // Find the date value
        let dateValue = getValue('date');
        if (!isValidDate(dateValue)) {
          // Try the first column as a fallback
          dateValue = values[0] && isValidDate(values[0]) ? values[0] : '';
        }

        if (!dateValue) return null;

        const entry: TimesheetEntry = {
          date: dateValue,
          staffName: getValue('staff name'),
          client: getValue('client'),
          project: getValue('project'),
          task: getValue('task description') || getValue('task'),
          hours: parseFloat(getValue('duration') || getValue('hours')) || 0,
          status: 'Pending',
          time: getValue('time'),
          entryType: getValue('entry type'),
          break: getValue('break')?.toLowerCase() === 'true',
          breakType: getValue('break type')
        };

        // Validate that we have at least the required fields
        if (!entry.date || !entry.client || !entry.project) return null;

        return entry;
      })
      .filter((entry): entry is TimesheetEntry => entry !== null);

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