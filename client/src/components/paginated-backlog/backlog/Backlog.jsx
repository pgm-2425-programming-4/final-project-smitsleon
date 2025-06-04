import "./Backlog.css";

export function BacklogTaskList({ backlogTasks }) {
  return (
    <div className="backlog-list">
      <h2>Backlog Tasks</h2>
      <ul className="task-list">
        {backlogTasks.map((backlogTask) => (
          <li key={backlogTask.id} className="task-item">
            {backlogTask.title}
          </li>
        ))}
      </ul>
    </div>
  );
}