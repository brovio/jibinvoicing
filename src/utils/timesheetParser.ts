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

const findHeaderIndex = (headers: string[], possibleNames: string[]): number => {
  for (const name of possibleNames) {
    const index = headers.findIndex(h => h.toLowerCase().includes(name.toLowerCase()));
    if (index !== -1) return index;
  }
  return -1;
}

export const parseTimesheetCSV = (csvContent: string): TimesheetEntry[] => {
  try {
    // Split content into lines and remove empty lines
    const lines = csvContent.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    if (lines.length === 0) return [];

    // Get headers and normalize them
    const headers = parseCSVLine(lines[0]).map(header => 
      header.toLowerCase().replace(/['"]/g, '').trim()
    );

    console.log('Headers found:', headers);

    // Find critical column indices
    const dateIndex = findHeaderIndex(headers, ['date']);
    const nameIndex = findHeaderIndex(headers, ['name', 'full name', 'staff name']);
    const clientIndex = findHeaderIndex(headers, ['client']);
    const projectIndex = findHeaderIndex(headers, ['project']);
    const taskIndex = findHeaderIndex(headers, ['task', 'notes']);
    const hoursIndex = findHeaderIndex(headers, ['hours', 'duration']);
    const timeIndex = findHeaderIndex(headers, ['time']);
    const breakIndex = findHeaderIndex(headers, ['break']);
    const breakTypeIndex = findHeaderIndex(headers, ['break type']);
    const entryTypeIndex = findHeaderIndex(headers, ['entry type']);

    // Process data rows (skip header row)
    const entries = lines.slice(1)
      .map((line, index) => {
        const actualRowNumber = index + 2; // +2 because we start at 1 and skip header
        const values = parseCSVLine(line);
        
        if (isEmptyRow(values)) {
          console.log(`Skipping empty row ${actualRowNumber}`);
          return null;
        }

        // Get date value
        const dateValue = dateIndex !== -1 ? values[dateIndex] : values[0];
        if (!dateValue || !isValidDate(dateValue)) {
          console.log(`Invalid date in row ${actualRowNumber}:`, line);
          return null;
        }

        const entry: TimesheetEntry = {
          date: dateValue,
          staffName: nameIndex !== -1 ? values[nameIndex] : '',
          client: clientIndex !== -1 ? (values[clientIndex] || 'Unspecified') : 'Unspecified',
          project: projectIndex !== -1 ? (values[projectIndex] || 'Unspecified') : 'Unspecified',
          task: taskIndex !== -1 ? values[taskIndex] : '',
          hours: hoursIndex !== -1 ? parseFloat(values[hoursIndex] || '0') : 0,
          status: 'Pending',
          time: timeIndex !== -1 ? values[timeIndex] : '',
          entryType: entryTypeIndex !== -1 ? values[entryTypeIndex] : '',
          break: breakIndex !== -1 ? values[breakIndex]?.toLowerCase() === 'true' : false,
          breakType: breakTypeIndex !== -1 ? values[breakTypeIndex] : '',
          rowNumber: actualRowNumber
        };

        // Log entry for debugging
        console.log(`Processing row ${actualRowNumber}:`, entry);

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