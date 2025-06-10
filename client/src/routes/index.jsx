import { createFileRoute } from "@tanstack/react-router";
import AddTaskForm from "../components/AddTaskForm";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="page-container">
      <div className="welcome-content">
        <h1 className="page-title">Welkom bij Task Manager</h1>
        <p>
          Beheer je projecten en taken op een eenvoudige en efficiënte manier.
          Organiseer je backlog, volg de voortgang van je taken en werk samen
          met je team.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <h3>📋 Project Management</h3>
          <p>
            Organiseer je werk in duidelijke projecten en behoud overzicht over
            alle taken.
          </p>
        </div>
        <div className="feature-card">
          <h3>📝 Backlog Beheer</h3>
          <p>
            Beheer je product backlog met gepagineerde weergaven en filtering
            opties.
          </p>
        </div>
        <div className="feature-card">
          <h3>🎯 Taakbord</h3>
          <p>
            Visualiseer je workflow met een overzichtelijk taakbord per project.
          </p>
        </div>
      </div>

      <AddTaskForm />
    </div>
  );
}
