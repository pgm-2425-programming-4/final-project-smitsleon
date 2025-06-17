import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../queries/fetch-projects";
import { Link, useLocation } from "@tanstack/react-router";

export function ProjectAside() {
  const location = useLocation();
  const currentPath = location.pathname;

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
        <h3>Navigation</h3>
        <div className="loading">Loading...</div>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className="project-aside">
        <h3>Navigation</h3>
        <div className="error">Error: {error.message}</div>
      </aside>
    );
  }

  const projects = projectsData?.data || [];

  return (
    <aside className="project-aside">
      <h3>Navigation</h3>
      <nav className="project-nav">
        <ul className="project-list">
          <li>
            <Link
              to="/"
              className={`project-button ${currentPath === "/" ? "active" : ""}`}
            >
              🏠 Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`project-button ${currentPath === "/about" ? "active" : ""}`}
            >
              ℹ️ About
            </Link>
          </li>{" "}
          <li className="divider">
            <span>Projects</span>
          </li>
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id}>
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id.toString() }}
                  className={`project-button ${currentPath.startsWith(`/projects/${project.id}`) ? "active" : ""}`}
                >
                  📁 {project.name}
                </Link>
              </li>
            ))
          ) : (
            <li>
              <div
                style={{
                  padding: "0.75rem 1rem",
                  color: "#6c757d",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                }}
              >
                Geen projecten beschikbaar
              </div>
            </li>
          )}{" "}
        </ul>
      </nav>
    </aside>
  );
}

export default ProjectAside;
