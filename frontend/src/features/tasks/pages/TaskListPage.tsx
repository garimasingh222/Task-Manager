import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks.api";
import type { Task } from "../api/tasks.api";

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    getTasks(token)
      .then((res) => setTasks(res.tasks))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [token]);

  return (
    <div>
      <h1>My Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} — {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
}