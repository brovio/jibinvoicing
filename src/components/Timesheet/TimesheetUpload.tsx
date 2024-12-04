import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { processZipFile, TimesheetEntry } from "@/utils/timesheetUtils";

interface TimesheetUploadProps {
  onImportSuccess: (entries: TimesheetEntry[]) => void;
}

export const TimesheetUpload = ({ onImportSuccess }: TimesheetUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
      return;
    }

    const entries = await processZipFile(file);
    if (entries.length > 0) {
      onImportSuccess(entries);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white gap-2 rounded-[10px]"
      >
        <Upload className="h-4 w-4" />
        Import Timesheets (ZIP)
      </Button>
    </>
  );
};