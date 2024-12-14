import JSZip from 'jszip';

export interface TimesheetEntry {
  tsid?: number;
  date: string;
  project: string;
  client: string;
  task: string;
  hours: number;
  status?: string;
  staffName?: string;
  entryType?: string;
  time?: string | null;
  break?: boolean;
  breakType?: string;
}

const generateTsid = (): number => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

export const parseTimesheetCSV = (csvContent: string): TimesheetEntry[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].toLowerCase().split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const entry: any = {
      tsid: generateTsid()
    };
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      entry[header] = value;
    });

    return entry as TimesheetEntry;
  });
};

export const processTimesheetZip = async (zipFile: File): Promise<TimesheetEntry[]> => {
  try {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(zipFile);
    
    const csvFile = Object.values(zipContent.files).find(file => 
      file.name.toLowerCase().endsWith('.csv')
    );

    if (!csvFile) {
      throw new Error('No CSV file found in the ZIP archive');
    }

    const csvContent = await csvFile.async('string');
    console.log('CSV Content:', csvContent);
    
    return parseTimesheetCSV(csvContent);
  } catch (error) {
    console.error('Error processing ZIP file:', error);
    throw new Error('Invalid timesheet format');
  }
};