import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchProjects() {
  const result = await fetch(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  return data;
}
