import api from "../../../app/lib/axios"

export const getDashboardTasks = async () => {
  const res = await api.get("/tasks/dashboard")
  return res.data
}

export const register = async (username: string, email: string, password: string) => {
  const res = await api.post("/auth/register", { username, email, password })
  return res.data
}
