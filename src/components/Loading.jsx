export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Custom CSS untuk Animasi */}
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .spin-slow { animation: spin-slow 2s linear infinite; }
                .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                .fade-in-up { animation: fade-in-up 0.8s ease-out forwards; animation-delay: 0.3s; opacity: 0; }
            `}</style>

            {/* Background Ambient Glow */}
            <div className="absolute w-72 h-72 bg-orange-500/10 rounded-full filter blur-3xl pulse-glow"></div>

            {/* Logo & Spinner Container */}
            <div className="relative w-32 h-32 flex justify-center items-center mb-8">
                {/* Outer Spinner Ring */}
                <div className="absolute inset-0 rounded-full border-[3px] border-orange-500/10"></div>
                <div className="absolute inset-0 rounded-full border-t-[3px] border-r-[3px] border-orange-500 spin-slow"></div>
                
                {/* Inner Spinner Ring (Opposite Direction) */}
                <div className="absolute inset-3 rounded-full border-[2px] border-orange-400/5"></div>
                <div className="absolute inset-3 rounded-full border-b-[2px] border-l-[2px] border-orange-400/80 spin-slow" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>

                {/* Logo */}
                <img 
                    src="https://i.ibb.co.com/p6V6jVXL/logo-Bengkel-GO.png" 
                    alt="BengkelGoFix" 
                    className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(249,115,22,0.6)] relative z-10"
                />
            </div>

            {/* Text Branding */}
            <div className="fade-in-up text-center relative z-10">
                <h1 className="text-2xl font-extrabold text-white tracking-wider">
                    BengkelGo<span className="text-orange-500">Fix</span>
                </h1>
                <p className="text-gray-500 text-xs tracking-[0.3em] mt-2 uppercase font-medium">
                    Memuat Sistem...
                </p>
            </div>
        </div>
    );
}