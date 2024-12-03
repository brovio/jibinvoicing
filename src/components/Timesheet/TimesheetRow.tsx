import { TableCell, TableRow } from "@/components/ui/table";

interface TimesheetEntry {
  date: string;
  project: string;
  task: string;
  hours: number;
  status: string;
}

export const TimesheetRow = ({ data }: { data: TimesheetEntry }) => {
  return (
    <TableRow className="border-b border-gray-200">
      <TableCell className="text-gray-900">{data.date}</TableCell>
      <TableCell className="text-gray-900">{data.project}</TableCell>
      <TableCell className="text-gray-900">{data.task}</TableCell>
      <TableCell className="text-gray-900 text-right">{data.hours}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
          data.status === 'Approved' 
            ? 'bg-green-100 text-green-800' 
            : data.status === 'Pending' 
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {data.status}
        </span>
      </TableCell>
    </TableRow>
  );
};