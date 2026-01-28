import { useEffect, useState } from "react";
import { useAuth } from "../../../app/hooks/useAuth";
import { getTasks, createTask } from "../api/tasks.api";
import type { Task } from "../api/tasks.api";

export default function DashboardPage() {
  const { token, user, logout } = useAuth(); // ✅ now includes user + logout
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // ✅ Fetch tasks when token is available
  useEffect(() => {
    if (token) {
      setLoading(true);
      getTasks(token)
        .then((data) => setTasks(data.tasks))
        .catch(() => setMessage("❌ Failed to fetch tasks"))
        .finally(() => setLoading(false));
    }
  }, [token]);

  // ✅ Handle task creation
  const handleCreate = async () => {
    if (!token) return;
    if (!title.trim()) {
      setMessage("⚠️ Title is required");
      return;
    }

    setLoading(true);
    try {
      const newTask = await createTask({ title, description }, token);
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
      setDescription("");
      setMessage("✅ Task added successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* ✅ Show logged-in user info */}
      {user && (
        <div className="mb-4">
          <p className="text-gray-700">
            Welcome, <span className="font-semibold">{user.name}</span> ({user.email})
          </p>
          {user.picture && (
            <img
              src={user.picture}
              alt="Profile"
              className="w-12 h-12 rounded-full mt-2"
            />
          )}
        </div>
      )}

      {/* ✅ Logout button */}
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600"
      >
        Logout
      </button>

      {/* ✅ Feedback message */}
      {message && (
        <div className="mb-4 p-2 rounded bg-gray-100 text-sm">{message}</div>
      )}

      {/* ✅ Loading indicator */}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* ✅ Task list */}
      <ul className="mb-4">
        {tasks.map((task) => (
          <li key={task.id} className="border-b py-2">
            <span className="font-semibold">{task.title}</span> – {task.description}
          </li>
        ))}
      </ul>

      {/* ✅ Task input form */}
      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 rounded flex-1"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}