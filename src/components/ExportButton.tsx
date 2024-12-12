import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { showExportSuccessToast, showExportErrorToast } from "@/utils/toastUtils";

interface Client {
  company: string;
  contactName: string;
  email: string;
  phone?: string;
  address?: string;
  currency: string;
  rate: number;
  notes?: string;
  website?: string;
}

interface ExportButtonProps {
  clients: Client[];
  format: 'json' | 'csv';
}

export const ExportButton = ({ clients, format }: ExportButtonProps) => {
  const exportToCSV = (clients: Client[]) => {
    const headers = ['company,contactName,email,phone,address,currency,rate,notes,website'];
    const csvRows = clients.map(client => 
      `${client.company || ''},${client.contactName || ''},${client.email || ''},${client.phone || ''},${client.address || ''},${client.currency || ''},${client.rate || ''},${client.notes || ''},${client.website || ''}`
    );
    const csvContent = [headers, ...csvRows].join('\n');
    return csvContent;
  };

  const exportToJSON = (clients: Client[]) => {
    return JSON.stringify(clients, null, 2);
  };

  const handleExport = () => {
    try {
      const content = format === 'csv' ? exportToCSV(clients) : exportToJSON(clients);
      const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clients.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showExportSuccessToast(clients.length, format);
    } catch (error) {
      showExportErrorToast();
    }
  };

  return (
    <Button
      onClick={handleExport}
      className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white gap-2 rounded-[10px]"
    >
      <Download className="h-4 w-4" />
      Export as {format.toUpperCase()}
    </Button>
  );
};