import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../features/tasks/api/tasks.api";
import type { Task } from "../../features/tasks/api/tasks.api";

// Matches API response
interface GetTasksResponse {
  tasks: Task[];
}

export function useTasks(token: string) {
  return useQuery<GetTasksResponse>({
    queryKey: ["tasks"],
    queryFn: () => getTasks(token), // ✅ aligned with tasks.api.ts
  });
}