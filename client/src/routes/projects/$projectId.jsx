import { createFileRoute, Outlet } from "@tanstack/react-router";

function ProjectMainOutlet() {
  return <Outlet />;
}

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectMainOutlet,
});

