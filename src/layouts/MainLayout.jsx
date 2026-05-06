import React from 'react';
import { Outlet } from "react-router-dom";

// Import komponen yang sudah kita ubah sebelumnya
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div 
      id="app-container" 
      /* Mengubah bg ke #FDF8F4 agar seragam dengan Header dan Dashboard */
      className="bg-[#FDF8F4] min-h-screen flex font-sans selection:bg-orange-100"
    >
      {/* Sidebar: 
        Pastikan Sidebar menggunakan bg yang senada atau putih bersih 
        dengan rounded corners yang besar jika memungkinkan.
      */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div 
        id="main-content" 
        className="flex-1 flex flex-col min-w-0"
      >
        {/* Header: 
          Dibuat sticky dengan background yang sama agar menyatu.
          Backdrop-blur memberikan efek kaca modern saat konten di-scroll di bawahnya.
        */}
        <header className="sticky top-0 z-[40] bg-[#FDF8F4]/80 backdrop-blur-xl">
          <Header />
        </header>

        {/* Content Wrapper:
          Menghilangkan padding samping yang terlalu ketat agar dashboard 
          bisa mengatur jaraknya sendiri (lebih fleksibel).
        */}
        <main 
          id="page-wrapper" 
          className="flex-1 overflow-y-auto pb-10"
        >
          {/* Outlet merender Dashboard, Mechanics, dll */}
          <Outlet />
        </main>
        
        {/* Footer:
          Disesuaikan dengan gaya Reztro yang minimalis.
          Menggunakan font-black untuk uppercase agar terlihat seperti desain editorial.
        */}
        <footer className="px-10 py-6 text-center">
          <div className="border-t border-orange-100/50 pt-6">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
              BengkelGo Fleet Management System <span className="text-[#FF6B2C]/40">•</span> v2.0.4
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}