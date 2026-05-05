import { Outlet } from "react-router-dom";
import { FaWrench } from "react-icons/fa";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-900 relative overflow-hidden">
            {/* Dekorasi Background agar tidak flat (Opsional) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="bg-white p-10 rounded-[32px] shadow-2xl w-full max-w-md z-10 mx-4 border border-white/20">
                {/* Logo Section */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="bg-blue-900 p-3 rounded-2xl text-white mb-4 shadow-lg shadow-blue-900/20">
                        <FaWrench size={28} />
                    </div>
                    <h1 className="text-3xl font-poppins font-extrabold tracking-tight">
                        <span className="text-blue-900">BENGKEL</span>
                        <span className="text-emerald-500">GO</span>
                    </h1>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-[0.2em] mt-1">
                        Admin Central
                    </p>
                </div>

                {/* Konten Form (Login/Register/Forgot) */}
                <div className="min-h-[300px]">
                    <Outlet />
                </div>

                {/* Footer */}
                <div className="mt-10 pt-6 border-t border-gray-100">
                    <p className="text-center text-[11px] text-gray-400 font-medium">
                        © 2026 <span className="font-bold text-blue-900/50">BENGKELGO</span> SYSTEM. 
                        <br />All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}