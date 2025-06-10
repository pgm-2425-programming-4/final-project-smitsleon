import { useState } from "react";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement task creation
    console.log("Creating task:", { title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="add-task-form">
      <h2>Nieuwe Taak Toevoegen</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titel:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Voer een titel in..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Beschrijving:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Voer een beschrijving in..."
            rows={4}
          />
        </div>
        <button type="submit" className="submit-button">
          Taak Toevoegen
        </button>
      </form>
    </div>
  );
}
