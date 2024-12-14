import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { showErrorToast, showClientSavedToast } from "@/utils/toastUtils";
import { BasicInfoFields } from "./FormFields/BasicInfoFields";
import { ContactFields } from "./FormFields/ContactFields";
import { BillingFields } from "./FormFields/BillingFields";

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
      // Ensure we're creating a new object instance for the form data
      setFormData({
        clientId: client.clientId || generateNextManualClientId(),
        company: client.company || '',
        contactName: client.contactName || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
        rate: client.rate?.toString() || '',
        currency: client.currency || 'USD',
        notes: client.notes || '',
        website: client.website || ''
      });
    } else if (mode === 'add') {
      // Reset form data for new clients
      setFormData({
        clientId: generateNextManualClientId(),
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
    }
  }, [client, mode, isOpen]); // Added isOpen to dependencies to ensure reset on modal close

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company || !formData.contactName || !formData.email) {
      showErrorToast(
        "Validation Error",
        "Company, Contact Name and Email are required fields"
      );
      return;
    }

    // Create a new object for the saved client data
    const clientData = {
      ...formData,
      rate: formData.rate ? Number(formData.rate) : null
    };

    onSave(clientData);
    onClose();
    if (mode !== 'view') {
      showClientSavedToast(mode, formData.company);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
  );
};