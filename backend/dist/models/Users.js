import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional for Google users
    picture: { type: String },
    googleId: { type: String },
}, { timestamps: true }); // ✅ adds createdAt & updatedAt automatically
const User = mongoose.model("User", userSchema);
export default User;
