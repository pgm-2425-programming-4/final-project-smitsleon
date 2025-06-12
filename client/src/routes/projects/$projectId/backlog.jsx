import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../../queries/fetch-projects";
import { PaginatedBackLog } from "../../../components/paginated-backlog/paginated-backlog";
import AddTaskForm from "../../../components/AddTaskForm";

function ProjectBacklog() {
  const { projectId } = Route.useParams();
  const [showModal, setShowModal] = useState(false);

  const { data: projectList } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const project = projectList?.data?.find(
    (item) => String(item.id) === String(projectId),
  );
  const naam = project?.attributes?.name || project?.name || "Onbekend project";

  return (
    <section className="project-backlog">
      <header className="header">
        <h2 className="header__title">Backlog van: {naam}</h2>
        <div className="header__actions">
          <Link
            to="/projects/$projectId/backlog"
            params={{ projectId }}
            className="view-toggle__button view-toggle__button--active"
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
          <button
            className="button button--primary"
            onClick={() => setShowModal(true)}
          >
            Taak toevoegen
          </button>
        </div>
      </header>
      <PaginatedBackLog selectedProject={parseInt(projectId)} />
      {showModal && (
        <AddTaskForm
          onClose={() => setShowModal(false)}
          currentProjectId={parseInt(projectId)}
          projects={projectList?.data || []}
        />
      )}
    </section>
  );
}

export const Route = createFileRoute("/projects/$projectId/backlog")({
  component: ProjectBacklog,
});
