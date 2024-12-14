import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface BulkEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'currency' | 'rate';
  value: string;
  onValueChange: (value: string) => void;
  onConfirm: () => void;
}

export const BulkEditDialog = ({
  isOpen,
  onOpenChange,
  type,
  value,
  onValueChange,
  onConfirm,
}: BulkEditDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Bulk Edit {type === 'currency' ? 'Currency' : 'Rate'}
          </DialogTitle>
        </DialogHeader>
        {type === 'currency' ? (
          <select
            className="bg-[#252A38] border border-gray-800 text-gray-400 rounded-[10px] px-4 py-2 w-full"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
          >
            <option value="">Select Currency</option>
            <option value="AUD">AUD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
          </select>
        ) : (
          <Input
            type="number"
            placeholder="Enter new rate"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="bg-[#252A38] border-gray-800 text-white"
          />
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
            disabled={!value}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};