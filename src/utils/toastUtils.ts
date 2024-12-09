import { toast } from "@/components/ui/use-toast";

export const showSuccessToast = (title: string, description: string) => {
  toast({
    title,
    description,
  });
};

export const showErrorToast = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: "destructive",
  });
};

export const showImportSuccessToast = (count: number) => {
  showSuccessToast(
    "Import successful",
    `Successfully imported ${count} clients`
  );
};

export const showImportErrorToast = () => {
  showErrorToast(
    "Import failed",
    "There was an error processing your file. Please check the format and try again."
  );
};

export const showExportSuccessToast = (count: number, format: string) => {
  showSuccessToast(
    "Export successful",
    `Successfully exported ${count} clients as ${format.toUpperCase()}`
  );
};

export const showExportErrorToast = () => {
  showErrorToast(
    "Export failed",
    "There was an error exporting your clients"
  );
};

export const showClientDeletedToast = (companyName: string) => {
  showSuccessToast(
    "Client Deleted",
    `${companyName} has been removed from your clients list.`
  );
};

export const showClientSavedToast = (mode: 'add' | 'edit', companyName: string) => {
  showSuccessToast(
    `Client ${mode === 'add' ? 'Added' : 'Updated'} Successfully`,
    `${companyName} has been ${mode === 'add' ? 'added to' : 'updated in'} your clients list.`
  );
};