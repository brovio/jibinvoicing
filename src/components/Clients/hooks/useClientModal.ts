import { useState, useEffect } from "react";
import { showErrorToast, showClientSavedToast } from "@/utils/toastUtils";

let nextManualClientId = 1;

const generateNextManualClientId = () => {
  return String(nextManualClientId++).padStart(4, '0');
};

export const useClientModal = (isOpen: boolean, onClose: () => void, onSave: (client: any) => void, client?: any, mode: 'add' | 'edit' | 'view') => {
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

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  useEffect(() => {
    if (client) {
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
    setHasUnsavedChanges(false);
  }, [client, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company || !formData.contactName || !formData.email) {
      showErrorToast(
        "Validation Error",
        "Company, Contact Name and Email are required fields"
      );
      return;
    }

    const clientData = {
      ...formData,
      rate: formData.rate ? Number(formData.rate) : null
    };

    onSave(clientData);
    setHasUnsavedChanges(false);
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
    setHasUnsavedChanges(true);
  };

  const handleClose = () => {
    if (hasUnsavedChanges && mode !== 'view') {
      setShowUnsavedDialog(true);
    } else {
      onClose();
    }
  };

  const handleSaveAndClose = () => {
    handleSubmit(new Event('submit') as any);
    setShowUnsavedDialog(false);
  };

  const handleDiscardAndClose = () => {
    setShowUnsavedDialog(false);
    setHasUnsavedChanges(false);
    onClose();
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleClose,
    handleSaveAndClose,
    handleDiscardAndClose,
    showUnsavedDialog,
    hasUnsavedChanges
  };
};