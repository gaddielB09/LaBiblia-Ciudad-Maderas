import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

export const getSections = () => api.get("/sections");
export const getSection = (slug) => api.get(`/sections/${slug}`);
export const searchSections = (q) => api.get(`/search?q=${q}`);
export const sendChat = (message) => api.post("/chat", { message });
export const sendRequest = (content) => api.post("/requests", { content });
