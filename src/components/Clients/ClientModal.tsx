import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { showErrorToast, showClientSavedToast } from "@/utils/toastUtils";
import { BasicInfoFields } from "./FormFields/BasicInfoFields";
import { ContactFields } from "./FormFields/ContactFields";
import { BillingFields } from "./FormFields/BillingFields";
import { FileEdit } from "lucide-react";

let nextManualClientId = 1;

const generateNextManualClientId = () => {
  return String(nextManualClientId++).padStart(4, '0');
};

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: any) => void;
  client?: any;
  mode: 'add' | 'edit' | 'view';
}

export const ClientModal = ({ isOpen, onClose, onSave, client, mode: initialMode }: ClientModalProps) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    clientId: '',
    company: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    rate: '',
    currency: 'USD',
    notes: '',
    website: ''
  });

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (client) {
      setFormData({
        ...client,
        clientId: client.clientId || generateNextManualClientId()
      });
    } else if (mode === 'add') {
      setFormData(prev => ({
        ...prev,
        clientId: generateNextManualClientId()
      }));
    }
  }, [client, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company || !formData.contactName || !formData.email) {
      showErrorToast(
        "Validation Error",
        "Company, Contact Name and Email are required fields"
      );
      return;
    }

    onSave(formData);
    onClose();
    if (mode !== 'view') {
      showClientSavedToast(mode, formData.company);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleEditMode = () => {
    setMode(mode === 'view' ? 'edit' : 'view');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#252A38] border border-gray-800 text-white dialog-content">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-white">
              {mode === 'add' ? 'Add New Client' : mode === 'edit' ? 'Edit Client' : 'View Client'}
            </DialogTitle>
            {mode === 'view' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleEditMode}
                className="hover:bg-gray-700"
              >
                <FileEdit className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <BasicInfoFields formData={formData} handleChange={handleChange} mode={mode} />
            <ContactFields formData={formData} handleChange={handleChange} mode={mode} />
            <BillingFields formData={formData} handleChange={handleChange} mode={mode} />
          </div>
          <DialogFooter>
            {mode === 'view' ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
              >
                Close
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
              >
                {mode === 'add' ? 'Add Client' : 'Save Changes'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};