import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../queries/fetch-projects";
import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { AddProjectForm } from "../AddProjectForm";

export function ProjectAside() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);

  const {
    isPending,
    isError,
    data: projectsData,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isPending) {
    return (
      <aside className="project-aside">
        <h3>Jammin</h3>
        <div className="loading">Loading...</div>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className="project-aside">
        <h3>Jammin</h3>
        <div className="error">Error: {error.message}</div>
      </aside>
    );
  }

  const projects = projectsData?.data || [];

  return (
    <aside className="project-aside">
      <h3>Jammin</h3>
      <nav className="project-nav">
        <ul className="project-list">
          <li>
            <Link
              to="/"
              className={`project-button ${currentPath === "/" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`project-button ${currentPath === "/about" ? "active" : ""}`}
            >
              About
            </Link>
          </li>{" "}
          <li className="divider">
            <span>Projects</span>
          </li>{" "}
          <li>
            <button
              className="project-button--add"
              onClick={() => setShowAddProjectForm(true)}
            >
              Add New Project
            </button>
          </li>{" "}
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id}>
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id.toString() }}
                  className={`project-button ${currentPath.startsWith(`/projects/${project.id}`) ? "active" : ""}`}
                >
                  {project.name}
                </Link>
              </li>
            ))
          ) : (
            <li>
              <div className="project-empty-state">No projects available</div>
            </li>
          )}{" "}
        </ul>
      </nav>

      {showAddProjectForm && (
        <AddProjectForm
          onClose={() => setShowAddProjectForm(false)}
          onSuccess={() => {
            // Project created successfully
          }}
        />
      )}
    </aside>
  );
}

export default ProjectAside;
