import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TimesheetStatusProps {
  flagged: boolean;
  flagReason?: string;
  isEditMode?: boolean;
  onFlagReasonChange?: (value: string) => void;
}

export const TimesheetStatus = ({
  flagged,
  flagReason,
  isEditMode,
  onFlagReasonChange,
}: TimesheetStatusProps) => {
  return (
    <>
      <div className="col-span-2">
        <Label className="text-gray-400">Status</Label>
        <p className={`${flagged ? 'text-red-500' : 'text-green-500'}`}>
          {flagged ? 'Flagged' : 'Approved'}
        </p>
      </div>
      {flagged && (
        <div className="col-span-2">
          <Label className="text-gray-400">Flag Reason</Label>
          {isEditMode ? (
            <Input
              value={flagReason || ''}
              onChange={(e) => onFlagReasonChange?.(e.target.value)}
              className="bg-[#1F2937] border-gray-700 text-white"
            />
          ) : (
            <p className="text-red-500">{flagReason || 'No reason provided'}</p>
          )}
        </div>
      )}
    </>
  );
};