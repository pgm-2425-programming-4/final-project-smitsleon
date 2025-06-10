import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { fetchProjects } from "../../queries/fetch-projects";
import "./Aside.css";

export function ProjectAside({ selectedProject, onProjectChange }) {
  const location = useLocation();
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
        <div className="sidebar-header">
          <h2>Task Manager</h2>
        </div>
        <div className="loading">Loading projects...</div>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className="project-aside">
        <div className="sidebar-header">
          <h2>Task Manager</h2>
        </div>
        <div className="error">Error: {error.message}</div>
      </aside>
    );
  }
  const projects = projectsData?.data || [];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isProjectActive = (projectId) => {
    return location.pathname.includes(`/projects/${projectId}`);
  };

  return (
    <aside className="project-aside">
      <div className="sidebar-header">
        <h2>Task Manager</h2>
      </div>

      <nav className="main-nav">
        <ul className="nav-list">
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              🏠 Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
            >
              ℹ️ Over
            </Link>
          </li>
        </ul>
      </nav>

      <div className="projects-section">
        <h3>Projecten</h3>
        {onProjectChange ? (
          <nav className="project-nav">
            <ul className="project-list">
              <li>
                <button
                  className={`project-button ${selectedProject === null ? "active" : ""}`}
                  onClick={() => onProjectChange(null)}
                >
                  All Projects
                </button>
              </li>
              {projects.map((project) => (
                <li key={project.id}>
                  <button
                    className={`project-button ${selectedProject === project.id ? "active" : ""}`}
                    onClick={() => onProjectChange(project.id)}
                  >
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <ul className="projects-list">
            {projects.map((project) => (
              <li key={project.id}>
                <div className="project-item">
                  <Link
                    to={`/projects/${project.id}`}
                    className={`nav-link ${isProjectActive(project.id) ? "active" : ""}`}
                  >
                    📋 {project.name}
                  </Link>
                  <Link
                    to={`/projects/${project.id}/backlog`}
                    className={`nav-link sub-link ${location.pathname === `/projects/${project.id}/backlog` ? "active" : ""}`}
                  >
                    📝 Backlog
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
