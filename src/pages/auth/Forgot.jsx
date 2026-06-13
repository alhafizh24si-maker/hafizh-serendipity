import { useState } from "react";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaWrench, FaArrowLeft } from "react-icons/fa";

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
        /* BACKGROUND MATCH: Menyamakan dengan layout Login */
        <div className="fixed inset-0 z-[9999] bg-[#FDF8F4] font-jakarta overflow-y-auto flex items-center justify-center p-4">
            
            <div className="w-full max-w-[480px] flex flex-col items-center">
                
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-[#FF6B2C] p-2.5 rounded-2xl shadow-lg shadow-[#FF6B2C]/30">
                        <FaWrench className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tighter">
                        BengkelGo<span className="text-[#FF6B2C]">Fix</span>
                    </h1>
                </div>

                {/* Card Forgot Password */}
                <div className="bg-white w-full p-10 md:p-14 rounded-[45px] shadow-xl shadow-[#1a1a1a]/5 border border-white/50">
                    
                    <div className="text-left mb-10">
                        <h2 className="text-[36px] font-black text-[#1A1A1A] tracking-tighter leading-tight mb-2">
                            Forgot Your Password?
                        </h2>
                        <p className="text-sm font-semibold text-gray-400">
                            Masukkan email untuk menerima tautan pemulihan.
                        </p>
                    </div>

                    {/* Alert Error Box */}
                    {error && (
                        <div className="bg-red-50 mb-8 p-4 rounded-2xl flex items-center border border-red-100 animate-shake">
                            <BsFillExclamationDiamondFill className="text-red-600 me-3 text-xl flex-shrink-0" />
                            <span className="text-[11px] font-black text-red-600 uppercase tracking-tight">{error}</span>
                        </div>
                    )}

                    {/* Alert Success Box */}
                    {success && (
                        <div className="bg-green-50 mb-8 p-4 rounded-2xl flex items-center border border-green-100">
                            <BsCheckCircleFill className="text-green-600 me-3 text-xl flex-shrink-0" />
                            <span className="text-[11px] font-black text-green-600 uppercase tracking-tight">
                                Link reset password telah dikirim ke email Anda!
                            </span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2.5">
                            <label className="block text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.2em] ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-6 py-4 bg-[#F9FAFB] border border-gray-100 rounded-[22px] focus:ring-4 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C] outline-none transition-all text-sm font-bold text-[#1A1A1A] placeholder:text-gray-300 shadow-sm"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF6B2C] hover:bg-[#1A1A1A] text-white font-black py-5 rounded-[22px] shadow-2xl shadow-[#FF6B2C]/30 transition-all duration-500 uppercase text-[12px] tracking-[0.2em] flex justify-center items-center active:scale-[0.98]"
                        >
                            {loading ? (
                                <ImSpinner2 className="animate-spin text-2xl" />
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>
                    </form>

                    {/* Back to Login Button */}
                    <div className="mt-8 flex justify-center">
                        <button 
                            onClick={() => navigate("/login")}
                            className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-[#1A1A1A] transition-colors uppercase tracking-widest"
                        >
                            <FaArrowLeft className="text-[10px]" /> Kembali ke Login
                        </button>
                    </div>

                    <div className="mt-14 text-center">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                            Reztro Management System &copy; 2024
                        </p>
                    </div>
                </div>

                {/* Footer Help */}
                <button className="mt-10 text-xs font-black text-gray-400 hover:text-[#FF6B2C] transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-[#FF6B2C]">
                    Butuh bantuan akses? Hubungi Admin
                </button>
            </div>
        </div>
    );
}