import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import { parseCSV, parseJSON, validateClients, ImportedClient } from "@/utils/importUtils";

interface FileUploadProps {
  onImportSuccess: (clients: ImportedClient[]) => void;
}

export const FileUpload = ({ onImportSuccess }: FileUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!['csv', 'json'].includes(fileExtension || '')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or JSON file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      let clients: ImportedClient[] = [];

      try {
        if (fileExtension === 'csv') {
          clients = parseCSV(content);
        } else {
          clients = parseJSON(content);
        }

        if (validateClients(clients)) {
          onImportSuccess(clients);
          toast({
            title: "Import successful",
            description: `Successfully imported ${clients.length} clients`,
          });
          
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: "There was an error processing your file. Please check the format and try again.",
          variant: "destructive",
        });
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