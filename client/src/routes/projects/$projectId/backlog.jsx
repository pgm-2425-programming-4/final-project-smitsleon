import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBackLog } from "../../../components/paginated-backlog/paginated-backlog";

export const Route = createFileRoute("/projects/$projectId/backlog")({
  component: ProjectBacklog,
});

function ProjectBacklog() {
  const { projectId } = Route.useParams();

  return (
    <div className="project-backlog-container">
      <PaginatedBackLog selectedProject={parseInt(projectId)} />
    </div>
  );
}
