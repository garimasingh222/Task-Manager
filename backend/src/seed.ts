import bcrypt from "bcryptjs"
import { connectDB } from "./config/db"
import User from "./models/Users"
import Task from "./models/Task"

async function seed() {
  try {
    await connectDB()

    // Clear old data
    await User.deleteMany({})
    await Task.deleteMany({})

    // Create users
    const passwordHash = await bcrypt.hash("password123", 10)

    const user1 = await User.create({
      username: "Alice",
      email: "alice@example.com",
      password: passwordHash
    })

    const user2 = await User.create({
      username: "Bob",
      email: "bob@example.com",
      password: passwordHash
    })

    // Create tasks
    await Task.insertMany([
      {
        title: "Finish Portfolio",
        description: "Complete portfolio project with React + Node",
        dueDate: new Date("2026-01-10"),
        status: "pending",
        createdBy: user1._id,
        assignedTo: user2._id
      },
      {
        title: "Prepare Resume",
        description: "Update resume with latest projects",
        dueDate: new Date("2026-01-05"),
        status: "pending",
        createdBy: user2._id,
        assignedTo: user1._id
      },
      {
        title: "Team Meeting",
        description: "Discuss project milestones",
        dueDate: new Date("2025-12-30"),
        status: "pending",
        createdBy: user1._id,
        assignedTo: user1._id
      }
    ])

    console.log("✅ Seed data created")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seed()