import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TimesheetFieldProps {
  label: string;
  value: string | number;
  onChange?: (value: string) => void;
  isEditMode?: boolean;
  type?: "text" | "number";
  className?: string;
}

export const TimesheetField = ({
  label,
  value,
  onChange,
  isEditMode = false,
  type = "text",
  className = "",
}: TimesheetFieldProps) => {
  return (
    <div className={className}>
      <Label className="text-gray-400">{label}</Label>
      {isEditMode ? (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="bg-[#1F2937] border-gray-700 text-white"
        />
      ) : (
        <p className="text-white">{value || 'Not specified'}</p>
      )}
    </div>
  );
};