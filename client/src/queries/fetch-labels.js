import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchLabels() {
  const result = await fetch(`${API_URL}/labels`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  return data;
}
