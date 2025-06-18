import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProjects } from "../../queries/fetch-projects";
import AddTaskForm from "../../components/AddTaskForm";

function ProjectLayout() {
  const { projectId } = Route.useParams();
  const [showModal, setShowModal] = useState(false);

  const { data: projectList } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const project = projectList?.data?.find(
    (item) => String(item.id) === String(projectId),
  );
  const projectName = project?.attributes?.name || project?.name || "Laden...";

  if (projectList && !project) {
    return (
      <div className="project-not-found">
        <header className="header">
          <div className="header__project">
            <h1 className="header__title">Project niet gevonden</h1>
            <span className="header__subtitle">Dit project bestaat niet.</span>
          </div>
        </header>
      </div>
    );
  }

  return (
    <section className="project-detail">
      <header className="header">
        <div className="header__project">
          <h1 className="header__title">{projectName}</h1>
        </div>
        <div className="header__actions">
          <div className="header__view-toggle">
            <Link
              to="/projects/$projectId"
              params={{ projectId }}
              className="view-toggle__button"
              activeProps={{ className: "view-toggle__button--active" }}
            >
              Kanban
            </Link>
            <Link
              to="/projects/$projectId/backlog"
              params={{ projectId }}
              className="view-toggle__button"
              activeProps={{ className: "view-toggle__button--active" }}
            >
              Backlog
            </Link>
          </div>
          <button
            className="button button--primary"
            onClick={() => setShowModal(true)}
            disabled={!project}
          >
            Taak toevoegen
          </button>
        </div>
      </header>
      <Outlet />{" "}
      {showModal && (
        <AddTaskForm
          onClose={() => setShowModal(false)}
          currentProjectId={project?.documentId}
          projects={projectList?.data || []}
        />
      )}
    </section>
  );
}

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectLayout,
});
