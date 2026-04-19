import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Section from "../Models/section.js";

const ChatRouter = Router();

ChatRouter.post("/", async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "El mensaje es requerido" });
  }

  try {
    const searchResults = await Section.find(
      { $text: { $search: message } },
      { score: { $meta: "textScore" }, title: 1, content: 1 },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(3);

    let contextText =
      "No se encontró información relevante en la base de datos para esta consulta.";

    if (searchResults.length > 0) {
      contextText = searchResults
        .map((doc) => `--- SECCIÓN: ${doc.title} ---\n${doc.content}`)
        .join("\n\n");
    }

    //! This model is a preview, so it needs to be changed to a stable one when it is released. For now, it is the best option for this use case
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
      Eres el asistente virtual experto de la empresa "La Biblia". 
      Tu trabajo es responder las dudas de los usuarios basándote ÚNICAMENTE en la información proporcionada a continuación.
      
      REGLAS ESTRICTAS:
      1. Si la respuesta a la pregunta del usuario no está explícitamente en la "INFORMACIÓN DE LA BASE DE DATOS", no inventes nada. Responde amablemente que esa información no está disponible en este momento.
      2. Sé claro, profesional y conciso.
      3. Puedes usar formato Markdown (negritas, listas) para estructurar tu respuesta de forma amigable.

      INFORMACIÓN DE LA BASE DE DATOS:
      ${contextText}

      PREGUNTA DEL USUARIO:
      ${message}
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Error en ChatRouter:", error);
    res
      .status(500)
      .json({ error: "Hubo un problema procesando tu solicitud con la IA." });
  }
});

export default ChatRouter;
