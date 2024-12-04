import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TimesheetHeader } from "./TimesheetHeader";
import { TimesheetRow } from "./TimesheetRow";

interface TimesheetEntry {
  date: string;
  project: string;
  task: string;
  hours: number;
  status: string;
}

export const TimesheetTable = ({ data }: { data: TimesheetEntry[] }) => {
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: string } | null>(null);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  return (
    <div className="rounded-[10px] border border-[#3f37c9] bg-white shadow-md overflow-hidden">
      <Table>
        <TimesheetHeader onSort={requestSort} />
        <TableBody>
          {sortedData.map((item, index) => (
            <TimesheetRow key={index} data={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};