import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import SectionsRouter from "./Routes/sections.js";
import SearchRouter from "./Routes/search.js";
import ChatRouter from "./Routes/chat.js";
import RequestsRouter from "./Routes/requests.js";
import IngestRouter from "./Routes/Ingest.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "700mb" }));
app.use(express.urlencoded({ limit: "700mb", extended: true }));

app.use("/uploads", express.static("uploads"));

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/api/sections", SectionsRouter);
app.use("/api/search", SearchRouter);
app.use("/api/chat", ChatRouter);
app.use("/api/requests", RequestsRouter);
app.use("/api/ingest", IngestRouter);

app.get("/health", (_, res) => res.json({ status: "ok" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(process.env.PORT || 4000, () =>
      console.log(`Backend corriendo en puerto ${process.env.PORT || 4000}`),
    );
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
