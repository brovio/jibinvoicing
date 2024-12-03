import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Plus, Import, Export, Clock, Users, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard 
          title="Clients" 
          icon={<Users className="h-6 w-6" />}
          actions={[
            { label: "Add New", icon: <Plus className="h-4 w-4" /> },
            { label: "Import", icon: <Import className="h-4 w-4" /> },
            { label: "Export", icon: <Export className="h-4 w-4" /> }
          ]}
        />
        <QuickActionCard 
          title="Timesheets" 
          icon={<Clock className="h-6 w-6" />}
          actions={[
            { label: "Add New", icon: <Plus className="h-4 w-4" /> },
            { label: "Import", icon: <Import className="h-4 w-4" /> },
            { label: "Export", icon: <Export className="h-4 w-4" /> }
          ]}
        />
        <QuickActionCard 
          title="Invoices" 
          icon={<FileText className="h-6 w-6" />}
          actions={[
            { label: "Create New", icon: <Plus className="h-4 w-4" /> },
            { label: "Export All", icon: <Export className="h-4 w-4" /> }
          ]}
        />
      </div>

      {/* Activity Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClientProjectsSummary />
        <CompanyInfoSummary />
      </div>
    </div>
  );
};

const QuickActionCard = ({ 
  title, 
  icon, 
  actions 
}: { 
  title: string; 
  icon: React.ReactNode;
  actions: Array<{ label: string; icon: React.ReactNode }>;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {actions.map((action, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="w-full justify-start"
            >
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ClientProjectsSummary = () => {
  const projects = [
    {
      client: "Acme Inc",
      project: "Website Redesign",
      status: "In Progress",
      lastUpdated: "3h ago",
      imgUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      client: "Globex Corp",
      project: "Mobile App Development",
      status: "Completed",
      lastUpdated: "2d ago",
      imgUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    // Add more dummy data as needed
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Client Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <img
                className="h-12 w-12 rounded-full"
                src={project.imgUrl}
                alt=""
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {project.client}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {project.project}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-gray-900">{project.status}</p>
                <p className="text-sm text-gray-500">{project.lastUpdated}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CompanyInfoSummary = () => {
  const stats = [
    { name: 'Total Clients', value: '12' },
    { name: 'Active Projects', value: '8' },
    { name: 'Pending Invoices', value: '4' },
    { name: 'Revenue YTD', value: '$240,000' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.name} className="px-4 py-2">
              <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
};

export default Index;