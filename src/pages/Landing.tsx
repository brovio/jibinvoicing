import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus, Upload, Download } from "lucide-react";

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
        <Card className="p-6 bg-white h-full">
          <h2 className="text-lg font-semibold mb-4">Clients/Project Activity Summary</h2>
          <div className="space-y-4">
            {projectData.map((project, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">{project.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Due on {project.dueDate}</span>
                    <span className="mx-2">•</span>
                    <span>Created by {project.creator}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">View project</Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right section - 2x2 grid */}
      <div className="col-span-8 grid grid-cols-2 gap-6">
        {/* Clients */}
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Clients</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </Card>

        {/* Invoices */}
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Invoices</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </Card>

        {/* Timesheets */}
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Timesheets</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </Card>

        {/* Company Info Summary */}
        <Card className="p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Company Info Summary</h2>
          <div className="space-y-4">
            {staffData.map((person, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-sm font-medium">{person.name}</span>
                <span className="text-sm text-gray-500">{person.role}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Landing;