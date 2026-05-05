import { useState } from "react";
import { FaBell, FaSearch, FaUser, FaSignOutAlt, FaCog, FaChartPie, FaWrench } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div id="header-container" className="flex justify-between items-center p-6 bg-transparent relative z-[100]">
            
            {/* --- SEARCH BAR: Disesuaikan untuk pencarian data bengkel --- */}
            <div id="search-bar" className="relative w-full max-w-lg">
                <div className={`flex items-center bg-white rounded-2xl shadow-sm px-4 py-1 transition-all duration-300 border-2 ${isSearchFocused ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-transparent'}`}>
                    <FaSearch className={`${isSearchFocused ? 'text-emerald-500' : 'text-gray-300'} transition-colors`} />
                    <input
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        id="search-input"
                        className="p-3 bg-transparent w-full outline-none text-sm text-gray-700 placeholder-gray-400 font-medium"
                        type="text"
                        placeholder="Cari No. Plat, Nama Pelanggan, atau Mekanik..."
                    />
                </div>
                
                {/* Modal Search Overlay (Konteks Bengkel) */}
                {isSearchFocused && (
                    <div className="absolute top-16 left-0 w-full bg-white shadow-2xl rounded-2xl p-5 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Pencarian Terakhir</p>
                        <div className="space-y-1">
                            {[
                                { title: "B 1234 XYZ (Honda Vario)", tag: "Plat Nomor" },
                                { title: "Servis Besar Toyota Avanza", tag: "Layanan" },
                                { title: "Mekanik: Agus Setiawan", tag: "Staff" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-sm text-gray-600 hover:bg-emerald-50 p-3 rounded-xl cursor-pointer group transition">
                                    <div className="flex items-center gap-3">
                                        <FaSearch className="text-gray-300 group-hover:text-emerald-500" />
                                        <span className="font-medium group-hover:text-emerald-700">{item.title}</span>
                                    </div>
                                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600">{item.tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-50">
                    {/* Notifikasi */}
                    <div className="relative p-3 text-gray-500 cursor-pointer hover:bg-gray-50 hover:text-emerald-500 rounded-xl transition">
                        <FaBell size={18} />
                        <span className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-[9px] border-2 border-white font-bold">12</span>
                    </div>
                    {/* Statistik Ringkas */}
                    <div className="p-3 text-gray-500 cursor-pointer hover:bg-gray-50 hover:text-blue-600 rounded-xl transition">
                        <FaChartPie size={18} />
                    </div>
                    {/* Settings Cepat */}
                    <div className="p-3 text-gray-500 cursor-pointer hover:bg-gray-50 hover:text-gray-800 rounded-xl transition">
                        <SlSettings size={18} />
                    </div>
                </div>

                {/* --- PROFILE DROPDOWN: Branding BengkelGo --- */}
                <div className="relative flex items-center space-x-4 pl-4">
                    <div className="text-right hidden lg:block leading-tight">
                        <p className="text-xs font-bold text-blue-900">Muhammad Anugrah Alhafizh</p>
                        <p className="text-[10px] text-emerald-500 font-semibold uppercase tracking-tighter">Kepala Bengkel</p>
                    </div>
                    <div className="relative">
                        <div 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="w-12 h-12 rounded-2xl border-2 border-white shadow-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all"
                        >
                            <img
                                className="w-full h-full object-cover"
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Admin Profile"
                            />
                        </div>
                        
                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-2xl py-2 border border-gray-50 z-[110] animate-in zoom-in-95 duration-200">
                                <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                    <p className="text-xs text-gray-400">Email Login</p>
                                    <p className="text-xs font-bold text-gray-700 truncate">anugrah@bengkelgo.com</p>
                                </div>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition">
                                    <FaUser size={14} /> Profil Saya
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition">
                                    <FaWrench size={14} /> Pengaturan Bengkel
                                </button>
                                <hr className="my-1 border-gray-50" />
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition font-bold">
                                    <FaSignOutAlt size={14} /> Keluar Sistem
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}