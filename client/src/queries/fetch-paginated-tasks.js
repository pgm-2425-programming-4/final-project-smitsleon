import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchPaginatedTasks(pageSize, pageNumber) {
  const result = await fetch(
    `${API_URL}/tasks?populate=task_status&populate=project&populate=labels&filters[task_status][name][$eq]=Backlog&pagination[pageSize]=${pageSize}&pagination[page]=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    },
  );
  const data = await result.json();
  return data;
}
