import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaWrench, FaCheckCircle, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { supabaseAPI } from "../../services/supabaseAPI"; 

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const userRecords = await supabaseAPI.loginUser(dataForm.email, dataForm.password);

            if (userRecords && userRecords.length > 0) {
                const userData = userRecords[0];

                // 🟢 Menentukan role: ambil dari database, atau deteksi lewat email jika tidak ada kolom role
                const userRole = userData.role || (userData.email?.includes("admin") ? "admin" : "user");

                // Menyimpan token dan data user ke localStorage agar bisa diakses oleh halaman lain
                localStorage.setItem("token", "supabase-session-active-token");
                localStorage.setItem("user", JSON.stringify({ 
                    id: userData.id,
                    email: userData.email, 
                    name: userData.name || "User Member",
                    role: userRole 
                }));

                // 🟢 Pengondisian navigasi berdasarkan role
                if (userRole === "admin") {
                    navigate("/dashboard");
                } else {
                    navigate("/member");
                }

            } else {
                setError("Email/Username atau Password salah. Periksa kembali data Anda.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Gagal masuk. Koneksi server database bermasalah.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-[#F8FAFC] font-jakarta overflow-y-auto flex items-center justify-center p-4 md:p-6 selection:bg-orange-200">
            {/* 🟢 DUAL CARD WRAPPER CONTAINER */}
            <div className="w-full max-w-[1040px] min-h-[640px] bg-white rounded-[32px] shadow-xl shadow-gray-100/70 border border-gray-100 flex flex-col md:flex-row overflow-hidden">
                
                {/* 1. SEBELAH KIRI: INFORMASI & BRANDING APLIKASI */}
                <div className="w-full md:w-[45%] bg-[#1A1A1A] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden text-white">
                    {/* Efek Ambient Glow Oranye di Latar Belakang */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#FF6B2C] opacity-20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-600 opacity-15 rounded-full blur-[100px] pointer-events-none" />

                    {/* Logo & Brand Header */}
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="bg-[#FF6B2C] p-2 rounded-xl shadow-md shadow-[#FF6B2C]/20">
                            <FaWrench className="text-white text-lg" />
                        </div>
                        <h1 className="text-xl font-black tracking-tighter">
                            BengkelGo<span className="text-[#FF6B2C]">Fix</span>
                        </h1>
                    </div>

                    {/* Fitur Utama / Nilai Jual Aplikasi */}
                    <div className="my-10 md:my-0 space-y-6 relative z-10">
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight max-w-xs">
                            Satu Sentuhan Kelola Seluruh Operasional Bengkel.
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                            Aplikasi manajemen CRM terlengkap untuk melacak inventaris sparepart, performa mekanik, hingga ulasan pelanggan secara realtime.
                        </p>

                        {/* List Fitur Singkat */}
                        <div className="pt-4 space-y-3.5">
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                                <FaCheckCircle className="text-[#FF6B2C] text-base flex-shrink-0" />
                                <span>Manajemen Inventaris Otomatis</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                                <FaShieldAlt className="text-[#FF6B2C] text-base flex-shrink-0" />
                                <span>Proteksi Data Server Aman & Terenkripsi</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                                <FaChartLine className="text-[#FF6B2C] text-base flex-shrink-0" />
                                <span>Analisis Pendapatan Real-time</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Informasi Aplikasi */}
                    <div className="relative z-10 pt-4 border-t border-white/10">
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                            Reztro Management System &copy; 2026
                        </p>
                    </div>
                </div>

                {/* 2. SEBELAH KANAN: FORM LOGIN UTAMA */}
                <div className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center bg-white">
                    <div className="text-left mb-8">
                        <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tighter mb-1.5">
                            Login to Your Account
                        </h2>
                        <p className="text-xs font-bold text-gray-400">
                            Selamat datang kembali! Silakan masukkan kredensial Anda.
                        </p>
                    </div>

                    {/* Banner Notifikasi Error */}
                    {error && (
                        <div className="bg-rose-50 mb-6 p-4 rounded-xl flex items-center border border-rose-100 animate-shake">
                            <BsFillExclamationDiamondFill className="text-rose-600 me-3 text-lg flex-shrink-0" />
                            <span className="text-[10px] font-black text-rose-700 uppercase tracking-wide">{error}</span>
                        </div>
                    )}

                    {/* Form Input Interaktif */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                Username / Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={dataForm.email}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="Masukkan username atau email terdaftar"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={dataForm.password}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="••••••••"
                                required
                            />
                            
                            {/* 🔑 LINK FORGOT PASSWORD */}
                            <div className="flex justify-end pt-1">
                                <button
                                    type="button"
                                    onClick={() => navigate("/forgot")}
                                    className="text-[11px] font-black text-[#FF6B2C] hover:text-[#1A1A1A] uppercase tracking-wider transition-colors"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </div>

                        {/* Tombol Aksi Form */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF6B2C] hover:bg-[#1A1A1A] text-white font-black py-4 rounded-xl shadow-md shadow-orange-100 transition-all duration-300 uppercase text-xs tracking-widest flex justify-center items-center active:scale-[0.98] mt-2"
                        >
                            {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Login to Dashboard"}
                        </button>
                    </form>

                    {/* Link Pindah ke Halaman Registrasi */}
                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="text-xs font-bold text-[#FF6B2C] hover:text-[#1A1A1A] hover:underline uppercase tracking-wider transition-colors"
                        >
                            Belum punya akun? Registrasi Sekarang
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}