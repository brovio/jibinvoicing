import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TimesheetRow } from "./TimesheetRow";
import { TimesheetEntry } from "@/utils/timesheetParser";
import { SharedTableHeader } from "@/components/shared/TableHeader";
import { useTableSelection } from "@/hooks/useTableSelection";

const timesheetColumns = [
  { key: 'date', label: 'Date' },
  { key: 'client', label: 'Client' },
  { key: 'project', label: 'Project' },
  { key: 'task', label: 'Task' },
  { key: 'hours', label: 'Hours', align: 'right' as const },
  { key: 'status', label: 'Status' },
];

export const TimesheetTable = ({ data }: { data: TimesheetEntry[] }) => {
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: string } | null>(null);

  const {
    handleSelectAll,
    handleRowSelect,
    isSelected,
    excludedItems,
    selectAllMode,
    getSelectedItems
  } = useTableSelection<TimesheetEntry>();

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
        <SharedTableHeader 
          columns={timesheetColumns}
          onSort={requestSort}
          onSelectAll={handleSelectAll}
          totalItems={data.length}
          visibleItems={sortedData.length}
          selectedCount={selectAllMode ? data.length - excludedItems.size : getSelectedItems(data).length}
          excludedCount={excludedItems.size}
          selectAllMode={selectAllMode}
        />
        <TableBody>
          {sortedData.map((item) => (
            <TimesheetRow 
              key={item.tsid}
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