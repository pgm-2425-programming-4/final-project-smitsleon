import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchPaginatedTasks(pageSize, pageNumber, projectId = null) {
  let url = `${API_URL}/tasks?populate=task_status&populate=project&populate=labels&filters[task_status][name][$eq]=Backlog&pagination[pageSize]=${pageSize}&pagination[page]=${pageNumber}`;
  
  if (projectId) {
    url += `&filters[project][id][$eq]=${projectId}`;
  }

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  return data;
}