import { API_TOKEN, API_URL } from "../constants/constants";

export async function fetchPaginatedTasks(pageSize, pageNumber) {
    const result = await fetch(
        `${API_URL}/tasks?pagination[pageSize]=${pageSize}&pagination[page]=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        }
    );
    const data = await result.json();
    return data
}