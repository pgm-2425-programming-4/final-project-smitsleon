import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Over Dit Project</h1>
      <p>
        Dit is een taakbeheer applicatie gebouwd met React, TanStack Router en
        TanStack Query.
      </p>
      <h2>Features</h2>
      <ul>
        <li>✅ Projectbeheer</li>
        <li>✅ Taakbeheer met paginatie</li>
        <li>✅ Real-time data fetching</li>
        <li>✅ Responsive design</li>
        <li>✅ Modern routing</li>
      </ul>
      <h2>Technologieën</h2>
      <ul>
        <li>React 18</li>
        <li>TanStack Router</li>
        <li>TanStack Query</li>
        <li>Vite</li>
        <li>Strapi (Backend)</li>
      </ul>
    </div>
  );
}
