import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    const navigate = useNavigate();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState({
        name: "User",
        email: "user@bengkelgo.com",
        role: "Member"
    });

    const loadUserData = () => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                const emailStr = parsedUser.email || "user@bengkelgo.com";
                
                // Mengambil nama dari field 'name' ATAU memotong string email sebelum '@'
                const rawName = parsedUser.name || emailStr.split("@")[0];
                const formattedName = rawName.trim().charAt(0).toUpperCase() + rawName.trim().slice(1);
                const userRole = emailStr.toLowerCase().includes("admin") ? "Admin" : "Member";

                setCurrentUser({
                    name: formattedName,
                    email: emailStr,
                    role: userRole
                });
            } catch (error) {
                console.error("Gagal membaca data user di Header", error);
            }
        }
    };

    useEffect(() => {
        loadUserData();
        const handleStorageChange = () => loadUserData();
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/"); 
        }
    };

    return (
        <div id="header-container" className="flex justify-between items-center px-10 py-8 bg-[#FDF8F4] relative z-[100]">
            <div className="hidden xl:block">
                <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">BengkelGO</h1>
                <p className="text-xs text-[#666666] font-medium mt-1">
                    Hello {currentUser.name.split(" ")[0]}, welcome back!
                </p>
            </div>

            {/* --- SEARCH BAR --- */}
            <div id="search-bar" className="relative w-full max-w-xl mx-10">
                <div className={`flex items-center bg-white rounded-[20px] px-6 py-2 transition-all duration-300 shadow-sm border border-transparent ${isSearchFocused ? 'border-orange-100 shadow-md ring-4 ring-orange-50/50' : ''}`}>
                    <FaSearch className={`${isSearchFocused ? 'text-[#FF6B2C]' : 'text-gray-300'} transition-colors text-sm`} />
                    <input
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        className="p-2.5 bg-transparent w-full outline-none text-sm text-[#1A1A1A] placeholder-gray-400 font-medium"
                        type="text"
                        placeholder="Search anything"
                    />
                </div>
                {isSearchFocused && (
                    <div className="absolute top-16 left-0 w-full bg-white shadow-2xl rounded-[28px] p-6 border border-gray-50">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 px-2">Recent Searches</p>
                        <div className="space-y-1">
                            {["Honda Vario 150", "Tune Up Package"].map((item, index) => (
                                <div key={index} className="flex items-center gap-4 text-sm text-[#666666] hover:bg-[#FDF8F4] p-3.5 rounded-2xl cursor-pointer group">
                                    <FaSearch className="text-gray-300 group-hover:text-[#FF6B2C]" size={12} />
                                    <span className="font-semibold group-hover:text-[#1A1A1A]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* --- RIGHT SECTION --- */}
            <div id="icons-container" className="flex items-center gap-4">
                <div className="relative p-4 bg-white text-[#666666] cursor-pointer hover:bg-[#FDF8F4] rounded-[20px] shadow-sm border border-gray-50">
                    <FaBell size={20} />
                    <span className="absolute top-3.5 right-3.5 bg-[#FF6B2C] h-2.5 w-2.5 rounded-full border-2 border-white"></span>
                </div>
                <div className="p-4 bg-white text-[#666666] cursor-pointer hover:bg-[#FDF8F4] rounded-[20px] shadow-sm border border-gray-50">
                    <SlSettings size={20} />
                </div>

                <div className="relative flex items-center gap-4 pl-4 border-l border-gray-200/50">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-[#1A1A1A] leading-none">{currentUser.name}</p>
                        <p className="text-[11px] text-gray-400 font-bold mt-1.5 uppercase tracking-wider">{currentUser.role}</p>
                    </div>
                    <div className="relative">
                        <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-13 h-13 rounded-[20px] p-0.5 border-2 border-white shadow-lg overflow-hidden cursor-pointer">
                            <img
                                className="w-12 h-12 rounded-[18px] object-cover"
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=FF6B2C&color=fff&bold=true`}
                                alt="Avatar"
                            />
                        </div>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-5 w-64 bg-white shadow-2xl rounded-[30px] py-4 border border-gray-50 z-[110]">
                                <div className="px-6 py-4 bg-[#FDF8F4]/60 rounded-t-[30px] -mt-4 mb-3">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Logged in as</p>
                                    <p className="text-xs font-bold text-[#1A1A1A] truncate mt-0.5">{currentUser.email}</p>
                                </div>
                                <button className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-bold text-[#666666] hover:bg-[#FDF8F4]">
                                    <FaUser size={14} /> My Profile
                                </button>
                                <div className="mx-6 my-3 border-t border-gray-100"></div>
                                <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-3.5 text-sm font-black text-red-500 hover:bg-red-50">
                                    <FaSignOutAlt size={14} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}