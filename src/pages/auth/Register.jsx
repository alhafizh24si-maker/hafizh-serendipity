import { useState } from "react";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaWrench, FaArrowLeft } from "react-icons/fa";
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
        <div className="fixed inset-0 z-[9999] bg-[#FDF8F4] font-jakarta overflow-y-auto flex items-center justify-center p-4">
            <div className="w-full max-w-[480px] flex flex-col items-center">
                
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-[#FF6B2C] p-2.5 rounded-2xl shadow-lg shadow-[#FF6B2C]/30">
                        <FaWrench className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tighter">
                        BengkelGo<span className="text-[#FF6B2C]">Fix</span>
                    </h1>
                </div>

                <div className="bg-white w-full p-10 md:p-14 rounded-[45px] shadow-xl shadow-[#1a1a1a]/5 border border-white/50">
                    <div className="text-left mb-10">
                        <h2 className="text-[36px] font-black text-[#1A1A1A] tracking-tighter leading-tight mb-2">
                            Create Your Account
                        </h2>
                        <p className="text-sm font-semibold text-gray-400">
                            Bergabunglah untuk mengelola data perbengkelan.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 mb-8 p-4 rounded-2xl flex items-center border border-red-100">
                            <BsFillExclamationDiamondFill className="text-red-600 me-3 text-xl flex-shrink-0" />
                            <span className="text-[11px] font-black text-red-600 uppercase tracking-tight">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 mb-8 p-4 rounded-2xl flex items-center border border-green-100">
                            <BsCheckCircleFill className="text-green-600 me-3 text-xl flex-shrink-0" />
                            <span className="text-[11px] font-black text-green-600 uppercase tracking-tight">
                                Akun sukses dibuat! Mengalihkan ke Login...
                            </span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2.5">
                            <label className="block text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.2em] ml-1">
                                Username / Email Address
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={dataForm.email}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-[22px] focus:ring-4 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C] outline-none transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="you@example.com atau username"
                                required
                            />
                        </div>

                        <div className="space-y-2.5">
                            <label className="block text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.2em] ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={dataForm.password}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-[22px] focus:ring-4 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C] outline-none transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="space-y-2.5">
                            <label className="block text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.2em] ml-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={dataForm.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-[22px] focus:ring-4 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C] outline-none transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF6B2C] hover:bg-[#1A1A1A] text-white font-black py-5 rounded-[22px] shadow-2xl shadow-[#FF6B2C]/30 transition-all duration-500 uppercase text-[12px] tracking-[0.2em] flex justify-center items-center active:scale-[0.98] mt-4"
                        >
                            {loading ? <ImSpinner2 className="animate-spin text-2xl" /> : "Register Account"}
                        </button>
                    </form>

                    <div className="mt-8 flex justify-center">
                        <button 
                            onClick={() => navigate("/login")}
                            className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#1A1A1A] transition-colors uppercase tracking-widest"
                        >
                            <FaArrowLeft className="text-[10px]" /> Sudah punya akun? Login
                        </button>
                    </div>

                    <div className="mt-14 text-center">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                            Reztro Management System &copy; 2024
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}