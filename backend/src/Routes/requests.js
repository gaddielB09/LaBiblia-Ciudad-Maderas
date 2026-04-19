import { Router } from "express";
import Request from "../Models/request.js";

const RequestsRouter = Router();

RequestsRouter.post("/", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "El contenido de la solicitud es requerido" });
  }

  try {
    const newRequest = new Request({ content });
    await newRequest.save();
    res.status(201).json({ success: true, request: newRequest });
  } catch (error) {
    console.error("Error al guardar la solicitud:", error);
    res.status(500).json({ error: "Hubo un problema al guardar tu solicitud" });
  }
});

export default RequestsRouter;