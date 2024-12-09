import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { showErrorToast, showClientSavedToast } from "@/utils/toastUtils";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: any) => void;
  client?: any;
  mode: 'add' | 'edit' | 'view';
}

export const ClientModal = ({ isOpen, onClose, onSave, client, mode }: ClientModalProps) => {
  const [formData, setFormData] = useState({
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
      setFormData(client);
    }
  }, [client]);

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
    showClientSavedToast(mode, formData.company);
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
            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-300">Company Name *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={mode === 'view'}
                required
                className="bg-[#1A1F2C] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName" className="text-gray-300">Contact Name *</Label>
              <Input
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                disabled={mode === 'view'}
                required
                className="bg-[#1A1F2C] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={mode === 'view'}
                required
                className="bg-[#1A1F2C] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="bg-[#1A1F2C] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate" className="text-gray-300">Rate</Label>
              <Input
                id="rate"
                name="rate"
                type="number"
                value={formData.rate}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="bg-[#1A1F2C] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-gray-300">Currency</Label>
              <Input
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="bg-[#1A1F2C] border-gray-700 text-white"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="address" className="text-gray-300">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="bg-[#1A1F2C] border-gray-700 text-white"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="website" className="text-gray-300">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="bg-[#1A1F2C] border-gray-700 text-white"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="notes" className="text-gray-300">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="bg-[#1A1F2C] border-gray-700 text-white min-h-[100px]"
              />
            </div>
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