import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UnsavedChangesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const UnsavedChangesDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: UnsavedChangesDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#252A38] border border-gray-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            You have unsaved changes. Do you want to save them before closing?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onClose}
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            Discard
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
          >
            Save Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};