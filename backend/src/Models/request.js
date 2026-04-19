import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);