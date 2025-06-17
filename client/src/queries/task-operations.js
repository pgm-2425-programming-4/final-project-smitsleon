// Task operations for Strapi v5
import { API_TOKEN, API_URL } from "../constants/constants";

export async function createTask(taskData) {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: taskData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create task: ${response.status} - ${errorData.error?.message || "Unknown error"}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

export async function updateTask(documentId, taskData) {
  try {
    const response = await fetch(`${API_URL}/tasks/${documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: taskData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to update task: ${response.status} - ${errorData.error?.message || "Unknown error"}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}
