import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TimesheetHeader } from "./TimesheetHeader";
import { TimesheetRow } from "./TimesheetRow";
import { TimesheetEntry } from "@/utils/timesheetParser";
import { useTableSelection } from "@/hooks/useTableSelection";

export const TimesheetTable = ({ data }: { data: TimesheetEntry[] }) => {
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: string } | null>(null);
  const { handleSelectAll, handleRowSelect, isSelected, selectAllMode, excludedItems } = useTableSelection();

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
    <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
      <Table>
        <TimesheetHeader 
          onSort={requestSort} 
          onSelectAll={(selectAll: boolean, includeAll?: boolean) => handleSelectAll(selectAll, includeAll)}
          totalItems={data.length}
          visibleItems={sortedData.length}
          selectedCount={0}
          excludedCount={excludedItems.size}
          selectAllMode={selectAllMode}
        />
        <TableBody>
          {sortedData.map((item, index) => (
            <TimesheetRow 
              key={index} 
              data={item} 
              isSelected={isSelected(item)}
              onSelect={(selected) => handleRowSelect(item, selected)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};