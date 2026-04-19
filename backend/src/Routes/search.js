import { Router } from "express";
import Section from "../Models/section.js";

const SearchRouter = Router();

// GET /api/search?q=ventas
SearchRouter.get("/", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  try {
    const results = await Section.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" }, title: 1, slug: 1, category: 1 },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10);
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default SearchRouter;
