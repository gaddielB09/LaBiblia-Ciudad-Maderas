import mongoose from "mongoose";

const parentSectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("ParentSection", parentSectionSchema);
