export interface LogEntry {
  Date: string;
  FullName: string;
  EntryType: string;
  Time: string;
  Notes?: string;
  Client?: string;
  Project?: string;
  Duration?: string;
}

export interface ProcessedSession {
  Date: string;
  FullName: string;
  Client: string;
  Activity: string;
  Notes: string;
  Duration: string;
}

export function processLogEntries(logEntries: LogEntry[]): ProcessedSession[] {
  // Create a copy of the array to avoid mutating the original
  const sortedEntries = [...logEntries].sort((a, b) => {
    if (a.FullName !== b.FullName) return a.FullName.localeCompare(b.FullName);
    if (a.Date !== b.Date) return a.Date.localeCompare(b.Date);
    return a.Time.localeCompare(b.Time);
  });

  const processedSessions: ProcessedSession[] = [];
  const processedTimes = new Set<string>(); // Track processed timestamps to avoid duplicates

  for (let i = 0; i < sortedEntries.length; i++) {
    const entry = sortedEntries[i];

    if (entry.EntryType === "in") {
      // Create unique identifier for this session
      const sessionKey = `${entry.FullName}-${entry.Date}-${entry.Time}`;
      
      // Skip if already processed
      if (processedTimes.has(sessionKey)) continue;

      // Find corresponding 'out' entry
      const outEntry = sortedEntries.find(
        (e) =>
          e.FullName === entry.FullName &&
          e.Date === entry.Date &&
          e.EntryType === "out" &&
          e.Time > entry.Time
      );

      if (outEntry) {
        // Mark this session as processed
        processedTimes.add(sessionKey);

        // Combine Notes from 'in' and 'out', filtering out undefined/null values
        const notes = [entry.Notes, outEntry.Notes]
          .filter(Boolean)
          .join(" ")
          .trim();

        // Determine Client or fallback to Project
        const client = 
          entry.Client || 
          outEntry.Client || 
          entry.Project || 
          outEntry.Project || 
          "";

        // Create processed session
        processedSessions.push({
          Date: entry.Date,
          FullName: entry.FullName,
          Client: client,
          Activity: entry.Project || "",
          Notes: notes,
          Duration: entry.Duration || "",
        });
      }
    }
  }

  return processedSessions;
}

// Utility function to format duration string (optional helper function)
export function formatDuration(duration: string): string {
  const match = duration.match(/(\d+)h\s*(\d+)m/);
  if (!match) return duration;
  
  const [, hours, minutes] = match;
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}

// Example usage and test data
const sampleLogEntries: LogEntry[] = [
  {
    Date: "2024-12-01",
    FullName: "Jane Doe",
    EntryType: "in",
    Time: "09:00",
    Notes: "Started wireframe sketches.",
    Client: "Acme Corp",
    Project: "Acme Redesign",
    Duration: "2h 0m",
  },
  {
    Date: "2024-12-01",
    FullName: "Jane Doe",
    EntryType: "out",
    Time: "11:30",
    Notes: "Completed initial wireframe.",
    Client: "Acme Corp",
    Project: "Acme Redesign",
  },
];

// For testing in development
if (process.env.NODE_ENV === 'development') {
  console.log('Sample processed sessions:', processLogEntries(sampleLogEntries));
}