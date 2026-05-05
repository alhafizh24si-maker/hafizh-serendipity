import React from 'react';
import { Outlet } from "react-router-dom";

// Import komponen yang sudah kita ubah sebelumnya
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div 
      id="app-container" 
      className="bg-[#F8FAFC] min-h-screen flex font-poppins"
    >
      {/* Sidebar: 
        Kita biarkan tetap fixed atau sesuai flex-basis dari komponen Sidebar.
        Pastikan Sidebar memiliki border-r untuk pemisahan yang bersih.
      */}
      <Sidebar />
      
      {/* Main Content Area:
        Menggunakan flex-1 agar mengambil sisa ruang layar.
      */}
      <div 
        id="main-content" 
        className="flex-1 flex flex-col min-w-0 overflow-hidden"
      >
        {/* Header: 
          Berisi Search Bar dan Profil. Kita buat sticky agar 
          navigasi atas selalu tersedia saat scrolling.
        */}
        <header className="sticky top-0 z-[40] bg-[#F8FAFC]/80 backdrop-blur-md">
          <Header />
        </header>

        {/* Content Wrapper:
          Di sinilah halaman-halaman seperti Dashboard, Mechanics, 
          dan lainnya akan muncul melalui <Outlet />.
        */}
        <main 
          id="page-wrapper" 
          className="flex-1 overflow-y-auto px-2 pb-8"
        >
          {/* Outlet akan merender component sesuai route di App.jsx */}
          <Outlet />
        </main>
        
        {/* Footer Kecil Internal (Optional) */}
        <footer className="px-8 py-4 text-center text-[10px] text-gray-400 border-t border-gray-100 bg-white/50">
          BengkelGo Fleet Management System v2.0.4 • Made with precision
        </footer>
      </div>
    </div>
  );
}