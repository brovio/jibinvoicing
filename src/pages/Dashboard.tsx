import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Badge } from "@/components/ui/badge";

const projects = [
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
    name: "Onboarding emails",
    status: "In progress",
    dueDate: "May 25, 2023",
    creator: "Courtney Henry",
  },
  {
    name: "iOS app",
    status: "In progress",
    dueDate: "June 7, 2023",
    creator: "Leonard Krasner",
  },
  {
    name: "Marketing site redesign",
    status: "Archived",
    dueDate: "June 10, 2023",
    creator: "Courtney Henry",
  },
];

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
  },
  {
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
  },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-6">
        <Card className="h-full">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Clients/Project Activity Summary
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {projects.map((project) => (
              <li key={project.name} className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900">{project.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={project.status === "Complete" ? "default" : "secondary"}>
                        {project.status}
                      </Badge>
                      <p className="text-sm text-gray-500">
                        Due on {project.dueDate} • Created by {project.creator}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">View project</Button>
                    <Button variant="ghost" size="icon">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Right Column */}
      <div className="col-span-12 lg:col-span-6 space-y-6">
        {/* Quick Actions */}
        <Card>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Clients
            </h3>
            <div className="mt-4 space-y-2">
              <Button className="w-full justify-start" variant="outline">Add New</Button>
              <Button className="w-full justify-start" variant="outline">Import</Button>
              <Button className="w-full justify-start" variant="outline">Export</Button>
            </div>
          </div>
        </Card>

        {/* Timesheets */}
        <Card>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Timesheets
            </h3>
          </div>
        </Card>

        {/* Company Info Summary */}
        <Card>
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Company Info Summary
            </h3>
            <div className="mt-4">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;