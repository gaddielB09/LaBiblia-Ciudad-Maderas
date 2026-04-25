import { Router } from "express";
import OpenAI from "openai";
import SectionContent from "../Models/sectionContent.js";
import { generateEmbedding, cosineSimilarity } from "./Ingest.js";

const ChatRouter = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const AGENTS = {
  valeria: {
    name: "Valeria",
    systemPrompt: `Eres Valeria, una asistente estratégica y comercial interna diseñada para apoyar a la fuerza de ventas de Ciudad Maderas. NO interactúas con clientes finales. Tu usuario siempre es un asesor comercial. No eres una vendedora directa, no cierras ventas, no presionas y NO usas emojis. Eres un hub de información interna, un copiloto cognitivo y un acelerador de criterio.

    REGLAS ESTRICTAS DE RESPUESTA:
    1. PRIORIDAD (MODO RÁPIDO): Si la pregunta es clara, responde en la primera línea. Sin introducciones, sin rodeos. Máximo 1-2 líneas adicionales si aportan valor. Acceso claro > explicación extensa.
    2. MANEJO DE INCERTIDUMBRE Y ESCALAMIENTO: Si la pregunta es ambigua, falta contexto, algo varía por zona/modelo, o hay riesgo de error, NO inventes. Responde exactamente con: "Esta información puede variar. Para confirmarla con precisión, conviene revisarlo con tu jefe directo." o "Este punto conviene revisarlo con tu jefe directo para evitar errores."
    3. CUESTIONAMIENTO AL ASESOR: Si detectas que el asesor está asumiendo cosas no validadas o cometiendo errores de lógica, señálalo educadamente (Ej: "Aquí hay un punto débil: estás asumiendo algo que no está validado"). Corrige el pensamiento, no a la persona.
    4. TONO: Claro, Profesional, Directo, Tranquilo, Inteligente.
    5. FORMATO: Utiliza Markdown obligatoriamente. Si debes mostrar múltiples datos, comparativas, precios o dimensiones, DEBES usar el formato de tablas de Markdown (con | y -).

    Toda la información proviene ÚNICAMENTE de la siguiente base de datos interna. Nunca inventes información.`,
  },
  pacolli: {
    name: "Pacolli",
    systemPrompt: `Eres Pacolli. [Personalidad de Pacolli por definir].`,
  },
};

ChatRouter.post("/", async (req, res) => {
  const { message, agent = "valeria", history = [] } = req.body;

  if (!message)
    return res.status(400).json({ error: "El mensaje es requerido" });

  try {
    const recentContext = history
      .slice(-2)
      .map((m) => m.content)
      .join(" ");
    const searchQuery = recentContext ? `${recentContext} ${message}` : message;

    const queryEmbedding = await generateEmbedding(message);

    const allSections = await SectionContent.find(
      { embedding: { $exists: true, $ne: [] } },
      {
        title: 1,
        content: 1,
        parentSectionName: 1,
        imageUrls: 1,
        embedding: 1,
      },
    );

    const scored = allSections
      .map((doc) => ({
        doc,
        score: cosineSimilarity(queryEmbedding, doc.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    let contextText =
      "No se encontró información relevante en la base de datos para esta consulta.";
    let contextImages = [];

    if (scored.length > 0 && scored[0].score > 0.3) {
      contextText = scored
        .map(
          ({ doc }) =>
            `--- SECCIÓN: ${doc.parentSectionName} > ${doc.title} ---\n${doc.content}`,
        )
        .join("\n\n");

      contextImages = scored.flatMap(({ doc }) => doc.imageUrls || []);
    }

    const currentAgent = AGENTS[agent] || AGENTS["valeria"];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `${currentAgent.systemPrompt}\n\nINFORMACIÓN DE LA BASE DE DATOS (Actualizada para el contexto actual):\n${contextText}`,
        },
        ...history,
        { role: "user", content: message },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply, images: contextImages });
  } catch (error) {
    console.error("Error en ChatRouter:", error);
    res
      .status(500)
      .json({ error: "Hubo un problema procesando tu solicitud con la IA." });
  }
});

export default ChatRouter;
