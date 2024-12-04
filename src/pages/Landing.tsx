import { ProjectActivity } from "@/components/dashboard/ProjectActivity";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { CompanyInfo } from "@/components/dashboard/CompanyInfo";

const projectData = [
  {
    name: "GraphQL API",
    status: "Complete",
    dueDate: "March 17, 2023",
    creator: "Leslie Alexander",
  },
  {
    name: "New benefits plan",
    status: "In progress",
    dueDate: "May 5, 2023",
    creator: "Leslie Alexander",
  },
  {
    name: "iOS app",
    status: "In progress",
    dueDate: "June 7, 2023",
    creator: "Leonard Krasner",
  },
  {
    name: "Marketing website redesign",
    status: "Planning",
    dueDate: "July 12, 2023",
    creator: "Tom Cook",
  },
];

const staffData = [
  { name: "Lindsay Walton", role: "Front-end Developer" },
  { name: "Courtney Henry", role: "Designer" },
  { name: "Tom Cook", role: "Director of Product" },
];

const Landing = () => {
  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-2rem)]">
      {/* Left column - Project Activity */}
      <div className="col-span-4">
        <ProjectActivity projects={projectData} />
      </div>

      {/* Right section - 2x2 grid */}
      <div className="col-span-8 grid grid-cols-2 gap-6">
        <QuickActionCard title="Clients" />
        <QuickActionCard title="Invoices" />
        <QuickActionCard title="Timesheets" />
        <CompanyInfo staff={staffData} />
      </div>
    </div>
  );
};

export default Landing;