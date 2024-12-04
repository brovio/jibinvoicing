import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ClientsHeaderProps {
  onSort: (key: string) => void;
}

export const ClientsHeader = ({ onSort }: ClientsHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-800 hover:bg-transparent">
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors w-[40px] p-4"
        >
          <input type="checkbox" className="rounded-sm border-gray-700" />
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors"
          onClick={() => onSort('company')}
        >
          Company
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors"
          onClick={() => onSort('contactName')}
        >
          Contact Name
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors"
          onClick={() => onSort('email')}
        >
          Email
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors"
          onClick={() => onSort('currency')}
        >
          Currency
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors text-right"
          onClick={() => onSort('rate')}
        >
          Rate
        </TableHead>
        <TableHead 
          className="text-gray-400 font-medium cursor-pointer hover:bg-[#2A303F] transition-colors w-[100px]"
        >
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};