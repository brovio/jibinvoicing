import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { parseCSV, parseJSON, validateClients, ImportedClient } from "@/utils/importUtils";
import { showImportSuccessToast, showImportErrorToast, showErrorToast } from "@/utils/toastUtils";
import { ClientEntry } from "./Clients/types/clients";

interface FileUploadProps {
  onImportSuccess: (clients: ClientEntry[]) => void;
}

export const FileUpload = ({ onImportSuccess }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!['csv', 'json'].includes(fileExtension || '')) {
      showErrorToast("Invalid file type", "Please upload a CSV or JSON file");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      let importedClients: ImportedClient[] = [];

      try {
        if (fileExtension === 'csv') {
          importedClients = parseCSV(content);
        } else {
          importedClients = parseJSON(content);
        }

        if (validateClients(importedClients)) {
          // Convert ImportedClient[] to ClientEntry[]
          const clients: ClientEntry[] = importedClients.map(client => ({
            company: client.company,
            contactName: client.contactName,
            email: client.email,
            phone: client.phone || '',
            address: client.address || '',
            currency: client.currency,
            rate: Number(client.rate),
            notes: client.notes || '',
            website: client.website || ''
          }));

          onImportSuccess(clients);
          showImportSuccessToast(clients.length);
          
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      } catch (error) {
        console.error('Import error:', error);
        showImportErrorToast();
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <input
        type="file"
        accept=".csv,.json"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white gap-2 rounded-[10px]"
      >
        <Upload className="h-4 w-4" />
        Import Clients (CSV/JSON)
      </Button>
    </>
  );
};