export interface TimesheetEntry {
  date: string;
  project: string;
  client: string;
  task: string;
  hours: number;
  staffName: string;
  entryType: string;
  time: string;
  break: string;
  breakType: string;
}

export const parseTimesheetCSV = (content: string): TimesheetEntry[] => {
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(value => value.trim());
      const entry: Partial<TimesheetEntry> = {};
      
      headers.forEach((header, index) => {
        switch(header) {
          case 'Date':
            entry.date = values[index];
            break;
          case 'Activity':
            entry.project = values[index];
            break;
          case 'Client':
            // Use Project as fallback if Client is empty
            entry.client = values[index] || values[headers.indexOf('Project')];
            break;
          case 'Notes':
            entry.task = values[index];
            break;
          case 'Duration':
            entry.hours = parseFloat(values[index]) || 0;
            break;
          case 'Full Name':
            entry.staffName = values[index];
            break;
          case 'EntryType':
            entry.entryType = values[index];
            break;
          case 'Time':
            entry.time = values[index];
            break;
          case 'Break':
            entry.break = values[index];
            break;
          case 'Break Type':
            entry.breakType = values[index];
            break;
        }
      });
      
      return entry as TimesheetEntry;
    });
};