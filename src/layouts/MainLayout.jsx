import React from 'react';
import { Outlet } from "react-router-dom";

// Import komponen yang sudah kita ubah sebelumnya
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div 
      id="app-container" 
      /* 🟢 PERBAIKAN 1: Mengubah bg ke #F8FAFC agar seragam dengan abu-abu terang Header */
      className="bg-[#F8FAFC] min-h-screen flex font-sans selection:bg-orange-100"
    >
      {/* Sidebar: 
        Sidebar Anda tetap menggunakan bg-white bawaan komponen agar kontrasnya bagus.
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
        {/* 🟢 PERBAIKAN 2: Mengubah bg kaca pembungkus header menjadi #F8FAFC/80 */}
        <header className="sticky top-0 z-[40] bg-[#F8FAFC]/80 backdrop-blur-xl">
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
          {/* Outlet merender Dashboard, Mechanics, Customers, dll */}
          <Outlet />
        </main>
        
        {/* Footer:
          Disesuaikan dengan gaya yang minimalis.
          Menggunakan font-black untuk uppercase agar terlihat seperti desain editorial.
        */}
        <footer className="px-10 py-6 text-center">
          {/* 🟢 PERBAIKAN 3: Mengubah border pemisah footer menjadi abu-abu tipis (gray-100) agar serasi */}
          <div className="border-t border-gray-200/60 pt-6">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
              BengkelGo Fleet Management System <span className="text-[#FF6B2C]/40">•</span> v2.0.4
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}