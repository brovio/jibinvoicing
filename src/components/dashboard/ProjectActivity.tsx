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
    <div className="h-[calc(100vh-2rem)]">
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
              <button className="btn-primary">
                View project
              </button>
              <button className="btn-icon">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};