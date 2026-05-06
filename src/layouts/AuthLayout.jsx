import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        /* Wrapper utama menggunakan warna latar Reztro (#FDF8F4) 
           untuk memastikan konsistensi dengan desain dashboard.
        */
        <div className="min-h-screen w-full bg-[#FDF8F4] font-jakarta flex items-center justify-center p-4">
            
            {/* Dekorasi halus (Blurry Glow) tetap dipertahankan 
               tapi dengan warna yang lebih menyatu (Soft Orange) 
            */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF6B2C]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF6B2C]/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Main Container: 
               Kita tidak perlu lagi menggunakan card putih di sini 
               karena halaman Login sudah memiliki card-nya sendiri. 
               Cukup render Outlet agar konten Login tampil penuh.
            */}
            <main className="w-full relative z-10 flex flex-col items-center justify-center">
                <Outlet />
            </main>

        </div>
    );
}