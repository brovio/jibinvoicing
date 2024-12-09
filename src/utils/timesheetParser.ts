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
  if (Array.isArray(line)) {
    return line.map(item => item?.toString().trim() || '');
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

const isEmptyRow = (values: string[]): boolean => {
  return values.every(value => !value || value.trim() === '');
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
    return lines.slice(1)
      .map(line => parseCSVLine(line))
      .filter(values => !isEmptyRow(values))
      .map((values, rowIndex) => {
        console.log(`Processing row ${rowIndex + 2}:`, values); // Add 2 to account for 1-based indexing and header row

        const getValueByHeader = (headerName: string): string => {
          const index = headers.findIndex(h => h.includes(headerName.toLowerCase()));
          return index !== -1 ? values[index]?.trim() || '' : '';
        };

        // Try to find a valid date
        let dateValue = getValueByHeader('date');
        if (!isValidDate(dateValue)) {
          for (const value of values) {
            if (value && isValidDate(value.split(' ')[0])) {
              dateValue = value.split(' ')[0];
              break;
            }
          }
        }

        if (!dateValue) {
          console.log(`No valid date found in row ${rowIndex + 2}`);
          return null;
        }

        // Look for project name in both specific project column and task name column
        const projectName = getValueByHeader('project name') || 
                          getValueByHeader('project') || 
                          getValueByHeader('task name') || '';

        const entry: TimesheetEntry = {
          date: dateValue,
          client: getValueByHeader('client') || getValueByHeader('company') || '',
          project: projectName,
          task: getValueByHeader('task description') || getValueByHeader('notes') || getValueByHeader('task') || '',
          hours: parseFloat(getValueByHeader('duration')) || parseFloat(getValueByHeader('hours')) || 0,
          status: 'Pending',
          staffName: getValueByHeader('staff name') || getValueByHeader('name') || '',
          entryType: getValueByHeader('entry type') || getValueByHeader('type') || '',
          time: getValueByHeader('time') || '',
          break: getValueByHeader('break')?.toLowerCase() === 'true',
          breakType: getValueByHeader('break type') || ''
        };

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