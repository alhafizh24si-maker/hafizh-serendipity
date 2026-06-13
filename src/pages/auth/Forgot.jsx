import { useState } from "react";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaWrench, FaArrowLeft, FaKey, FaEnvelopeOpenText, FaHeadset } from "react-icons/fa";

export default function Forgot() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        // Simulasi hit API reset password
        setTimeout(() => {
            if (email.trim() === "") {
                setError("Email tidak boleh kosong.");
                setLoading(false);
            } else {
                setSuccess(true);
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-[#F8FAFC] font-jakarta overflow-y-auto flex items-center justify-center p-4 md:p-6 selection:bg-orange-200">
            {/* 🟢 DUAL CARD WRAPPER CONTAINER */}
            <div className="w-full max-w-[1040px] min-h-[600px] bg-white rounded-[32px] shadow-xl shadow-gray-100/70 border border-gray-100 flex flex-col md:flex-row overflow-hidden">
                
                {/* 1. SEBELAH KIRI: PUSAT BANTUAN & INFORMASI KEAMANAN */}
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

                    {/* Alur Pemulihan Keamanan */}
                    <div className="my-10 md:my-0 space-y-6 relative z-10">
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight max-w-xs">
                            Amankan Kembali Akses Akun Anda.
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                            Jangan khawatir, ikuti langkah standardisasi keamanan berikut untuk memulihkan kontrol penuh atas dasbor perbengkelan Anda.
                        </p>

                        {/* List Alur Reset */}
                        <div className="pt-2 space-y-4">
                            <div className="flex items-center gap-3.5 text-xs font-bold text-gray-300">
                                <FaKey className="text-[#FF6B2C] text-base flex-shrink-0" />
                                <span>Ketik email terdaftar pada form sistem</span>
                            </div>
                            <div className="flex items-center gap-3.5 text-xs font-bold text-gray-300">
                                <FaEnvelopeOpenText className="text-[#FF6B2C] text-base flex-shrink-0" />
                                <span>Periksa kotak masuk/folder spam email</span>
                            </div>
                            <div className="flex items-center gap-3.5 text-xs font-bold text-gray-300">
                                <FaHeadset className="text-[#FF6B2C] text-base flex-shrink-0" />
                                <span>Gunakan tautan unik pembaruan kata sandi</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Hak Cipta */}
                    <div className="relative z-10 pt-4 border-t border-white/10">
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                            Reztro Management System &copy; 2026
                        </p>
                    </div>
                </div>

                {/* 2. SEBELAH KANAN: FORM PEMULIHAN AKSES */}
                <div className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center bg-white">
                    <div className="text-left mb-8">
                        <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tighter mb-1.5">
                            Forgot Your Password?
                        </h2>
                        <p className="text-xs font-bold text-gray-400">
                            Masukkan email terdaftar untuk menerima tautan pemulihan kata sandi.
                        </p>
                    </div>

                    {/* Banner Notifikasi Error */}
                    {error && (
                        <div className="bg-rose-50 mb-6 p-4 rounded-xl flex items-center border border-rose-100 animate-shake">
                            <BsFillExclamationDiamondFill className="text-rose-600 me-3 text-lg flex-shrink-0" />
                            <span className="text-[10px] font-black text-rose-700 uppercase tracking-wide">{error}</span>
                        </div>
                    )}

                    {/* Banner Notifikasi Sukses */}
                    {success && (
                        <div className="bg-emerald-50 mb-6 p-4 rounded-xl flex items-center border border-emerald-100">
                            <BsCheckCircleFill className="text-emerald-600 me-3 text-lg flex-shrink-0" />
                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wide">
                                Link reset password telah dikirim ke email Anda!
                            </span>
                        </div>
                    )}

                    {/* Form Input */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        {/* Tombol Kirim */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF6B2C] hover:bg-[#1A1A1A] text-white font-black py-4 rounded-xl shadow-md shadow-orange-100 transition-all duration-300 uppercase text-xs tracking-widest flex justify-center items-center active:scale-[0.98] mt-2"
                        >
                            {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Send Reset Link"}
                        </button>
                    </form>

                    {/* Navigasi Kembali ke Login */}
                    <div className="mt-6 text-center flex flex-col items-center gap-4">
                        <button 
                            onClick={() => navigate("/login")}
                            className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#FF6B2C] transition-colors uppercase tracking-widest"
                        >
                            <FaArrowLeft className="text-[9px]" /> Kembali ke Login
                        </button>
                        
                        <div className="w-full border-t border-gray-100 pt-5 mt-2">
                            <button className="text-[10px] font-black text-gray-400 hover:text-[#FF6B2C] transition-colors uppercase tracking-widest border-b border-transparent hover:border-[#FF6B2C]/40">
                                Butuh bantuan akses? Hubungi Admin Support
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}