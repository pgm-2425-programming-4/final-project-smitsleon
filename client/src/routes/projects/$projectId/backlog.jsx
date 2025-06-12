import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../../queries/fetch-projects";
import { PaginatedBackLog } from "../../../components/paginated-backlog/paginated-backlog";
import AddTaskForm from "../../../components/AddTaskForm";

function ProjectBacklogComponent() {
  const { projectId } = Route.useParams();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Fetch the projects data to find the project
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  // Find the project from the projects list
  const project = projectsData?.data?.find(
    (project) => project.id === parseInt(projectId),
  );

  const projectName = project?.attributes?.name || project?.name || "No Project Selected";

  const handleAddTaskClick = () => {
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header__project">
          <h1 className="header__title">{projectName}</h1>
        </div>
        <div className="header__actions">
          <div className="header__view-toggle">
            <Link
              to="/projects/$projectId/backlog"
              params={{ projectId }}
              className="view-toggle__button"
              activeProps={{
                className: "view-toggle__button view-toggle__button--active",
              }}
            >
              Backlog
            </Link>
            <Link
              to="/projects/$projectId"
              params={{ projectId }}
              className="view-toggle__button"
            >
              Kanban
            </Link>
          </div>
          <button
            className="button button--primary"
            onClick={handleAddTaskClick}
          >
            Add Task
          </button>
        </div>
      </header>

      <PaginatedBackLog selectedProject={parseInt(projectId)} />

      {isTaskModalOpen && (
        <AddTaskForm
          onClose={handleCloseModal}
          currentProjectId={parseInt(projectId)}
          projects={projectsData?.data || []}
        />
      )}
    </>
  );
}

export const Route = createFileRoute("/projects/$projectId/backlog")({
  component: ProjectBacklogComponent,
});