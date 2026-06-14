import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";

const AI_LOGO_URL = "https://i.ibb.co.com/TxSKgNWK/Logo-SAHAJA-AI.png";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Halo! Saya SAHAJA AI, asisten virtual dari BengkelGoFix 🛠️. Ada yang bisa saya bantu terkait servis motor atau spare part hari ini?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const systemPrompt = {
        role: "system",
        content: "Kamu adalah asisten virtual SAHAJA AI yang dibuat khusus untuk bengkel motor bernama 'BengkelGoFix'. Jawablah dengan ramah, profesional, dan gunakan bahasa Indonesia yang sopan. Layanan yang tersedia: Servis Rutin, Perbaikan Mesin, Ganti Oli, Spare Part, dan Layanan Darurat 24 Jam. Jika pengguna ingin booking servis atau beli spare part, arahkan mereka untuk mendaftar melalui website atau klik tombol 'Mulai Sekarang'."
      };

      // Menggunakan URL dari .env
      const apiUrl = import.meta.env.VITE_CEREBRAS_API_URL;
      const apiKey = import.meta.env.VITE_CEREBRAS_API_KEY;

      const response = await axios.post(
        apiUrl,
        {
          model: "zai-glm-4.7",
          messages: [systemPrompt, ...messages, userMessage],
          temperature: 0.7,
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiMessage = { role: "assistant", content: response.data.choices[0].message.content };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Logika error diperbarui agar mencetak alasan spesifik di Console Browser
      if (error.response) {
        console.error("Detail API Error:", error.response.data);
      } else {
        console.error("Network/CORS Error:", error.message);
      }
      setMessages((prev) => [...prev, { role: "assistant", content: "Maaf, sistem sedang sibuk. Silakan hubungi kami via WhatsApp atau coba lagi nanti." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-jakarta">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-xl border border-orange-100 shadow-2xl rounded-3xl w-[350px] h-[500px] flex flex-col overflow-hidden mb-4 transition-all duration-300 transform origin-bottom-left">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex justify-between items-center text-white rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 p-1">
                <img 
                  src={AI_LOGO_URL} 
                  alt="BengkelGoFix AI" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm">GoFix X SAHAJA AI</h3>
                <p className="text-[10px] text-orange-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online 24/7
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-end gap-2">
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 p-0.5 flex-shrink-0">
                      <img src={AI_LOGO_URL} alt="AI" className="w-full h-full object-contain"/>
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 text-sm shadow-sm ${
                    msg.role === "user" 
                      ? "bg-orange-500 text-white rounded-2xl rounded-tr-sm" 
                      : "bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 p-0.5 flex-shrink-0">
                    <img src={AI_LOGO_URL} alt="AI" className="w-full h-full object-contain"/>
                  </div>
                  <div className="bg-white border border-slate-100 text-slate-400 p-3 rounded-2xl rounded-tl-sm text-xs flex gap-1 items-center">
                      <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2 rounded-b-3xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm outline-none focus:border-orange-500 focus:bg-white transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-orange-500/20"
            >
              <FaPaperPlane className="text-xs" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button - POSISI KIRI BAWAH */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"} absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-500/30 hover:scale-110 transition-all duration-300 z-50`}
      >
        <FaCommentDots className="text-2xl" />
      </button>
    </div>
  );
}