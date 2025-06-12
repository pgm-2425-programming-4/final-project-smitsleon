import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../../queries/fetch-projects";
import { PaginatedBackLog } from "../../../components/paginated-backlog/paginated-backlog";
import AddTaskForm from "../../../components/AddTaskForm";
import { useState, useEffect, useRef } from "react";

function ProjectDetailComponent() {
  const { projectId } = Route.useParams();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("backlog");

  // Element refs for the view sections
  const backlogRef = useRef(null);
  const kanbanRef = useRef(null);

  // Convert projectId to number for API calls
  const numericProjectId = parseInt(projectId, 10);

  // Fetch the projects data to find the project
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  // Find the project from the projects list
  const project = projectsData?.data?.find(
    (project) => project.id === numericProjectId,
  );

  // Handle both formats: project.attributes.name and project.name
  const projectName =
    project?.attributes?.name || project?.name || "Loading...";

  // Toggle between backlog and kanban views
  const toggleView = (view) => {
    setActiveView(view);
  };

  // Update the view visibility when activeView changes
  useEffect(() => {
    if (backlogRef.current && kanbanRef.current) {
      if (activeView === "backlog") {
        backlogRef.current.style.display = "block";
        kanbanRef.current.style.display = "none";
      } else {
        backlogRef.current.style.display = "none";
        kanbanRef.current.style.display = "block";
      }
    }
  }, [activeView]);

  const handleAddTaskClick = () => {
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
  };

  if (!project && projectsData?.data) {
    return (
      <div className="project-not-found">
        <header className="header">
          <div className="header__project">
            <h1 className="header__title">Project Not Found</h1>
            <span className="header__subtitle">
              The requested project could not be found
            </span>
          </div>
        </header>
      </div>
    );
  }

  return (
    <>
      <header className="header">
        <div className="header__project">
          <h1 className="header__title">{projectName}</h1>
        </div>
        <div className="header__actions">
          <div className="header__view-toggle">
            <button
              className={`view-toggle__button ${activeView === "backlog" ? "view-toggle__button--active" : ""}`}
              onClick={() => toggleView("backlog")}
              data-view="backlog"
            >
              Backlog
            </button>
            <button
              className={`view-toggle__button ${activeView === "kanban" ? "view-toggle__button--active" : ""}`}
              onClick={() => toggleView("kanban")}
              data-view="kanban"
            >
              Kanban
            </button>
          </div>
          <button
            className="button button--primary"
            onClick={handleAddTaskClick}
            disabled={!project}
          >
            Add Task
          </button>
        </div>
      </header>

      {/* Backlog View */}
      <div
        ref={backlogRef}
        style={{ display: activeView === "backlog" ? "block" : "none" }}
      >
        <PaginatedBackLog selectedProject={numericProjectId} />
      </div>

      {/* Kanban View */}
      <div
        ref={kanbanRef}
        style={{ display: activeView === "kanban" ? "block" : "none" }}
      >
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Kanban View</h2>
          <p>Kanban functionaliteit komt binnenkort beschikbaar.</p>
        </div>
      </div>

      {isTaskModalOpen && (
        <AddTaskForm
          onClose={handleCloseModal}
          currentProjectId={numericProjectId}
          projects={projectsData?.data || []}
        />
      )}
    </>
  );
}

export const Route = createFileRoute("/projects/$projectId/")({
  component: ProjectDetailComponent,
});
