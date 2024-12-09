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
  status?: string;
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

const findColumnIndex = (headers: string[], possibleNames: string[]): number => {
  const headerLower = headers.map(h => h.toLowerCase().trim());
  return headerLower.findIndex(h => possibleNames.some(name => h === name.toLowerCase()));
};

export const parseTimesheetCSV = (csvContent: string): TimesheetEntry[] => {
  try {
    // Split content into lines and remove empty lines
    const lines = csvContent.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    if (lines.length === 0) return [];

    // Get headers and find column indices
    const headers = parseCSVLine(lines[0]);
    console.log('Headers found:', headers);

    // Find column indices based on specified mappings
    const dateIndex = findColumnIndex(headers, ['Date']);
    const clientIndex = findColumnIndex(headers, ['Client']);
    const projectIndex = findColumnIndex(headers, ['Activity']);
    const taskIndex = findColumnIndex(headers, ['Notes']);
    const hoursIndex = findColumnIndex(headers, ['Duration']);
    const staffNameIndex = findColumnIndex(headers, ['Full Name']);
    const entryTypeIndex = findColumnIndex(headers, ['EntryType']);
    const timeIndex = findColumnIndex(headers, ['Time']);
    const breakIndex = findColumnIndex(headers, ['Break']);
    const breakTypeIndex = findColumnIndex(headers, ['Break Type']);

    // Process data rows (skip header row)
    const entries = lines.slice(1)
      .map((line, index) => {
        const actualRowNumber = index + 2; // +2 because we start at 1 and skip header
        const values = parseCSVLine(line);
        
        // Get client value with fallback logic
        let clientValue = values[clientIndex] || '';
        if (!clientValue.trim()) {
          clientValue = values[projectIndex] || '-';
        }

        const entry: TimesheetEntry = {
          date: values[dateIndex] || '',
          client: clientValue,
          project: values[projectIndex] || '',
          task: values[taskIndex] || '',
          hours: parseFloat(values[hoursIndex]) || 0,
          staffName: values[staffNameIndex] || '',
          entryType: values[entryTypeIndex] || '',
          time: values[timeIndex] || '',
          break: values[breakIndex]?.toLowerCase() === 'yes',
          breakType: values[breakTypeIndex] || '-',
          status: 'Pending',
          rowNumber: actualRowNumber,
          rawColumns: values
        };

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