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
  {
    name: "Annual report",
    status: "In review",
    dueDate: "August 1, 2023",
    creator: "Michael Foster",
  },
  {
    name: "Brand guidelines",
    status: "Complete",
    dueDate: "August 15, 2023",
    creator: "Dries Vincent",
  }
];

const staffData = [
  { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com" },
  { name: "Courtney Henry", title: "Designer", email: "courtney.henry@example.com" },
  { name: "Tom Cook", title: "Director of Product", email: "tom.cook@example.com" },
];

const Landing = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left column - Project Activity */}
      <div className="col-span-5">
        <Card className="p-6 bg-white h-[calc(100vh-180px)] overflow-y-auto">
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

      {/* Middle column - Quick Actions */}
      <div className="col-span-3 space-y-6">
        <Card className="p-6 bg-white h-[calc((100vh-180px)/3 - 1rem)]">
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

        <Card className="p-6 bg-white h-[calc((100vh-180px)/3 - 1rem)]">
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

        <Card className="p-6 bg-white h-[calc((100vh-180px)/3 - 1rem)]">
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
      </div>

      {/* Right column - Company Info */}
      <div className="col-span-4">
        <Card className="p-6 bg-white h-[calc(100vh-180px)]">
          <h2 className="text-lg font-semibold mb-4">Company Info Summary</h2>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="text-left text-sm font-semibold text-gray-900 py-2">Name</th>
                  <th className="text-left text-sm font-semibold text-gray-900 py-2">Title</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {staffData.map((person, idx) => (
                  <tr key={idx}>
                    <td className="whitespace-nowrap py-2 text-sm text-gray-900">{person.name}</td>
                    <td className="whitespace-nowrap py-2 text-sm text-gray-500">{person.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Landing;