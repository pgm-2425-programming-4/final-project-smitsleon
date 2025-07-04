import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="page-container">
      <h1 className="page-title">Welcome to the Jammin Task Manager</h1>
    </div>
  );
}
