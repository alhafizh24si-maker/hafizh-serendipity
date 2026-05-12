import { FaPlus, FaPhone, FaTools, FaStar, FaChevronRight } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Mechanics() {
  const mechanics = [
    { id: 1, name: "Agus Setiawan", skill: "Mesin Mobil", status: "Tersedia", rating: 4.9, jobs: 124 },
    { id: 2, name: "Budi Santoso", skill: "Kelistrikan", status: "Sibuk", rating: 4.8, jobs: 89 },
    { id: 3, name: "Heri Cahyono", skill: "Body Repair", status: "Tersedia", rating: 4.7, jobs: 210 },
  ];

  return (
    /* Background disamakan dengan MainLayout (#FDF8F4) */
    <div className="bg-[#FDF8F4] min-h-screen">
      <PageHeader title="Mekanik" breadcrumb={["Dashboard", "Mechanics"]}>
        {/* Tombol menggunakan warna oranye khas BengkelGo (#FF6B2C) */}
        <button className="bg-[#FF6B2C] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#e85a1f] transition-all shadow-lg shadow-orange-200 active:scale-95">
          <FaPlus size={10} /> Tambah Mekanik
        </button>
      </PageHeader>

      <div className="px-10 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mechanics.map((m) => (
          <div 
            key={m.id} 
            className="bg-white p-8 rounded-[2rem] border border-orange-100/50 hover:border-[#FF6B2C]/30 transition-all group relative overflow-hidden"
          >
            {/* Status Badge dengan gaya minimalis */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                {/* Avatar dengan nuansa oranye muda */}
                <div className="w-16 h-16 bg-[#FDF8F4] border-2 border-orange-50 rounded-2xl flex items-center justify-center text-[#FF6B2C] font-black text-2xl group-hover:bg-[#FF6B2C] group-hover:text-white transition-colors duration-500">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 tracking-tight">{m.name}</h3>
                  <p className="text-[10px] text-[#FF6B2C] font-black uppercase tracking-wider opacity-70">
                    {m.skill}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm ${
                m.status === 'Tersedia' 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'bg-orange-50 text-[#FF6B2C]'
              }`}>
                {m.status}
              </span>
            </div>

            {/* Statistik dengan pembatas tipis */}
            <div className="flex justify-between items-center border-t border-orange-50 pt-5 mt-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1 text-left">Rating</span>
                <div className="flex items-center gap-1.5 text-gray-800 font-black">
                  <FaStar className="text-[#FF6B2C]" size={12} /> 
                  <span>{m.rating}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Total Job</span>
                <div className="text-gray-800 font-black tracking-tight uppercase text-xs">
                  {m.jobs} <span className="text-[10px] font-medium text-gray-400 lowercase">selesai</span>
                </div>
              </div>
            </div>

            {/* Efek Hover: Panah hiasan yang muncul */}
            <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <FaChevronRight className="text-orange-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}