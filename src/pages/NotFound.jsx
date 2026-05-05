import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa'; // Ditambahkan FaExclamationTriangle

const ErrorPage = ({ code, message, description, imageUrl }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 flex items-center justify-center">
      {/* Background Decor - Bubble Effects */}
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-green-200 blur-[120px] opacity-50" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-200 blur-[150px] opacity-50" />

      <div className="relative z-10 flex flex-col items-center p-6 text-center">
        {/* Ilustrasi / Icon Section */}
        <div className="relative mb-8">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Error ${code}`}
              className="relative w-full max-w-[320px] drop-shadow-2xl animate-pulse"
            />
          ) : (
            <div className="bg-red-50 p-8 rounded-full shadow-inner animate-bounce">
              <FaExclamationTriangle className="text-7xl text-red-500" />
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="relative mb-10">
          {/* Background Big Text */}
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[15rem] font-black text-slate-200/50 select-none -z-10">
            {code}
          </h1>
          
          <h2 className="mb-3 text-4xl font-extrabold text-slate-900 md:text-6xl tracking-tight">
            {message}
          </h2>
          
          <p className="mx-auto max-w-lg text-lg leading-relaxed text-slate-500 font-medium">
            {description || "Oops! Sepertinya terjadi kesalahan yang tidak terduga. Mari kembali ke dashboard atau hubungi admin."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="group flex items-center gap-3 rounded-2xl bg-green-600 px-10 py-4 font-bold text-white shadow-xl shadow-green-200 transition-all hover:bg-green-700 hover:scale-105 active:scale-95"
          >
            <FaHome className="text-xl group-hover:rotate-12 transition-transform" />
            Back to Dashboard
          </Link>
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white/80 backdrop-blur-md px-10 py-4 font-bold text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-white hover:scale-105 active:scale-95"
          >
            <FaArrowLeft className="animate-pulse" />
            Previous Page
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-16 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-400 border border-slate-200">
          <span className="h-2 w-2 rounded-full bg-red-400 animate-ping"></span>
          ERROR ID: <span className="text-slate-600 font-mono italic">#ERR-{Math.floor(Math.random() * 10000)}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;