import JSZip from 'jszip';

export interface TimesheetEntry {
  [key: string]: any;  // Allow any string key for dynamic column mapping
  date: string;
  time?: string;
  staffName?: string;
  client: string;
  project: string;
  task: string;
  hours: number;
  status: string;
  break?: boolean;
  breakType?: string;
  rowNumber: number;
  entryType?: string;
  rawColumns: string[];  // Store all original columns
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

export const parseTimesheetCSV = (csvContent: string): TimesheetEntry[] => {
  try {
    // Split content into lines and remove empty lines
    const lines = csvContent.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    if (lines.length === 0) return [];

    // Get headers
    const headers = parseCSVLine(lines[0]);
    console.log('Headers found:', headers);

    // Process data rows (skip header row)
    const entries = lines.slice(1)
      .map((line, index) => {
        const actualRowNumber = index + 2; // +2 because we start at 1 and skip header
        const values = parseCSVLine(line);
        
        // Store all columns as raw data
        const entry: TimesheetEntry = {
          date: '',
          client: 'Unspecified',
          project: 'Unspecified',
          task: '',
          hours: 0,
          status: 'Pending',
          rowNumber: actualRowNumber,
          rawColumns: values
        };

        // Map known columns while preserving all raw data
        headers.forEach((header, colIndex) => {
          const value = values[colIndex] || '';
          const headerLower = header.toLowerCase().trim();

          if (headerLower.includes('date')) {
            entry.date = value;
          }
          if (headerLower.includes('time')) {
            entry.time = value;
          }
          if (headerLower.includes('name')) {
            entry.staffName = value;
          }
          if (headerLower.includes('client')) {
            entry.client = value || 'Unspecified';
          }
          if (headerLower.includes('project')) {
            entry.project = value || 'Unspecified';
          }
          if (headerLower.includes('task') || headerLower.includes('notes')) {
            entry.task = value;
          }
          if (headerLower.includes('hours') || headerLower.includes('duration')) {
            entry.hours = parseFloat(value) || 0;
          }
          if (headerLower.includes('break')) {
            entry.break = value.toLowerCase() === 'true' || value.toLowerCase() === 'yes';
          }
          if (headerLower.includes('break type')) {
            entry.breakType = value;
          }
          if (headerLower.includes('entry type')) {
            entry.entryType = value;
          }
        });

        console.log(`Processing row ${actualRowNumber}:`, entry);
        return entry;
      });

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