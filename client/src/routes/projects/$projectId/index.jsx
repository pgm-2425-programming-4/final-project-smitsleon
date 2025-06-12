import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../../queries/fetch-projects";
import { PaginatedBackLog } from "../../../components/paginated-backlog/paginated-backlog";
import AddTaskForm from "../../../components/AddTaskForm";
import { useState, useRef, useEffect } from "react";

function ProjectOverview() {
  const { projectId } = Route.useParams();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("backlog");
  const backlogSection = useRef(null);
  const kanbanSection = useRef(null);
  const idAsNumber = Number(projectId);

  const { data: allProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const foundProject = allProjects?.data?.find((prj) => prj.id === idAsNumber);
  const naam =
    foundProject?.attributes?.name || foundProject?.name || "Laden...";

  const switchTab = (tab) => setCurrentTab(tab);

  useEffect(() => {
    if (backlogSection.current && kanbanSection.current) {
      backlogSection.current.style.display =
        currentTab === "backlog" ? "block" : "none";
      kanbanSection.current.style.display =
        currentTab === "kanban" ? "block" : "none";
    }
  }, [currentTab]);

  if (!foundProject && allProjects?.data) {
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
    <>
      <header className="header">
        <div className="header__project">
          <h1 className="header__title">{naam}</h1>
        </div>
        <div className="header__actions">
          <div className="header__view-toggle">
            <button
              className={`view-toggle__button${currentTab === "backlog" ? " view-toggle__button--active" : ""}`}
              onClick={() => switchTab("backlog")}
            >
              Backlog
            </button>
            <button
              className={`view-toggle__button${currentTab === "kanban" ? " view-toggle__button--active" : ""}`}
              onClick={() => switchTab("kanban")}
            >
              Kanban
            </button>
          </div>
          <button
            className="button button--primary"
            onClick={() => setShowTaskModal(true)}
            disabled={!foundProject}
          >
            Nieuwe taak
          </button>
        </div>
      </header>
      {/* Backlog */}
      <div
        ref={backlogSection}
        style={{ display: currentTab === "backlog" ? "block" : "none" }}
      >
        <PaginatedBackLog selectedProject={idAsNumber} />
      </div>
      {/* Kanban */}
      <div
        ref={kanbanSection}
        style={{ display: currentTab === "kanban" ? "block" : "none" }}
      >
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Kanban</h2>
          <p>Kanban-functionaliteit volgt binnenkort.</p>
        </div>
      </div>
      {showTaskModal && (
        <AddTaskForm
          onClose={() => setShowTaskModal(false)}
          currentProjectId={idAsNumber}
          projects={allProjects?.data || []}
        />
      )}
    </>
  );
}

export const Route = createFileRoute("/projects/$projectId/")({
  component: ProjectOverview,
});
