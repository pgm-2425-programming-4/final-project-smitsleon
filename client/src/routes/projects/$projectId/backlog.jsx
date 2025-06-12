import { createFileRoute } from "@tanstack/react-router";
import { PaginatedBackLog } from "../../../components/paginated-backlog/paginated-backlog";

function ProjectBacklogView() {
  const { projectId } = Route.useParams();

  return <PaginatedBackLog selectedProject={parseInt(projectId)} />;
}

export const Route = createFileRoute("/projects/$projectId/backlog")({
  component: ProjectBacklogView,
});
