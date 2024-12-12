import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFieldsProps {
  formData: {
    phone: string;
    address: string;
    website: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mode: 'add' | 'edit' | 'view';
}

export const ContactFields = ({ formData, handleChange, mode }: ContactFieldsProps) => {
  return (
    <>
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
    </>
  );
};