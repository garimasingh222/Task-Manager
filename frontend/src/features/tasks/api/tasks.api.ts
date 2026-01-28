import api from "../../../app/lib/axios";

export interface Task {
  id: string;
  title: string;
  description: string;
}

interface GetTasksResponse {
  tasks: Task[];
}

export const getTasks = async (token: string): Promise<GetTasksResponse> => {
  const res = await api.get<GetTasksResponse>("/api/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTask = async (
  task: { title: string; description: string },
  token: string
): Promise<Task> => {
  const res = await api.post<Task>("/api/tasks", task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};