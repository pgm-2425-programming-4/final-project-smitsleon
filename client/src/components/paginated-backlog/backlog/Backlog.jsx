function Backlog({ tasks, isLoading, error }) {
  if (isLoading) return <p>Loading tasks...</p>;
  
  if (error) return <p>Error loading tasks: {error.message}</p>;
  
  if (!tasks?.length) return <p>No backlog tasks found</p>;
  
  return (
    <table className="backlog-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.title || 'No title'}</td>
            <td>
              {!task.description
                ? '-'
                : typeof task.description === 'string'
                  ? (task.description.length > 50 
                     ? `${task.description.substring(0, 50)}...` 
                     : task.description)
                  : '-'}
            </td>
            <td>
              {task.dueDate 
                ? new Date(task.dueDate).toLocaleDateString() 
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Backlog;