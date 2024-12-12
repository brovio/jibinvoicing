import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BillingFieldsProps {
  formData: {
    rate: string;
    currency: string;
    notes: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => void;
  mode: 'add' | 'edit' | 'view';
}

export const BillingFields = ({ formData, handleChange, mode }: BillingFieldsProps) => {
  const currencies = ["AUD", "EUR", "GBP", "USD"];

  const handleCurrencyChange = (value: string) => {
    handleChange({ target: { name: "currency", value } });
  };

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
        <Select
          disabled={mode === 'view'}
          value={formData.currency}
          onValueChange={handleCurrencyChange}
        >
          <SelectTrigger className="bg-[#1A1F2C] border-gray-700 text-white">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1F2C] border-gray-700">
            {currencies.map((currency) => (
              <SelectItem 
                key={currency} 
                value={currency}
                className="text-white hover:bg-[#2A303F] cursor-pointer"
              >
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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