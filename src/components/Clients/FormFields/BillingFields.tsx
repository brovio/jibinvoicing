import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BillingFieldsProps {
  formData: {
    rate: string;
    currency: string;
    notes: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  mode: 'add' | 'edit' | 'view';
}

export const BillingFields = ({ formData, handleChange, mode }: BillingFieldsProps) => {
  return (
    <>
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
    </>
  );
};