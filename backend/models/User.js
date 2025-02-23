import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phNumber: { type: String, required: true, unique: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    role: { type: String, enum: ["user"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema);

export default User;