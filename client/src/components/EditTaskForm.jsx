import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask, deleteTask } from "../queries/task-operator";
import { fetchTaskStates } from "../queries/fetch-task-states";
import { fetchLabels } from "../queries/fetch-labels";

export default function EditTaskForm({ task, onClose, projects }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedProject, setSelectedProject] = useState(
    task?.project?.documentId || "",
  );
  const [selectedStatus, setSelectedStatus] = useState(
    task?.task_status?.documentId || "",
  );
  const [selectedLabels, setSelectedLabels] = useState([]);

  const queryClient = useQueryClient();

  // Initialize form with task data
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");

      if (task.dueDate) {
        const date = new Date(task.dueDate);
        setDueDate(date.toISOString().slice(0, 16));
      }

      // Handle project
      setSelectedProject(task.project?.documentId || "");

      // Handle status
      setSelectedStatus(task.task_status?.documentId || "");

      // Handle labels
      if (task.labels && Array.isArray(task.labels)) {
        setSelectedLabels(task.labels.map((label) => label.documentId));
      }
    }
  }, [task]);

  // Fetch task states
  const { data: taskStates } = useQuery({
    queryKey: ["taskStates"],
    queryFn: fetchTaskStates,
  });

  // Fetch labels
  const { data: labelsData } = useQuery({
    queryKey: ["labels"],
    queryFn: fetchLabels,
  });

  const labels = labelsData?.data || [];

  const updateTaskMutation = useMutation({
    mutationFn: ({ documentId, taskData }) => updateTask(documentId, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanbanTasks"] });
      queryClient.invalidateQueries({ queryKey: ["backlogTasks"] });

      onClose();
    },
    onError: (error) => {
      alert(
        "an error occured while deleting the task " +
          error.message,
      );
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (documentId) => deleteTask(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kanbanTasks"] });
      queryClient.invalidateQueries({ queryKey: ["backlogTasks"] });

      onClose();
    },
    onError: (error) => {
      alert(
        "An error occured while deleting the task: " +
          error.message,
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Titel is verplicht");
      return;
    }

    if (!selectedProject) {
      alert("Selecteer een project");
      return;
    }

    if (!selectedStatus) {
      alert("Selecteer een status");
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim() || null,
      dueDate: dueDate || null,
      project: selectedProject,
      task_status: selectedStatus,
      labels: selectedLabels.length > 0 ? selectedLabels : null,
    };

    updateTaskMutation.mutate({
      documentId: task.documentId,
      taskData,
    });
  };

  if (!task) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Edit task</h2>
          <button className="modal__close" onClick={onClose} type="button">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title" className="form-label">
              Titel *
            </label>
            <input
              type="text"
              id="edit-title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Voer een titel in..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description" className="form-label">
              Description
            </label>
            <textarea
              id="edit-description"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a description..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-project" className="form-label">
              Project *
            </label>
            <select
              id="edit-project"
              className="form-select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              required
            >
              <option value="">Selecteer een project</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.documentId}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-status" className="form-label">
              Status *
            </label>
            <select
              id="edit-status"
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              <option value="">Selecteer een status</option>
              {taskStates?.map((status) => (
                <option key={status.id} value={status.documentId}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Labels</label>
            <div className="labels-grid">
              {labels?.map((label) => (
                <label key={label.id} className="label-checkbox">
                  <input
                    type="checkbox"
                    value={label.documentId}
                    checked={selectedLabels.includes(label.documentId)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLabels([
                          ...selectedLabels,
                          label.documentId,
                        ]);
                      } else {
                        setSelectedLabels(
                          selectedLabels.filter(
                            (id) => id !== label.documentId,
                          ),
                        );
                      }
                    }}
                  />
                  <span className="label-text">{label.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-dueDate" className="form-label">
              Due date
            </label>
            <input
              type="datetime-local"
              id="edit-dueDate"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="button button--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button button--primary"
              disabled={updateTaskMutation.isPending}
            >
              {updateTaskMutation.isPending ? "Pending..." : "Editing task"}
            </button>
          </div>
        </form>

        <div className="modal__footer">
          <button
            className="button button--danger"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this task?",
                )
              ) {
                deleteTaskMutation.mutate(task.documentId);
              }
            }}
            disabled={deleteTaskMutation.isPending}
          >
            {deleteTaskMutation.isPending
              ? "Deleting..."
              : "Delete task"}
          </button>
        </div>
      </div>
    </div>
  );
}
