import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="page-container">
      <h1 className="page-title">Over dit Project</h1>

      <div className="about-content">
        <section className="project-info">
          <h2>Task Manager</h2>
          <p>
            Dit is een moderne task management applicatie gebouwd met React en
            TanStack Router. Het project biedt een intuïtieve interface voor het
            beheren van projecten, taken en backlogs. Gebruikers kunnen
            eenvoudig navigeren tussen verschillende projecten, taken
            organiseren in backlogs, en de voortgang van hun werk bijhouden via
            een overzichtelijk taakbord.
          </p>

          <div className="tech-stack">
            <h3>Technologieën</h3>
            <ul>
              <li>React 19</li>
              <li>TanStack Router</li>
              <li>TanStack Query</li>
              <li>Strapi CMS (Backend)</li>
              <li>Vite (Build Tool)</li>
            </ul>
          </div>
        </section>

        <section className="contact-info">
          <h2>Contact</h2>
          <div className="contact-card">
            <h3>Leon Smits</h3>
            <p>
              <strong>Email:</strong> leon.smits@student.arteveldehs.be
            </p>
            <p>
              <strong>Opleiding:</strong> Graduaat Programmeren
            </p>
            <p>
              <strong>Instelling:</strong> Artevelde Hogeschool
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/smitsleon"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/smitsleon
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
