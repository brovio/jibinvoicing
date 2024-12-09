import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ClientsHeader } from "./ClientsHeader";
import { ClientsRow } from "./ClientsRow";
import { ClientModal } from "./ClientModal";
import { TableActions } from "./TableActions";
import { TablePagination } from "./TablePagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { showClientDeletedToast } from "@/utils/toastUtils";

interface ClientEntry {
  company: string;
  contactName: string;
  email: string;
  currency: string;
  rate: number;
  phone?: string;
  address?: string;
  notes?: string;
  website?: string;
}

interface ClientsTableProps {
  data: ClientEntry[];
  onClientAdded?: (client: ClientEntry) => void;
  onClientUpdated?: (client: ClientEntry) => void;
  onClientDeleted?: (client: ClientEntry) => void;
}

export const ClientsTable = ({ 
  data,
  onClientAdded,
  onClientUpdated,
  onClientDeleted
}: ClientsTableProps) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [rateFilter, setRateFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    client?: ClientEntry;
  }>({ isOpen: false, mode: 'add' });
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; client?: ClientEntry }>({
    isOpen: false
  });

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filterData = (items: ClientEntry[]) => {
    return items.filter(item => {
      // Apply rate filter
      if (rateFilter) {
        const [min, max] = rateFilter.split('-').map(Number);
        if (max) {
          if (item.rate < min || item.rate > max) return false;
        } else {
          // Handle "151+" case
          if (item.rate < min) return false;
        }
      }

      // Apply currency filter
      if (currencyFilter && item.currency !== currencyFilter) {
        return false;
      }

      return true;
    });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    
    // Apply filters first
    sortableItems = filterData(sortableItems);
    
    // Then apply sorting
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
  }, [data, sortConfig, rateFilter, currencyFilter]);

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      const newSelected = new Set<string>();
      sortedData.forEach(client => newSelected.add(client.company));
      setSelectedClients(newSelected);
    } else {
      setSelectedClients(new Set());
    }
  };

  const handleRowSelect = (client: ClientEntry, selected: boolean) => {
    const newSelected = new Set(selectedClients);
    if (selected) {
      newSelected.add(client.company);
    } else {
      newSelected.delete(client.company);
    }
    setSelectedClients(newSelected);
  };

  const handleSave = (client: ClientEntry) => {
    if (modalState.mode === 'add') {
      onClientAdded?.(client);
    } else if (modalState.mode === 'edit') {
      onClientUpdated?.(client);
    }
    setModalState({ isOpen: false, mode: 'add' });
  };

  const handleDelete = (client: ClientEntry) => {
    setDeleteConfirm({ isOpen: false });
    onClientDeleted?.(client);
    showClientDeletedToast(client.company);
  };

  const handleImportSuccess = (importedClients: ClientEntry[]) => {
    importedClients.forEach(client => {
      onClientAdded?.(client);
    });
  };

  return (
    <>
      <TableActions
        onImportSuccess={handleImportSuccess}
        clients={data}
        onAddClick={() => setModalState({ isOpen: true, mode: 'add' })}
        onRateFilterChange={setRateFilter}
        onCurrencyFilterChange={setCurrencyFilter}
      />

      <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
        <Table>
          <ClientsHeader 
            onSort={requestSort} 
            onSelectAll={handleSelectAll}
            totalClients={data.length}
            visibleClients={sortedData.length}
          />
          <TableBody>
            {sortedData.map((item, index) => (
              <ClientsRow 
                key={index} 
                data={item}
                isSelected={selectedClients.has(item.company)}
                onSelect={(selected) => handleRowSelect(item, selected)}
                onView={(client) => setModalState({ isOpen: true, mode: 'view', client })}
                onEdit={(client) => setModalState({ isOpen: true, mode: 'edit', client })}
                onDelete={(client) => setDeleteConfirm({ isOpen: true, client })}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination totalResults={data.length} />

      <ClientModal 
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        client={modalState.client}
        onClose={() => setModalState({ isOpen: false, mode: 'add' })}
        onSave={handleSave}
      />

      <AlertDialog 
        open={deleteConfirm.isOpen} 
        onOpenChange={(open) => setDeleteConfirm(current => ({ ...current, isOpen: open }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the client
              {deleteConfirm.client && ` "${deleteConfirm.client.company}"`} and remove their data
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirm({ isOpen: false })}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm.client && handleDelete(deleteConfirm.client)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};