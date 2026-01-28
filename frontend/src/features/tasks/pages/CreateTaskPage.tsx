import { useState } from "react"
import api from "../../../app/lib/axios"
import { useNavigate } from "react-router-dom"

export default function CreateTaskPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post("/tasks", { title, description, dueDate, assignedTo })
      navigate("/dashboard") // redirect after creating task
    } catch (err: unknown) {
      setError("Error creating task")
      if (err instanceof Error) console.error(err.message)
    }
  }

  return (
    <div className="create-task">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assign to (User ID)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
        <button type="submit">Create Task</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}