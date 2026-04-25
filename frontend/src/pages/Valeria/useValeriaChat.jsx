import { useState, useRef, useEffect } from "react";
import { sendChat } from "../../services/api";

export function useValeriaChat() {
  const [query, setQuery] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeAgent, setActiveAgent] = useState("valeria");
  const [showAgentMenu, setShowAgentMenu] = useState(false);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingRef = useRef(null);

  useEffect(() => {
    if (chatStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatStarted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedText]);

  const typeMessage = (text) => {
    const words = text.split(" ");
    let currentIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    const tick = () => {
      if (currentIndex < words.length) {
        const chunk = words.slice(0, currentIndex + 1).join(" ");
        setDisplayedText(chunk);
        currentIndex++;
        typingRef.current = setTimeout(tick, 40);
      } else {
        setIsTyping(false);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text,
            typing: false,
          };
          return updated;
        });
        setDisplayedText("");
      }
    };
    typingRef.current = setTimeout(tick, 40);
  };

  const handleSend = async () => {
    if (!query.trim() || isLoading || isTyping) return;
    const userMsg = query.trim();
    setQuery("");
    if (!chatStarted) setChatStarted(true);

    const historyToSend = messages
      .filter((m) => !m.loading && !m.typing)
      .map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.text,
      }));

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
      { role: "ai", text: "", typing: true, loading: true, images: [] },
    ]);
    setIsLoading(true);

    try {
      const res = await sendChat(userMsg, activeAgent, historyToSend);
      const reply = res.data.reply;
      const images = res.data.images || [];
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          loading: false,
          typing: true,
          images,
        };
        return updated;
      });
      setIsLoading(false);
      typeMessage(reply);
    } catch {
      setIsLoading(false);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: "Hubo un error al conectar con el servidor. Intenta de nuevo.",
          loading: false,
          typing: false,
          images: [],
        };
        return updated;
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return {
    query,
    setQuery,
    chatStarted,
    messages,
    isLoading,
    displayedText,
    isTyping,
    activeAgent,
    setActiveAgent,
    showAgentMenu,
    setShowAgentMenu,
    inputRef,
    messagesEndRef,
    handleSend,
    handleKeyDown,
  };
}
