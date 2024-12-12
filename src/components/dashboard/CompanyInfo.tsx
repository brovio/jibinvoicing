type StaffMember = {
  name: string;
  role: string;
};

interface CompanyInfoProps {
  staff: StaffMember[];
}

export const CompanyInfo = ({ staff }: CompanyInfoProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-white">Company Info Summary</h2>
      <div className="space-y-4">
        {staff.map((person, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">{person.name}</span>
            <span className="text-sm text-gray-400">{person.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};