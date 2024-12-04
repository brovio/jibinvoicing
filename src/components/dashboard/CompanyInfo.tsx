import { Card } from "@/components/ui/card";

type StaffMember = {
  name: string;
  role: string;
};

interface CompanyInfoProps {
  staff: StaffMember[];
}

export const CompanyInfo = ({ staff }: CompanyInfoProps) => {
  return (
    <Card className="p-6 bg-white">
      <h2 className="text-lg font-semibold mb-4">Company Info Summary</h2>
      <div className="space-y-4">
        {staff.map((person, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-sm font-medium">{person.name}</span>
            <span className="text-sm text-gray-500">{person.role}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};