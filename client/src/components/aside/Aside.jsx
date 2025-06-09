import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../queries/fetch-projects";
import "./Aside.css";

export function ProjectAside({ selectedProject, onProjectChange }) {
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
        <h3>Projects</h3>
        <div className="loading">Loading projects...</div>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className="project-aside">
        <h3>Projects</h3>
        <div className="error">Error: {error.message}</div>
      </aside>
    );
  }

  const projects = projectsData?.data || [];

  return (
    <aside className="project-aside">
      <h3>Projects</h3>
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
    </aside>
  );
}