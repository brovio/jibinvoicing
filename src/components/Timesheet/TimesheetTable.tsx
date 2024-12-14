import { Table, TableBody } from "@/components/ui/table";
import { TimesheetRow } from "./TimesheetRow";
import { TimesheetEntry } from "@/utils/timesheetParser";
import { SharedTableHeader } from "@/components/shared/TableHeader";
import { useTableSelection } from "@/hooks/useTableSelection";
import { TimesheetDeleteDialog } from "./TimesheetDeleteDialog";
import { supabase } from "@/integrations/supabase/client";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";

const timesheetColumns = [
  { key: 'date', label: 'Date' },
  { key: 'client', label: 'Client' },
  { key: 'project', label: 'Project' },
  { key: 'task', label: 'Task' },
  { key: 'hours', label: 'Hours', align: 'right' as const },
  { key: 'status', label: 'Status' },
];

interface TimesheetTableProps {
  data: TimesheetEntry[];
}

export const TimesheetTable = ({ data }: TimesheetTableProps) => {
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = React.useState<{ 
    isOpen: boolean; 
    entry?: TimesheetEntry; 
    isMultiple?: boolean 
  }>({ isOpen: false });

  const {
    handleSelectAll,
    handleRowSelect,
    isSelected,
    excludedItems,
    selectAllMode,
    getSelectedItems,
    clearSelection
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

  const handleDelete = async (entriesToDelete: TimesheetEntry | TimesheetEntry[]) => {
    try {
      const entries = Array.isArray(entriesToDelete) ? entriesToDelete : [entriesToDelete];
      const ids = entries.map(entry => entry.tsid);
      
      const { error } = await supabase
        .from('brovio-timesheets')
        .delete()
        .in('tsid', ids);

      if (error) throw error;

      showSuccessToast(
        `Successfully deleted ${entries.length} timesheet ${entries.length === 1 ? 'entry' : 'entries'}`
      );
      clearSelection();
    } catch (error) {
      console.error('Error deleting timesheet entries:', error);
      showErrorToast('Failed to delete timesheet entries');
    }
    setDeleteConfirm({ isOpen: false });
  };

  const handleBulkAction = (action: string, includeAll?: boolean) => {
    if (action === 'deleteSelected') {
      const selectedEntries = getSelectedItems(data);
      if (selectedEntries.length > 0) {
        setDeleteConfirm({ 
          isOpen: true, 
          isMultiple: true 
        });
      }
    }
  };

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
              onDelete={() => setDeleteConfirm({ isOpen: true, entry: item })}
            />
          ))}
        </TableBody>
      </Table>

      <TimesheetDeleteDialog
        isOpen={deleteConfirm.isOpen}
        onOpenChange={(open) => setDeleteConfirm({ isOpen: open })}
        onConfirm={handleDelete}
        entry={deleteConfirm.entry}
        isMultiple={deleteConfirm.isMultiple}
        getSelectedEntries={() => getSelectedItems(data)}
      />
    </div>
  );
};