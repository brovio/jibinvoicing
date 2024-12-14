import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { BasicInfoFields } from "./FormFields/BasicInfoFields";
import { ContactFields } from "./FormFields/ContactFields";
import { BillingFields } from "./FormFields/BillingFields";
import { UnsavedChangesDialog } from "./UnsavedChangesDialog";
import { useClientModal } from "./hooks/useClientModal";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: any) => void;
  client?: any;
  mode: 'add' | 'edit' | 'view';
}

export const ClientModal = ({ isOpen, onClose, onSave, client, mode }: ClientModalProps) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleClose,
    handleSaveAndClose,
    handleDiscardAndClose,
    showUnsavedDialog,
    hasUnsavedChanges
  } = useClientModal(isOpen, onClose, onSave, client, mode);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[600px] bg-[#252A38] border border-gray-800 text-white dialog-content">
          <DialogHeader>
            <DialogTitle className="text-white">
              {mode === 'add' ? 'Add New Client' : mode === 'edit' ? 'Edit Client' : 'View Client'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {mode === 'view' ? 'View client details below.' : 'Fill in the client details below.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <BasicInfoFields formData={formData} handleChange={handleChange} mode={mode} />
              <ContactFields formData={formData} handleChange={handleChange} mode={mode} />
              <BillingFields formData={formData} handleChange={handleChange} mode={mode} />
            </div>
            <DialogFooter>
              {mode !== 'view' && (
                <Button type="submit" className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90">
                  {mode === 'add' ? 'Add Client' : 'Save Changes'}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <UnsavedChangesDialog
        isOpen={showUnsavedDialog}
        onClose={handleDiscardAndClose}
        onConfirm={handleSaveAndClose}
      />
    </>
  );
};