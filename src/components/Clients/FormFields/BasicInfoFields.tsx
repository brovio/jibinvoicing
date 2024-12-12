import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoFieldsProps {
  formData: {
    company: string;
    contactName: string;
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mode: 'add' | 'edit' | 'view';
}

export const BasicInfoFields = ({ formData, handleChange, mode }: BasicInfoFieldsProps) => {
  return (
    <>
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
    </>
  );
};