import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

type Project = {
  name: string;
  status: string;
  dueDate: string;
  creator: string;
};

interface ProjectActivityProps {
  projects: Project[];
}

export const ProjectActivity = ({ projects }: ProjectActivityProps) => {
  return (
    <div className="dashboard-card h-[calc(100vh-2rem)]">
      <h2 className="text-lg font-semibold mb-4 text-white">Clients/Project Activity Summary</h2>
      <div className="space-y-4">
        {projects.map((project, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-white">{project.name}</h3>
              <div className="flex items-center text-sm text-gray-400">
                <span>Due on {project.dueDate}</span>
                <span className="mx-2">•</span>
                <span>Created by {project.creator}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-dashboard-card border-dashboard-border text-white hover:bg-dashboard-hover"
              >
                View project
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:bg-dashboard-hover hover:text-white"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};