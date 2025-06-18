import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchKanbanTasks(projectId) {
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  const url = `${API_URL}/tasks?populate=task_status&populate=project&populate=labels&filters[project][id][$eq]=${projectId}&pagination[pageSize]=100`;

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!result.ok) {
    throw new Error(`Failed to fetch kanban tasks: ${result.statusText}`);
  }

  const data = await result.json();
  return data;
}
