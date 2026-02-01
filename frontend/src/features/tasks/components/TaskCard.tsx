import type { Task } from "../../../app/lib/typing";

export function TaskCard({ task }: { task: Task }) {
  return (
    <div className="border rounded p-4 bg-white">
      <h3 className="font-medium">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>

      {/* ✅ Handle optional dueDate safely */}
      <p className="text-xs text-gray-500">
        Due: {task.dueDate ? new Date(task.dueDate).toLocaleString() : "No due date"}
      </p>

      <p className="text-xs">
        Priority: {task.priority} • Status: {task.status}
      </p>
    </div>
  );
}