import { createFileRoute } from "@tanstack/react-router";
import AddTaskForm from "../components/AddTaskForm";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="page-container">
      <h1 className="page-title">Welcome to Task Manager</h1>
      <AddTaskForm />
    </div>
  );
}