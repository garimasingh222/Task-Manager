import Task from "../models/Task.js"; // ✅ ensure filename is Task.ts, compiled to Task.js
// ✅ Get all tasks for logged-in user
export const getTasks = async (req, res) => {
    try {
        const userId = req.user.id; // from JWT
        const tasks = await Task.find({ user: userId });
        res.json({ tasks });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};
// ✅ Create a new task
export const createTask = async (req, res) => {
    try {
        const userId = req.user.id; // from JWT
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const newTask = new Task({
            title,
            description,
            user: userId, // 👈 required field
        });
        await newTask.save();
        res.json(newTask); // return saved task
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create task" });
    }
};
// ✅ Update a task
export const updateTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedTask = await Task.findOneAndUpdate({ _id: id, user: userId }, { title, description }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(updatedTask);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update task" });
    }
};
// ✅ Delete a task
export const deleteTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const deletedTask = await Task.findOneAndDelete({ _id: id, user: userId });
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(deletedTask);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete task" });
    }
};
