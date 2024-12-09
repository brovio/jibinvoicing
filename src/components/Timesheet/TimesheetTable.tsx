import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TimesheetHeader } from "./TimesheetHeader";
import { TimesheetRow } from "./TimesheetRow";
import { TimesheetEntry } from "@/utils/timesheetParser";
import { TimesheetModal } from "./TimesheetModal";

export const TimesheetTable = ({ data }: { data: TimesheetEntry[] }) => {
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: string } | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleView = (entry: TimesheetEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
    console.log("Viewing entry:", entry);
  };

  return (
    <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
      <Table>
        <TimesheetHeader onSort={requestSort} />
        <TableBody>
          {sortedData.map((item, index) => (
            <TimesheetRow 
              key={index} 
              data={item} 
              onView={handleView}
              onEdit={(entry) => console.log("Edit entry:", entry)}
              onDelete={(entry) => console.log("Delete entry:", entry)}
            />
          ))}
        </TableBody>
      </Table>
      <TimesheetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        entry={selectedEntry}
      />
    </div>
  );
};