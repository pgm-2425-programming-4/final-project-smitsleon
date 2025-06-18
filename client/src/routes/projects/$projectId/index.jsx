import { createFileRoute } from "@tanstack/react-router";
import { KanbanBoard } from "../../../components/kanban-board/KanbanBoard";

// Kanban view for a specific project
function KanbanView() {
  const { projectId } = Route.useParams();

  return <KanbanBoard selectedProject={parseInt(projectId)} />;
}

export const Route = createFileRoute("/projects/$projectId/")({
  component: KanbanView,
});
