// Utility function to truncate long descriptions
function truncateText(text, maxLength = 80) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export default function KanbanCard({ task, onTaskClick }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Safety check
  if (!task) {
    return null;
  }

  return (
    <div
      className="kanban-task"
      onClick={() => onTaskClick(task)}
      style={{ cursor: "pointer" }}
    >
      <div className="kanban-task__title">{task.title || "Geen titel"}</div>
      {task.description && (
        <div
          className="kanban-task__description"
          title={
            Array.isArray(task.description)
              ? task.description
                  .map((block) =>
                    block?.children?.map((child) => child?.text).join(""),
                  )
                  .join(" ")
              : task.description
          }
        >
          {truncateText(
            Array.isArray(task.description)
              ? task.description
                  .map((block) =>
                    block?.children?.map((child) => child?.text).join(""),
                  )
                  .join(" ")
              : task.description,
            80,
          )}
        </div>
      )}
      <div className="kanban-task__meta">
        {task.dueDate && <span>Due: {formatDate(task.dueDate)}</span>}
        {task.labels?.length > 0 && (
          <div>
            {task.labels.map((label) => (
              <span
                key={label.id}
                style={{
                  marginLeft: "0.25rem",
                  fontSize: "0.7rem",
                  backgroundColor: "#e9ecef",
                  padding: "0.1rem 0.3rem",
                  borderRadius: "3px",
                }}
              >
                {label.name || "Geen naam"}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
