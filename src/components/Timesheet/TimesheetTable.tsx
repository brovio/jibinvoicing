import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { TimesheetRow } from "./TimesheetRow";
import { TimesheetEntry } from "@/utils/timesheetParser";
import { SharedTableHeader } from "@/components/shared/TableHeader";
import { useTableSelection } from "@/hooks/useTableSelection";
import { TimesheetDeleteDialog } from "./TimesheetDeleteDialog";
import { TimesheetModal } from "./TimesheetModal";
import { TimesheetActions } from "./TimesheetActions";
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
  const [deleteConfirm, setDeleteConfirm] = React.useState({ isOpen: false });
  const [modalState, setModalState] = React.useState({ isOpen: false });

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
      
      const { error: importedError } = await supabase
        .from('imported_timesheets')
        .delete()
        .in('timesheet_id', ids);

      if (importedError) throw importedError;

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

  const handleTableSelectAll = (selected: boolean) => {
    handleSelectAll(selected, false);
  };

  return (
    <>
      <TimesheetActions />
      
      <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
        <Table>
          <SharedTableHeader 
            columns={timesheetColumns}
            onSort={requestSort}
            onSelectAll={handleTableSelectAll}
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
                onDelete={(entry) => setDeleteConfirm({ isOpen: true })}
                onView={(entry) => setModalState({ isOpen: true })}
                onEdit={(entry) => setModalState({ isOpen: true })}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <TimesheetDeleteDialog 
        isOpen={deleteConfirm.isOpen}
        onOpenChange={(open) => setDeleteConfirm({ isOpen: open })}
        onConfirm={handleDelete}
        getSelectedEntries={() => getSelectedItems(data)}
      />

      <TimesheetModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false })}
        entry={undefined}
      />
    </>
  );
};