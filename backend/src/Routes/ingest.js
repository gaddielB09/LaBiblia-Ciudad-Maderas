import { Router } from "express";
import multer from "multer";
import OpenAI from "openai";
import ParentSection from "../Models/parentSection.js";
import SectionContent from "../Models/sectionContent.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { execSync } = require("child_process");
import fs from "fs";
import os from "os";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const IngestRouter = Router();

const s3 = new S3Client({
  endpoint: process.env.B2_ENDPOINT,
  region: process.env.B2_REGION,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APP_KEY,
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 700 * 1024 * 1024 },
});

const generateEmbedding = async (text) => {
  const clean = text.slice(0, 8000);
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: clean,
  });
  return response.data[0].embedding;
};

const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
};

IngestRouter.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subió ningún archivo." });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const tmpPdf = path.join(os.tmpdir(), `upload-${Date.now()}.pdf`);

  try {
    fs.writeFileSync(tmpPdf, req.file.buffer);

    const infoOutput = execSync(`mutool info "${tmpPdf}"`).toString();
    const match = infoOutput.match(/Pages:\s+(\d+)/);
    const totalPages = match ? parseInt(match[1]) : 0;

    res.write(
      `data: ${JSON.stringify({ type: "total", total: totalPages })}\n\n`,
    );

    for (let i = 1; i <= totalPages; i++) {
      let pageText = "";
      try {
        pageText = execSync(`mutool draw -F txt -o - "${tmpPdf}" ${i}`)
          .toString()
          .trim();
      } catch {
        pageText = "";
      }

      const section = {
        pageNum: i,
        title: `Página ${i}`,
        content: pageText,
        parentSection: "",
        imageUrls: [],
      };

      res.write(`data: ${JSON.stringify({ type: "section", section })}\n\n`);
    }

    fs.unlinkSync(tmpPdf);
    res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Error al procesar el PDF:", error);
    if (fs.existsSync(tmpPdf)) fs.unlinkSync(tmpPdf);
    res.write(
      `data: ${JSON.stringify({ type: "error", message: "No se pudo procesar el PDF." })}\n\n`,
    );
    res.end();
  }
});

IngestRouter.post(
  "/upload-images",
  upload.array("images", 10),
  async (req, res) => {
    try {
      const urls = [];

      for (const file of req.files) {
        const uniqueName = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}-${file.originalname.replace(/\s+/g, "-")}`;

        const params = {
          Bucket: process.env.B2_BUCKET_NAME,
          Key: uniqueName,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(params));

        const publicUrl = `${process.env.B2_ENDPOINT}/${process.env.B2_BUCKET_NAME}/${uniqueName}`;
        urls.push(publicUrl);
      }

      res.status(200).json({ urls });
    } catch (error) {
      console.error("Error subiendo imágenes a B2:", error);
      res.status(500).json({ error: "Error al subir las imágenes al bucket." });
    }
  },
);

IngestRouter.post("/save-sections", async (req, res) => {
  const { sections } = req.body;

  if (!sections || !Array.isArray(sections)) {
    return res.status(400).json({ error: "Datos inválidos o vacíos." });
  }

  try {
    for (const sec of sections) {
      const parentName = sec.parentSection?.trim() || "Sin Clasificar";

      const parentDoc = await ParentSection.findOneAndUpdate(
        { name: parentName },
        { $setOnInsert: { name: parentName } },
        { new: true, upsert: true },
      );

      const textToEmbed = `${sec.title} ${sec.content}`.trim();
      const embedding = textToEmbed ? await generateEmbedding(textToEmbed) : [];

      const newContent = new SectionContent({
        parentSectionId: parentDoc._id,
        parentSectionName: parentDoc.name,
        pageNum: sec.pageNum,
        title: sec.title || `Página ${sec.pageNum}`,
        content: sec.content || "",
        imageUrls: sec.imageUrls || [],
        embedding,
      });

      await newContent.save();
    }

    res.status(200).json({ message: "¡Secciones guardadas con éxito!" });
  } catch (error) {
    console.error("Error al guardar en BD:", error);
    res.status(500).json({ error: "Hubo un error al guardar los documentos." });
  }
});

export { generateEmbedding, cosineSimilarity };
export default IngestRouter;
