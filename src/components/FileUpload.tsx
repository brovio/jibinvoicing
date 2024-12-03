import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";

export const FileUpload = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/zip" && !file.name.endsWith('.zip')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a ZIP file",
        variant: "destructive",
      });
      return;
    }

    // Process the file
    toast({
      title: "File uploaded",
      description: "Your timesheet has been uploaded successfully",
    });
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
        className="gap-2"
      >
        <Upload className="h-4 w-4" />
        Upload Timesheet
      </Button>
    </>
  );
};