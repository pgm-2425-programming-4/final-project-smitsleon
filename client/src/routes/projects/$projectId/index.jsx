import { createFileRoute } from "@tanstack/react-router";

// Placeholder for Kanban view content
function KanbanView() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Kanban</h2>
      <p>Kanban-functionaliteit volgt binnenkort.</p>
    </div>
  );
}

export const Route = createFileRoute("/projects/$projectId/")({
  component: KanbanView,
});
