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
  rowNumber: number;
}

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Handle escaped quotes
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
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
  return values.every(value => !value || value.trim() === '');
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

    console.log('Headers found:', headers);

    // Process data rows (skip header row)
    const entries = lines.slice(1)
      .map((line, index) => {
        const values = parseCSVLine(line);
        if (isEmptyRow(values)) return null;

        const getValue = (headerName: string): string => {
          const index = headers.indexOf(headerName);
          return index !== -1 && values[index] ? values[index].trim() : '';
        };

        // Get date from the first column
        const dateValue = values[0];
        if (!dateValue || !isValidDate(dateValue)) {
          console.log('Invalid date found:', line);
          return null;
        }

        const entry: TimesheetEntry = {
          date: dateValue,
          staffName: getValue('full name'),
          client: getValue('client') || 'Unspecified',
          project: getValue('project') || 'Unspecified',
          task: getValue('notes'),
          hours: parseFloat(getValue('duration')) || 0,
          status: 'Pending',
          time: getValue('time'),
          entryType: getValue('entry type'),
          break: getValue('break')?.toLowerCase() === 'true',
          breakType: getValue('break type'),
          rowNumber: index + 2 // Adding 2 to account for 0-based index and header row
        };

        // Log entry for debugging
        console.log(`Processing row ${entry.rowNumber}:`, entry);

        // Only validate date field
        if (!entry.date) {
          console.log('Missing date in row:', entry.rowNumber);
          return null;
        }

        return entry;
      })
      .filter((entry): entry is TimesheetEntry => entry !== null);

    console.log('Total valid entries processed:', entries.length);
    return entries;

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