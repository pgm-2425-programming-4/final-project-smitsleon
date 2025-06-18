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

export async function deleteTask(documentId) {
  try {
    const response = await fetch(`${API_URL}/tasks/${documentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      // Only try to parse JSON for error responses
      let errorMessage = "Unknown error";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorMessage;
      } catch {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(
        `Failed to delete task: ${response.status} - ${errorMessage}`,
      );
    }

    // For successful DELETE, don't try to parse JSON if response is empty
    // Strapi often returns 200 with empty body for DELETE operations
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const text = await response.text();
      return text ? JSON.parse(text) : { success: true };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}
