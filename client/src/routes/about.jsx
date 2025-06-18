import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1 className="about-title">About This Project</h1>
      </div>

      <div className="about-content">
        <section className="about-section">
          <p className="project-description">
            This task management application was developed as part of the
            Programming Graduate program at Arteveldehogeschool. The project
            demonstrates modern web development techniques by implementing a
            fully functional kanban board and backlog system. The application
            provides an intuitive interface for project management, where users
            can create, edit, and organize tasks across different projects. With
            real-time data synchronization, it offers a professional experience
            for task management.
          </p>
        </section>

        <section className="about-section contact-section">
          <h2 className="section-title">Contact</h2>
          <div className="contact-card">
            <div className="contact-info">
              <h3 className="contact-name">Leon Smits</h3>
              <p className="contact-role">Programming Graduate Student</p>
              <p className="contact-school">Arteveldehogeschool - Ghent</p>

              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <a
                    href="mailto:leonsmi@student.arteveldehs.be"
                    className="contact-link"
                  >
                    leonsmi@student.arteveldehs.be
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
