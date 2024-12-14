import { TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { ClientEntry } from "./types/clients";
import { BulkActions } from "./BulkActions";

interface ClientsHeaderProps {
  onSort: (key: string) => void;
  onSelectAll: (selectAll: boolean, includeAll?: boolean) => void;
  totalClients: number;
  visibleClients: number;
  onClientsDeleted: (client: ClientEntry) => void;
  selectedClients: Set<string>;
  onBulkUpdate: (field: string, value: string | number, selectedClients: Set<string>) => void;
  onBulkDelete: () => void;
}

export const ClientsHeader = ({
  onSort,
  onSelectAll,
  totalClients,
  visibleClients,
  onClientsDeleted,
  selectedClients,
  onBulkUpdate,
  onBulkDelete
}: ClientsHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-800 hover:bg-transparent">
        <TableCell className="p-4">
          <input
            type="checkbox"
            className="rounded-sm border-gray-700"
            checked={selectedClients.size > 0}
            onChange={(e) => onSelectAll(e.target.checked)}
          />
        </TableCell>
        <TableCell className="font-medium text-gray-300 cursor-pointer hover:text-white" onClick={() => onSort('company')}>
          Company
        </TableCell>
        <TableCell className="font-medium text-gray-300 cursor-pointer hover:text-white" onClick={() => onSort('contactName')}>
          Contact Name
        </TableCell>
        <TableCell className="font-medium text-gray-300 cursor-pointer hover:text-white" onClick={() => onSort('email')}>
          Email
        </TableCell>
        <TableCell className="font-medium text-gray-300 cursor-pointer hover:text-white" onClick={() => onSort('currency')}>
          Currency
        </TableCell>
        <TableCell className="font-medium text-gray-300 text-right cursor-pointer hover:text-white" onClick={() => onSort('rate')}>
          Rate
        </TableCell>
        <TableCell>
          {selectedClients.size > 0 && (
            <BulkActions
              selectedCount={selectedClients.size}
              totalCount={totalClients}
              visibleCount={visibleClients}
              onSelectAll={onSelectAll}
              onBulkUpdate={onBulkUpdate}
              onBulkDelete={onBulkDelete}
            />
          )}
        </TableCell>
      </TableRow>
    </TableHeader>
  );
};