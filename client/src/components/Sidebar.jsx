import { Link, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../queries/fetch-projects";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const { isPending, data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const projects = projectsData?.data || [];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isProjectActive = (projectId) => {
    return location.pathname.includes(`/projects/${projectId}`);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Task Manager</h2>
      </div>

      <nav className="sidebar-nav">
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

        <div className="projects-section">
          <h3>Projecten</h3>
          {isPending ? (
            <div className="loading-text">Laden...</div>
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
      </nav>
    </aside>
  );
}
