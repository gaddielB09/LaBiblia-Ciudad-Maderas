import { Router } from "express";
import ParentSection from "../Models/parentSection.js";
import SectionContent from "../Models/sectionContent.js";

const SectionsRouter = Router();

SectionsRouter.get("/", async (req, res) => {
  try {
    const parents = await ParentSection.find().sort({ name: 1 });

    const formattedData = parents.map((p) => ({
      parentSection: p.name,
      id: p._id,
    }));

    res.json(formattedData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

SectionsRouter.get("/content/:parentId", async (req, res) => {
  try {
    const contents = await SectionContent.find({
      parentSectionId: req.params.parentId,
    }).sort({ pageNum: 1 });

    if (!contents || contents.length === 0) {
      return res
        .status(404)
        .json({ error: "No hay contenido para esta sección" });
    }

    res.json(contents);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

SectionsRouter.delete("/page/:id", async (req, res) => {
  try {
    await SectionContent.findByIdAndDelete(req.params.id);
    res.json({ message: "Página eliminada" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

SectionsRouter.delete("/parent/:id", async (req, res) => {
  try {
    await SectionContent.deleteMany({ parentSectionId: req.params.id });
    await ParentSection.findByIdAndDelete(req.params.id);
    res.json({ message: "Sección eliminada" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

SectionsRouter.put("/page/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, imageUrls } = req.body;
    
    const updated = await SectionContent.findByIdAndUpdate(
      id,
      { title, content, imageUrls },
      { new: true }
    );
    
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default SectionsRouter;
