import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TimesheetHeader } from "./TimesheetHeader";
import { TimesheetRow } from "./TimesheetRow";

export const TimesheetTable = ({ data }: { data: any[] }) => {
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
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
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
