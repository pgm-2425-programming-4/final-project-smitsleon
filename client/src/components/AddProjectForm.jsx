import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../constants/constants";

export function AddProjectForm({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: async (projectData) => {
      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: projectData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      onSuccess?.();
      onClose();
    },
    onError: (error) => {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Project name is required");
      return;
    }
    setIsSubmitting(true);
    try {
      await createProjectMutation.mutateAsync({
        name: name.trim(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Add New Project</h2>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              htmlFor="projectName"
              className="form-label form-label--required"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name..."
              required
              disabled={isSubmitting}
            />{" "}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="button button--secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button button--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
