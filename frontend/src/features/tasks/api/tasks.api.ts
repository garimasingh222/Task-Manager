import api from "../../../app/lib/axios";

export interface Task {
  id: string;
  title: string;
  description: string;
}

interface GetTasksResponse {
  tasks: Task[];
}

// ✅ Get all tasks
export const getTasks = async (token: string): Promise<GetTasksResponse> => {
  const res = await api.get<GetTasksResponse>("/api/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Create a new task
export const createTask = async (
  task: { title: string; description: string },
  token: string
): Promise<Task> => {
  const res = await api.post<Task>("/api/tasks", task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Update a task
export const updateTask = async (
  id: string,
  task: { title: string; description: string },
  token: string
): Promise<Task> => {
  const res = await api.put<Task>(`/api/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Delete a task
export const deleteTask = async (id: string, token: string): Promise<void> => {
  await api.delete(`/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};