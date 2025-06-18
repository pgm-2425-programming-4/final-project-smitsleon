// Utility functions for kanban filtering

export function filterTasks(tasks, searchTerm, selectedLabels) {
  if (!tasks || !Array.isArray(tasks)) return [];

  return tasks.filter((task) => {
    // Handle search term matching
    const titleText = task.title?.toLowerCase() || "";

    // Handle description text extraction (both text and blocks format)
    let descriptionText = "";
    if (task.description) {
      if (Array.isArray(task.description)) {
        // Handle blocks format
        descriptionText = task.description
          .map((block) => block?.children?.map((child) => child?.text).join(""))
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
        task.labels.some((label) => selectedLabels.includes(label.documentId)));

    return matchesSearchTerm && matchesLabelFilter;
  });
}

export function groupTasksByStatus(tasks, taskStates) {
  const tasksByStatus = {};

  // Initialize all statuses with empty arrays
  if (taskStates && Array.isArray(taskStates)) {
    taskStates.forEach((status) => {
      if (status && status.id) {
        tasksByStatus[status.id] = [];
      }
    });
  }

  // Group tasks by their status with comprehensive error handling
  if (tasks && Array.isArray(tasks)) {
    tasks.forEach((task) => {
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

  return tasksByStatus;
}
