import Task from "../../models/Task.js"; // <-- import your Mongoose Task model
// Dashboard controller
export const getDashboard = async (req, res) => {
    try {
        // Ensure user is attached by authMiddleware
        const user = req.user;
        if (!user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = user.id;
        // Query tasks
        const assigned = await Task.find({ assignedTo: userId });
        const created = await Task.find({ createdBy: userId });
        const overdue = await Task.find({ dueDate: { $lt: new Date() }, assignedTo: userId });
        res.json({ assigned, created, overdue });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching dashboard tasks" });
    }
};
