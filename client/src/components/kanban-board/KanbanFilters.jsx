export default function KanbanFilters({
  searchTerm,
  setSearchTerm,
  selectedLabels,
  setSelectedLabels,
  labels,
}) {
  const handleLabelToggle = (labelId) => {
    setSelectedLabels((prev) =>
      prev.includes(labelId)
        ? prev.filter((id) => id !== labelId)
        : [...prev, labelId],
    );
  };

  return (
    <div className="kanban-filters">
      <div className="kanban-filters__search">
        <input
          type="text"
          placeholder="seach tasks by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="kanban-search-input"
        />
      </div>
      <div className="kanban-filters__labels">
        <div className="kanban-label-filters">
          {labels?.map((label) => (
            <button
              key={label.id}
              onClick={() => handleLabelToggle(label.documentId)}
              className={`kanban-label-filter ${
                selectedLabels.includes(label.documentId) ? "active" : ""
              }`}
            >
              {label.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
