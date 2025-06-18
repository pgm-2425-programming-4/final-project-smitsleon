import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { fetchKanbanTasks } from "../../queries/fetch-kanban-tasks";
import { fetchTaskStates } from "../../queries/fetch-task-states";
import { fetchProjects } from "../../queries/fetch-projects";
import { fetchLabels } from "../../queries/fetch-labels";
import EditTaskForm from "../EditTaskForm";
import KanbanFilters from "./KanbanFilters";
import KanbanCard from "./KanbanCard";

function KanbanColumn({ status, tasks, onTaskClick }) {
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

export function KanbanBoard({ selectedProject }) {
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);

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

  // Fetch projects for the edit form
  const { data: projectList } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  // Fetch labels for filtering
  const { data: labelsList } = useQuery({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });

  const handleTaskClick = (task) => {
    setEditingTask(task);
  };

  const handleCloseEdit = () => {
    setEditingTask(null);
  };

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    if (!kanbanTasks?.data) return [];
    return kanbanTasks.data.filter((task) => {
      // Handle search term matching
      const titleText = task.title?.toLowerCase() || "";

      // Handle description text extraction (both text and blocks format)
      let descriptionText = "";
      if (task.description) {
        if (Array.isArray(task.description)) {
          // Handle blocks format
          descriptionText = task.description
            .map((block) =>
              block?.children?.map((child) => child?.text).join(""),
            )
            .join(" ")
            .toLowerCase();
        } else {
          // Handle text format
          descriptionText = task.description.toLowerCase();
        }
      }

      const matchesSearchTerm =
        !searchTerm ||
        titleText.includes(searchTerm.toLowerCase()) ||
        descriptionText.includes(searchTerm.toLowerCase());
      const matchesLabelFilter =
        selectedLabels.length === 0 ||
        (task.labels &&
          task.labels.some((label) =>
            selectedLabels.includes(label.documentId),
          ));

      return matchesSearchTerm && matchesLabelFilter;
    });
  }, [kanbanTasks?.data, searchTerm, selectedLabels]);

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

  // Group tasks by status
  const tasksByStatus = {};

  // Initialize all statuses with empty arrays
  if (taskStates && Array.isArray(taskStates)) {
    taskStates.forEach((status) => {
      if (status && status.id) {
        tasksByStatus[status.id] = [];
      }
    });
  } // Group tasks by their status with comprehensive error handling
  if (filteredTasks && Array.isArray(filteredTasks)) {
    filteredTasks.forEach((task) => {
      // Add comprehensive safety checks for the task structure
      if (!task) {
        return;
      }

      // Now safely access task_status (direct on task, not task.attributes)
      const taskStatus = task.task_status;
      if (!taskStatus) {
        return;
      }

      const statusId = taskStatus.id;

      if (statusId && tasksByStatus[statusId]) {
        tasksByStatus[statusId].push(task);
      }
    });
  }
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
            .filter((status) => status.name !== "Backlog") // Exclude Backlog status
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
