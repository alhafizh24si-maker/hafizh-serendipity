import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaWrench } from "react-icons/fa";
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
            // Melakukan request login mencocokkan ke tabel users_bengkel
            const userRecords = await supabaseAPI.loginUser(dataForm.email, dataForm.password);

            if (userRecords && userRecords.length > 0) {
                const userData = userRecords[0];

                // Simpan session login tiruan ke lokal browser Anda
                localStorage.setItem("token", "supabase-session-active-token");
                localStorage.setItem("user", JSON.stringify({ email: userData.email, id: userData.id }));

                // Alihkan ke Dashboard utama setelah sukses login
                navigate("/dashboard");
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
                            Login to Your Account
                        </h2>
                        <p className="text-sm font-semibold text-gray-400">
                            Selamat datang kembali di BengkelGoFix!
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 mb-8 p-4 rounded-2xl flex items-center border border-red-100">
                            <BsFillExclamationDiamondFill className="text-red-600 me-3 text-xl flex-shrink-0" />
                            <span className="text-[11px] font-black text-red-600 uppercase tracking-tight">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2.5">
                            <label className="block text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.2em] ml-1">
                                Username / Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={dataForm.email}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-[22px] focus:ring-4 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C] outline-none transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="Masukkan username atau email terdaftar"
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF6B2C] hover:bg-[#1A1A1A] text-white font-black py-5 rounded-[22px] shadow-2xl shadow-[#FF6B2C]/30 transition-all duration-500 uppercase text-[12px] tracking-[0.2em] flex justify-center items-center active:scale-[0.98]"
                        >
                            {loading ? <ImSpinner2 className="animate-spin text-2xl" /> : "Login to Dashboard"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                            className="text-xs font-bold text-[#FF6B2C] hover:underline uppercase tracking-wider"
                        >
                            Belum punya akun? Registrasi Sekarang
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