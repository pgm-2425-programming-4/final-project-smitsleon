import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchTaskStates() {
  const result = await fetch(`${API_URL}/statuses`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();

  const taskStatesArray = data.data;
  return taskStatesArray;
}
