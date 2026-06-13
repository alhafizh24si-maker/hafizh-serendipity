import { useState } from "react";
import { 
  FaSearch, 
  FaPaperPlane, 
  FaUserCircle, 
  FaCheckDouble, 
  FaPhoneAlt, 
  FaEllipsisV,
  FaWrench
} from "react-icons/fa";

// 🟢 Komponen ChatBubble bawaan Anda (Dipertahankan penuh)
const ChatBubble = ({ sender, msg, time, isMe }) => (
  <div className={`flex flex-col mb-4 ${isMe ? 'items-end' : 'items-start'}`}>
    <div className={`max-w-[70%] px-4 py-3 rounded-2xl font-medium text-sm ${isMe ? 'bg-[#FF6B2C] text-white rounded-tr-none' : 'bg-gray-100 text-gray-700 rounded-tl-none'}`}>
      {msg}
    </div>
    <span className="text-[9px] text-gray-300 font-black mt-1 uppercase">{time}</span>
  </div>
);

export default function Messages() {
  // Data Mock Dummy untuk Daftar Pelanggan & Riwayat Pesan
  const [activeChat, setActiveChat] = useState(1);
  const [typedMessage, setTypedMessage] = useState("");
  
  const [chatLists] = useState([
    { id: 1, name: "Budi Santoso", vehicle: "Honda Vario 150", lastMsg: "Apakah sparepart kampas remnya ready?", time: "10:45 AM", unread: 2, online: true },
    { id: 2, name: "Siti Rahma", vehicle: "Yamaha NMax", lastMsg: "Terima kasih, motor saya sudah kembali prima.", time: "09:15 AM", unread: 0, online: false },
    { id: 3, name: "Andi Wijaya", vehicle: "Toyota Avanza", lastMsg: "Estimasi selesai servis berkala jam berapa ya?", time: "Kemarin", unread: 0, online: true },
    { id: 4, name: "Dewi Lestari", vehicle: "Suzuki Swift", lastMsg: "Ganti oli sekalian cek aki ya pak.", time: "08 Jun", unread: 0, online: false },
  ]);

  const [conversation, setConversation] = useState([
    { id: 1, sender: "Budi Santoso", msg: "Halo admin BengkelGoFix, saya mau tanya jadwal servis besok jam 10 pagi kosong?", time: "10:40 AM", isMe: false },
    { id: 2, sender: "Admin", msg: "Halo Pak Budi! Untuk jam 10 pagi besok kuota mekanik kami masih tersedia. Ada keluhan apa pada motornya?", time: "10:42 AM", isMe: true },
    { id: 3, sender: "Budi Santoso", msg: "Rem belakang terasa blong, sepertinya habis. Apakah sparepart kampas remnya ready?", time: "10:45 AM", isMe: false },
  ]);

  // Fungsi mengirim pesan baru
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg = {
      id: conversation.length + 1,
      sender: "Admin",
      msg: typedMessage,
      time: "BARU SAJA",
      isMe: true
    };

    setConversation([...conversation, newMsg]);
    setTypedMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-white rounded-3xl border border-gray-100 overflow-hidden font-jakarta shadow-sm m-4">
      
      {/* 1. SISI KIRI: DAFTAR CHAT MASUK (CHAT LIST) */}
      <div className="w-full md:w-80 flex flex-col border-r border-gray-100 bg-gray-50/50">
        {/* Header Bagian Atas Sidebar Chat */}
        <div className="p-5 bg-white border-b border-gray-100">
          <h2 className="text-xl font-black text-[#1A1A1A] tracking-tight mb-3">Pesan Masuk</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari pelanggan atau nopol..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100/80 rounded-xl text-xs font-bold text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:bg-white transition-all"
            />
            <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
          </div>
        </div>

        {/* List Obrolan Aktif */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {chatLists.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                activeChat === chat.id 
                  ? "bg-white shadow-md shadow-gray-200/50 border border-gray-100" 
                  : "hover:bg-white/60"
              }`}
            >
              {/* Avatar Pelanggan */}
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 bg-orange-100 rounded-full flex items-center justify-center text-[#FF6B2C]">
                  <FaUserCircle className="text-2xl" />
                </div>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              {/* Detail Info Pesan Terakhir */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-xs font-black text-[#1A1A1A] truncate">{chat.name}</h4>
                  <span className="text-[9px] font-black text-gray-300 uppercase">{chat.time}</span>
                </div>
                <p className="text-[10px] font-bold text-[#FF6B2C] uppercase tracking-wide mb-0.5">{chat.vehicle}</p>
                <p className="text-xs text-gray-400 truncate font-medium">{chat.lastMsg}</p>
              </div>

              {/* Status Unread Bubble */}
              {chat.unread > 0 && (
                <div className="bg-[#FF6B2C] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. SISI KANAN: JENDELA RUANG OBROLAN UTAMA (CHAT WINDOW) */}
      <div className="hidden md:flex flex-1 flex-col bg-white">
        
        {/* Top Header Kamar Chat */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm shadow-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-[#FF6B2C]">
              <FaWrench className="text-base" />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#1A1A1A]">Budi Santoso</h3>
              <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Terhubung • Honda Vario 150 (B 1234 XYZ)
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-400">
            <button className="p-2.5 hover:bg-gray-50 rounded-xl hover:text-[#FF6B2C] transition-colors">
              <FaPhoneAlt size={14} />
            </button>
            <button className="p-2.5 hover:bg-gray-50 rounded-xl hover:text-gray-600 transition-colors">
              <FaEllipsisV size={14} />
            </button>
          </div>
        </div>

        {/* Kontainer Aliran Bubble Chat (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FDF8F4]/30">
          {conversation.map((bubble) => (
            <ChatBubble
              key={bubble.id}
              sender={bubble.sender}
              msg={bubble.msg}
              time={bubble.time}
              isMe={bubble.isMe}
            />
          ))}
        </div>

        {/* Input Bar Pengiriman Pesan (Form Action) */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl p-2 pl-4">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              placeholder="Tulis pesan balasan ke pelanggan di sini..."
              className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-[#1A1A1A] placeholder:text-gray-400 py-2"
            />
            <button
              type="submit"
              className="bg-[#FF6B2C] hover:bg-[#1A1A1A] text-white p-3 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md shadow-orange-100 hover:shadow-none"
            >
              <FaPaperPlane size={12} />
            </button>
          </form>
          <div className="flex items-center gap-1.5 mt-2 ml-1 text-gray-300">
            <FaCheckDouble size={10} className="text-gray-300" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Pesan dikirim terenkripsi otomatis</span>
          </div>
        </div>

      </div>

    </div>
  );
}