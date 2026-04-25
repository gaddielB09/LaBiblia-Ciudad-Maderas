import mongoose from "mongoose";

const sectionContentSchema = new mongoose.Schema(
  {
    parentSectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParentSection",
      required: true,
    },
    parentSectionName: { type: String, required: true },
    pageNum: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrls: [{ type: String }],
    embedding: { type: [Number], default: [] },
  },
  { timestamps: true },
);

sectionContentSchema.index({
  parentSectionName: "text",
  title: "text",
  content: "text",
});

export default mongoose.model("SectionContent", sectionContentSchema);
