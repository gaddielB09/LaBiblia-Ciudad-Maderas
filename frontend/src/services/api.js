import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  timeout: 3000000,
});

export const getSections = () => api.get("/sections");
export const getSection = (slug) => api.get(`/sections/${slug}`);
export const searchSections = (q) => api.get(`/search?q=${q}`);
export const sendChat = (message, agent, history = []) => {
  return api.post("/chat", { message, agent, history });
};
export const sendRequest = (content) => api.post("/requests", { content });
export const uploadPdf = (formData) =>
  api.post("/ingest/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const saveSection = (data) => api.post("/ingest/save-sections", data);
