import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;   // optional for Google users
  picture?: string;    // Google profile picture
  googleId?: string;   // Google unique ID
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google users
  picture: { type: String },
  googleId: { type: String },
}, { timestamps: true }); // ✅ adds createdAt & updatedAt automatically

const User = mongoose.model<IUser>("User", userSchema);

export default User;
