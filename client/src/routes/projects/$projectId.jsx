import {
  createFileRoute,
  Outlet,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProjects } from "../../queries/fetch-projects";
import AddTaskForm from "../../components/AddTaskForm";

function ProjectLayout() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { data: projectList } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  const deleteProjectMutation = useMutation({
    mutationFn: async (projectId) => {
      console.log("Attempting to delete project with ID:", projectId);
      console.log("Full project object:", project);

      // Try to use the documentId if available, otherwise use id
      const deleteId = project?.documentId || project?.id || projectId;
      console.log("Using delete ID:", deleteId);

      const response = await fetch(
        `http://localhost:1337/api/projects/${deleteId}`,
        {
          method: "DELETE",
        },
      );

      console.log("Delete response status:", response.status);
      console.log(
        "Delete response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete project: ${response.status} ${response.statusText}`,
        );
      }

      // Check if response has content before trying to parse JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      }

      // Return empty object if no JSON content
      return {};
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate({ to: "/" }); // Redirect to home after deletion
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    },
  });
  const handleDeleteProject = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${projectName}"? This action cannot be undone.`,
      )
    ) {
      deleteProjectMutation.mutate(projectId);
    }
  };

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
        </div>{" "}
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
          <div className="header__buttons">
            <button
              className="button button--primary"
              onClick={() => setShowModal(true)}
              disabled={!project}
            >
              Taak toevoegen
            </button>
            <button
              className="button button--danger"
              onClick={handleDeleteProject}
              disabled={!project || deleteProjectMutation.isPending}
              title="Project verwijderen"
            >
              {deleteProjectMutation.isPending
                ? "Verwijderen..."
                : "Verwijder project"}
            </button>
          </div>
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
