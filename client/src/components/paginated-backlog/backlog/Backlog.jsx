export function BacklogList({ backlogTasks, onTaskClick }) {
  const taskCount = backlogTasks?.length || 0;
  
  return (
    <div className="backlog-list">
      <div className="backlog-header">
        <h2>Backlog Tasks</h2>
        <span className="backlog-count">
          {taskCount} {taskCount === 1 ? 'item' : 'items'}
        </span>
      </div>
      <ul className="task-list">
        {backlogTasks.map((backlogTask) => (
          <li
            key={backlogTask.id}
            className="task-item task-item--clickable"
            onClick={() => onTaskClick(backlogTask)}
          >
            <div className="task-item__title">{backlogTask.title}</div>
            {backlogTask.description && (
              <div className="task-item__description">
                {Array.isArray(backlogTask.description)
                  ? backlogTask.description
                      .map((block) =>
                        block?.children?.map((child) => child?.text).join(""),
                      )
                      .join(" ")
                  : backlogTask.description}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
