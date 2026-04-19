import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    order: { type: Number, default: 0 },
    content: { type: String, default: "" },
    tags: [String],
  },
  { timestamps: true },
);

sectionSchema.index({ title: "text", content: "text", tags: "text" });

export default mongoose.model("Section", sectionSchema);
