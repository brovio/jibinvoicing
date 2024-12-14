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

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: any) => void;
  client?: any;
  mode: 'add' | 'edit' | 'view';
}

export const ClientModal = ({ isOpen, onClose, onSave, client, mode }: ClientModalProps) => {
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
    if (client) {
      setFormData({
        ...client,
        clientId: client.clientId || `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      });
    } else if (mode === 'add') {
      setFormData(prev => ({
        ...prev,
        clientId: `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#252A38] border border-gray-800 text-white dialog-content">
        <DialogHeader>
          <DialogTitle className="text-white">
            {mode === 'add' ? 'Add New Client' : mode === 'edit' ? 'Edit Client' : 'View Client'}
          </DialogTitle>
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
  );
};