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
    <TableRow className="border-b border-gray-200">
      <TableCell className="text-gray-900">{entry.date}</TableCell>
      <TableCell className="text-gray-900">{entry.project}</TableCell>
      <TableCell className="text-gray-900">{entry.task}</TableCell>
      <TableCell className="text-gray-900 text-right">{entry.hours}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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