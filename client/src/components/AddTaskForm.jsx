import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../queries/task-operator";
import { fetchTaskStates } from "../queries/fetch-task-states";
import { fetchLabels } from "../queries/fetch-labels";

export default function AddTaskForm({ onClose, currentProjectId, projects }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedProject, setSelectedProject] = useState(
    currentProjectId || "",
  );
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);

  const queryClient = useQueryClient();

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

  // Mutation for creating tasks
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["kanbanTasks"] });
      queryClient.invalidateQueries({ queryKey: ["backlogTasks"] });

      // Reset form and close modal
      setTitle("");
      setDescription("");
      setDueDate("");
      setSelectedStatus("");
      setSelectedLabels([]);
      onClose();
    },
    onError: (error) => {
      console.error("Error creating task:", error);
      alert(
        "Er is een fout opgetreden bij het aanmaken van de taak: " +
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

    // Find default status (Backlog) if no status selected
    const defaultStatus = taskStates?.find(
      (status) => status.name === "Backlog",
    );
    const statusToUse = selectedStatus || defaultStatus?.documentId;

    if (!statusToUse) {
      alert("Geen geldige status gevonden");
      return;
    }

    // Prepare task data for Strapi v5
    const taskData = {
      title: title.trim(),
      description: description.trim() || null,
      dueDate: dueDate || null,
      project: selectedProject,
      task_status: statusToUse,
      labels: selectedLabels.length > 0 ? selectedLabels : null,
    };

    createTaskMutation.mutate(taskData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Nieuwe Taak Toevoegen</h2>
          <button className="modal__close" onClick={onClose} type="button">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Titel *
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Voer een titel in..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Beschrijving
            </label>
            <textarea
              id="description"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Voer een beschrijving in..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="project" className="form-label">
              Project *
            </label>
            <select
              id="project"
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
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Standaard (Backlog)</option>
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
            <label htmlFor="dueDate" className="form-label">
              Vervaldatum
            </label>
            <input
              type="datetime-local"
              id="dueDate"
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
              Annuleren
            </button>
            <button
              type="submit"
              className="button button--primary"
              disabled={createTaskMutation.isPending}
            >
              {createTaskMutation.isPending ? "Bezig..." : "Taak Toevoegen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
