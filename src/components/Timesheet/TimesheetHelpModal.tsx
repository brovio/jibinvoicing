import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TimesheetHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimesheetHelpModal = ({ isOpen, onClose }: TimesheetHelpModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#252A38] border border-gray-800 text-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Timesheet Import Guide</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-medium mb-2">Supported File Formats</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>CSV files (.csv)</li>
              <li>ZIP files containing multiple CSV files</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Required Columns</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Date</li>
              <li>Full Name</li>
              <li>Member Code</li>
              <li>Entry Type</li>
              <li>Time</li>
              <li>Duration</li>
              <li>Project</li>
              <li>Activity</li>
              <li>Client</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Import Process</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-300">
              <li>The system reads the CSV file(s) line by line</li>
              <li>Only entries with "In" EntryType and valid duration are processed</li>
              <li>Duration is converted from "Xh Ym" format to decimal hours</li>
              <li>Each entry is validated for required fields</li>
              <li>The data is then displayed in the timesheet table</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-medium mb-2">Tips</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Make sure your CSV files are properly formatted with headers</li>
              <li>Duration should be in the format "Xh Ym" (e.g., "2h 30m")</li>
              <li>When using ZIP files, ensure all contained CSVs follow the same format</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};