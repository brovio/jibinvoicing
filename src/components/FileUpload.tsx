import { useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const zipFile = files.find(file => file.name.endsWith('.zip'));
    
    if (!zipFile) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a ZIP file"
      });
      return;
    }

    try {
      // Here we'll just log the file for now
      console.log('Zip file received:', zipFile.name);
      toast({
        title: "File received",
        description: `Successfully received ${zipFile.name}`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process the ZIP file"
      });
    }
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        handleFileSelected(files[0]);
      }
    };
    input.click();
  };

  const handleFileSelected = async (file: File) => {
    if (!file.name.endsWith('.zip')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a ZIP file"
      });
      return;
    }

    try {
      // Here we'll just log the file for now
      console.log('Zip file received:', file.name);
      toast({
        title: "File received",
        description: `Successfully received ${file.name}`
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process the ZIP file"
      });
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
        isDragging ? "border-primary bg-primary/5" : "border-gray-300"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <h3 className="text-lg font-medium mb-2">Drop ZIP files here</h3>
      <p className="text-sm text-gray-500">
        or click to select files to upload
      </p>
    </div>
  );
};