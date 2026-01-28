export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Status = "To Do" | "In Progress" | "Review" | "Completed";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status?: "pending" | "in-progress" | "completed";
  assignedTo?: string;
  createdBy?: string;
  priority?: Priority;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role?: "admin" | "member";
  createdAt?: string;
}

