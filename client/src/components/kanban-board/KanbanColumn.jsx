import KanbanCard from "./KanbanCard";

export default function KanbanColumn({ status, tasks, onTaskClick }) {
  // Safety check
  if (!status) {
    return null;
  }

  return (
    <div className="kanban-column">
      <div className="kanban-column__header">
        <h3 className="kanban-column__title">{status.name}</h3>
      </div>
      <div className="kanban-tasks">
        {tasks.length === 0 ? (
          <div className="kanban-placeholder">
            <p>Geen taken in deze status</p>
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onTaskClick={onTaskClick} />
          ))
        )}
      </div>
    </div>
  );
}
