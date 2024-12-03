import { TableCell, TableRow } from "@/components/ui/table";

interface TimesheetEntry {
  date: string;
  project: string;
  task: string;
  hours: number;
  status: string;
}

export const TimesheetRow = ({ entry }: { entry: TimesheetEntry }) => {
  return (
    <TableRow>
      <TableCell>{entry.date}</TableCell>
      <TableCell>{entry.project}</TableCell>
      <TableCell>{entry.task}</TableCell>
      <TableCell className="text-right">{entry.hours}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs ${
          entry.status === 'Approved' 
            ? 'bg-green-100 text-green-800' 
            : entry.status === 'Pending' 
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {entry.status}
        </span>
      </TableCell>
    </TableRow>
  );
};