import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ClientsHeader } from "./ClientsHeader";
import { ClientsRow } from "./ClientsRow";

interface ClientEntry {
  company: string;
  contactName: string;
  email: string;
  currency: string;
  rate: number;
}

export const ClientsTable = ({ data }: { data: ClientEntry[] }) => {
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
    <div className="bg-[#252A38] rounded-[10px] overflow-hidden border border-gray-800">
      <Table>
        <ClientsHeader onSort={requestSort} />
        <TableBody>
          {sortedData.map((item, index) => (
            <ClientsRow key={index} data={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};