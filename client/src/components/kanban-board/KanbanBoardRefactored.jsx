import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { fetchKanbanTasks } from "../../queries/fetch-kanban-tasks";
import { fetchTaskStates } from "../../queries/fetch-task-states";
import { fetchProjects } from "../../queries/fetch-projects";
import { fetchLabels } from "../../queries/fetch-labels";
import EditTaskForm from "../EditTaskForm";
import KanbanFilters from "./KanbanFilters";
import KanbanColumn from "./KanbanColumn";
import { filterTasks, groupTasksByStatus } from "./kanbanUtils";

export function KanbanBoard({ selectedProject }) {
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);

  // Data queries
  const {
    data: kanbanTasks,
    isPending: tasksLoading,
    isError: tasksError,
    error: tasksErrorMessage,
  } = useQuery({
    queryKey: ["kanbanTasks", selectedProject],
    queryFn: () => fetchKanbanTasks(selectedProject),
    enabled: !!selectedProject,
  });

  const {
    data: taskStates,
    isPending: statesLoading,
    isError: statesError,
  } = useQuery({
    queryKey: ["taskStates"],
    queryFn: fetchTaskStates,
  });

  const { data: projectList } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const { data: labelsList } = useQuery({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });

  // Event handlers
  const handleTaskClick = (task) => {
    setEditingTask(task);
  };

  const handleCloseEdit = () => {
    setEditingTask(null);
  };

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    return filterTasks(kanbanTasks?.data, searchTerm, selectedLabels);
  }, [kanbanTasks?.data, searchTerm, selectedLabels]);

  // Loading and error states
  if (!selectedProject) {
    return (
      <div className="kanban-placeholder">
        <h3>Geen project geselecteerd</h3>
        <p>Selecteer een project om het kanban-board te bekijken.</p>
      </div>
    );
  }

  if (tasksLoading || statesLoading) {
    return (
      <div className="kanban-placeholder">
        <p>Loading kanban board...</p>
      </div>
    );
  }

  if (tasksError || statesError) {
    return (
      <div className="kanban-placeholder">
        <p>Error loading kanban board: {tasksErrorMessage?.message}</p>
      </div>
    );
  }

  // Group filtered tasks by status
  const tasksByStatus = groupTasksByStatus(filteredTasks, taskStates);

  return (
    <>
      <KanbanFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLabels={selectedLabels}
        setSelectedLabels={setSelectedLabels}
        labels={labelsList?.data}
      />

      <div className="kanban-board">
        {taskStates && Array.isArray(taskStates) ? (
          taskStates
            .filter((status) => status.name !== "Backlog")
            .map((status) => (
              <KanbanColumn
                key={status.id}
                status={status}
                tasks={tasksByStatus[status.id] || []}
                onTaskClick={handleTaskClick}
              />
            ))
        ) : (
          <div className="kanban-placeholder">
            <p>No task states available</p>
          </div>
        )}
      </div>

      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onClose={handleCloseEdit}
          projects={projectList?.data || []}
        />
      )}
    </>
  );
}
