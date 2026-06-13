import { useState } from "react";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaWrench, FaArrowLeft, FaUserPlus, FaShieldAlt, FaBriefcase } from "react-icons/fa";
import { supabaseAPI } from "../../services/supabaseAPI"; 

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Konfirmasi password tidak cocok dengan password utama.");
            setLoading(false);
            return;
        }

        try {
            // Cek ketersediaan email/username di tabel users_bengkel
            const emailExists = await supabaseAPI.checkEmailExists(dataForm.email);
            if (emailExists) {
                setError("Username / Email ini sudah terdaftar. Silakan gunakan yang lain.");
                setLoading(false);
                return;
            }

            const payload = {
                email: dataForm.email,
                password: dataForm.password
            };

            // Kirim data baru ke database
            await supabaseAPI.registerUser(payload);

            setSuccess(true);
            setDataForm({ email: "", password: "", confirmPassword: "" });

            // Pindah otomatis ke halaman login setelah sukses
            setTimeout(() => navigate("/login"), 2000);

        } catch (err) {
            setError(err.response?.data?.message || "Gagal mendaftar. Periksa kembali struktur tabel Anda.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-[#F8FAFC] font-jakarta overflow-y-auto flex items-center justify-center p-4 md:p-6 selection:bg-orange-200">
            {/* 🟢 DUAL CARD WRAPPER CONTAINER */}
            <div className="w-full max-w-[1040px] min-h-[680px] bg-white rounded-[32px] shadow-xl shadow-gray-100/70 border border-gray-100 flex flex-col md:flex-row overflow-hidden">
                
                {/* 1. SEBELAH KIRI: INFORMASI & KEUNTUNGAN BERGABUNG */}
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

                    {/* Konten Edukasi/Benefit Pendaftaran */}
                    <div className="my-10 md:my-0 space-y-6 relative z-10">
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight max-w-xs">
                            Mulai Langkah Digitalisasi Bengkel Anda.
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                            Dapatkan akses penuh ke dasbor administrasi cerdas untuk mengoptimalkan alur kerja tim montir dan efisiensi rantai pasok logistik.
                        </p>

                        {/* Keuntungan Gabung */}
                        <div className="pt-4 space-y-4">
                            <div className="flex items-start gap-3.5 text-xs font-bold text-gray-300">
                                <FaUserPlus className="text-[#FF6B2C] text-base mt-0.5 flex-shrink-0" />
                                <div>
                                    <p>Akses Multi-Akun Admin</p>
                                    <p className="text-[10px] text-gray-500 font-medium normal-case mt-0.5">Kelola hak akses untuk tim kasir maupun kepala gudang.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5 text-xs font-bold text-gray-300">
                                <FaBriefcase className="text-[#FF6B2C] text-base mt-0.5 flex-shrink-0" />
                                <div>
                                    <p>Integrasi database Supabase</p>
                                    <p className="text-[10px] text-gray-500 font-medium normal-case mt-0.5">Sinkronisasi data inventaris aman dan instan tanpa jeda.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5 text-xs font-bold text-gray-300">
                                <FaShieldAlt className="text-[#FF6B2C] text-base mt-0.5 flex-shrink-0" />
                                <div>
                                    <p>Standarisasi Keamanan CRM</p>
                                    <p className="text-[10px] text-gray-500 font-medium normal-case mt-0.5">Sistem enkripsi end-to-end untuk melindungi privasi konsumen.</p>
                                </div>
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

                {/* 2. SEBELAH KANAN: FORM REGISTRASI AKUN */}
                <div className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center bg-white">
                    <div className="text-left mb-6">
                        <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tighter mb-1.5">
                            Create Your Account
                        </h2>
                        <p className="text-xs font-bold text-gray-400">
                            Bergabunglah untuk mengelola data perbengkelan secara profesional.
                        </p>
                    </div>

                    {/* Banner Notifikasi Error */}
                    {error && (
                        <div className="bg-rose-50 mb-5 p-3.5 rounded-xl flex items-center border border-rose-100 animate-shake">
                            <BsFillExclamationDiamondFill className="text-rose-600 me-3 text-lg flex-shrink-0" />
                            <span className="text-[10px] font-black text-rose-700 uppercase tracking-wide">{error}</span>
                        </div>
                    )}

                    {/* Banner Notifikasi Sukses */}
                    {success && (
                        <div className="bg-emerald-50 mb-5 p-3.5 rounded-xl flex items-center border border-emerald-100">
                            <BsCheckCircleFill className="text-emerald-600 me-3 text-lg flex-shrink-0" />
                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wide">
                                Akun sukses dibuat! Mengalihkan ke Login...
                            </span>
                        </div>
                    )}

                    {/* Form Registrasi */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                Username / Email Address
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={dataForm.email}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-[#F8FAFC] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="you@example.com atau username"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={dataForm.password}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-[#F8FAFC] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={dataForm.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-[#F8FAFC] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Tombol Kirim Form */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF6B2C] hover:bg-[#1A1A1A] text-white font-black py-3.5 rounded-xl shadow-md shadow-orange-100 transition-all duration-300 uppercase text-xs tracking-widest flex justify-center items-center active:scale-[0.98] mt-4"
                        >
                            {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Register Account"}
                        </button>
                    </form>

                    {/* Tombol Navigasi Kembali ke Login */}
                    <div className="mt-5 flex justify-center">
                        <button 
                            onClick={() => navigate("/login")}
                            className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#FF6B2C] transition-colors uppercase tracking-widest"
                        >
                            <FaArrowLeft className="text-[9px]" /> Sudah punya akun? Login
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}