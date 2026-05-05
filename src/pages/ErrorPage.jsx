import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ code, message, description, imageUrl }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#080B12] text-white overflow-hidden font-sans">
      
      {/* Background Glow (Efek cahaya biru/ungu di belakang seperti di gambar) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-10 gap-10">
        
        {/* Sisi Kiri: Teks Error */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-7xl md:text-[8rem] font-black tracking-tighter leading-none mb-2 select-none">
            {code}<span className="text-slate-500">-</span>error
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-4 text-white">
            {message}
          </h2>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-md mb-10 font-light tracking-wide">
            {description}
          </p>
          
          <button
            onClick={() => navigate('/')}
            className="group relative inline-flex items-center justify-center px-10 py-3 font-semibold text-white transition-all duration-300 bg-transparent border border-slate-700 rounded-full hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          >
            Back To Home
          </button>
        </div>

        {/* Sisi Kanan: Visual Astronot */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="animate-float">
            <img 
              src={imageUrl || "https://i.ibb.co/vY8pY8X/astronaut.png"} 
              alt="Error Illustration" 
              className="w-72 md:w-[450px] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            />
          </div>
          
          {/* Dekorasi Bintang */}
          <div className="absolute top-10 right-10 w-2 h-2 bg-yellow-200 rounded-full animate-pulse" />
          <div className="absolute bottom-20 left-0 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-50" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;