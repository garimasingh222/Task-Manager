// src/app/hooks/useTasks.ts
import { useQuery } from "@tanstack/react-query"
import { fetchTasks } from "../../features/tasks/api/tasks.api"
import type { Task } from "../lib/typing"

interface DashboardData {
  assigned: Task[]
  created: Task[]
  overdue: Task[]
}

export function useTasks() {
  return useQuery<DashboardData>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  })
}