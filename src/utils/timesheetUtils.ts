import JSZip from 'jszip';
import { toast } from "@/components/ui/use-toast";

export interface TimesheetEntry {
  date: string;
  staffMember: string;
  entryType: string;
  time: string;
  duration: number;
  break: string;
  breakType: string;
  project: string;
  client: string;
  tasks: string;
}

const convertDurationToNumber = (duration: string): number => {
  if (!duration) return 0;
  const parts = duration.toLowerCase().split(' ');
  let total = 0;
  
  parts.forEach(part => {
    if (part.includes('h')) {
      total += parseFloat(part.replace('h', ''));
    } else if (part.includes('m')) {
      total += parseFloat(part.replace('m', '')) / 60;
    }
  });
  
  return Number(total.toFixed(6));
};

const processCSVContent = (content: string): TimesheetEntry[] => {
  const lines = content.split('\n');
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
  const entries: TimesheetEntry[] = [];
  let currentInEntry: Partial<TimesheetEntry> | null = null;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim());
    const entry: Partial<TimesheetEntry> = {};

    headers.forEach((header, index) => {
      const value = values[index] || '';
      
      switch (header) {
        case 'date':
          entry.date = value;
          break;
        case 'full name':
          entry.staffMember = value;
          break;
        case 'entrytype':
          entry.entryType = value;
          break;
        case 'time':
          entry.time = value;
          break;
        case 'duration':
          entry.duration = convertDurationToNumber(value);
          break;
        case 'break':
          entry.break = value;
          break;
        case 'break type':
          entry.breakType = value;
          break;
        case 'activity':
          entry.project = value;
          break;
        case 'client':
          entry.client = value || 'Unassigned';
          break;
        case 'notes':
          entry.tasks = value;
          break;
      }
    });

    // Handle merging of "out" entries with their corresponding "in" entries
    if (entry.entryType?.toLowerCase() === 'out') {
      if (currentInEntry && entry.tasks) {
        currentInEntry.tasks = currentInEntry.tasks 
          ? `${currentInEntry.tasks}; ${entry.tasks}`
          : entry.tasks;
      }
      // Add the out entry as a separate entry
      entries.push(entry as TimesheetEntry);
      currentInEntry = null;
    } else if (entry.entryType?.toLowerCase() === 'in') {
      currentInEntry = entry;
      entries.push(entry as TimesheetEntry);
    } else {
      // Add all other types of entries
      entries.push(entry as TimesheetEntry);
    }
  }

  return entries;
};

export const processZipFile = async (file: File): Promise<TimesheetEntry[]> => {
  try {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);
    
    // Find the correct CSV file
    const csvFile = Object.values(zipContent.files).find(file => 
      file.name.toLowerCase().includes('tracked time raw time entries')
    );

    if (!csvFile) {
      toast({
        title: "Error",
        description: "No valid timesheet data found in ZIP file",
        variant: "destructive",
      });
      return [];
    }

    const content = await csvFile.async('text');
    const entries = processCSVContent(content);

    toast({
      title: "Success",
      description: `Processed ${entries.length} timesheet entries`,
    });

    return entries;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to process ZIP file",
      variant: "destructive",
    });
    console.error('Error processing ZIP file:', error);
    return [];
  }
};