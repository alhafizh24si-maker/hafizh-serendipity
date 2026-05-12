import React from 'react';
import { FaMapMarkerAlt, FaPlus, FaSatellite } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function CoverageArea() {
  const areas = [
    { city: "Pekanbaru Kota", zones: ["Senapelan", "Sukajadi", "Limapuluh"], activeMechanics: 12 },
    { city: "Tampan & Payung Sekaki", zones: ["Panam", "Labuh Baru", "Air Hitam"], activeMechanics: 10 },
    { city: "Bukit Raya", zones: ["Simpang Tiga", "Tangkerang"], activeMechanics: 6 },
  ];

  const mapCenter = "0.5071,101.4478"; 
  const zoomLevel = "13"; 

  return (
    <div className="bg-[#FDF8F4] min-h-screen">
      <PageHeader title="Area Jangkauan" breadcrumb={["System", "Coverage Area"]} />
      
      <div className="px-10 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Kolom Kiri: Daftar Wilayah (Spans 5 columns) */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-orange-100/50 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 tracking-tight">
                <FaMapMarkerAlt className="text-[#FF6B2C]" /> Wilayah Aktif
                </h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Pekanbaru, Riau</p>
            </div>
            <button className="text-[10px] font-black text-[#FF6B2C] uppercase tracking-widest hover:opacity-70 transition-opacity">
                Lihat Semua
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {areas.map((a, i) => (
              <div key={i} className="p-5 bg-[#FDF8F4]/50 rounded-[1.5rem] flex justify-between items-center group hover:bg-white hover:shadow-xl hover:shadow-orange-100/50 transition-all border border-transparent hover:border-orange-100">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#FF6B2C] group-hover:scale-110 transition-all duration-500">
                        <FaMapMarkerAlt size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 tracking-tight text-md">{a.city}</h4>
                        <p className="text-[10px] text-[#FF6B2C] font-black uppercase tracking-wider opacity-60 mt-0.5">{a.zones.join(" • ")}</p>
                    </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black text-white bg-[#FF6B2C] px-3 py-1.5 rounded-full shadow-md shadow-orange-200">
                    {a.activeMechanics} MEKANIK
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full py-5 border-2 border-dashed border-orange-100 rounded-[1.5rem] text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:border-[#FF6B2C] hover:text-[#FF6B2C] hover:bg-orange-50/50 transition-all group">
            <FaPlus size={10} className="group-hover:rotate-90 transition-transform" /> Tambah Wilayah Baru
          </button>
        </div>
        
        {/* Kolom Kanan: Map (Spans 7 columns) */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-orange-100/50 min-h-[550px] border-[12px] border-white group">
          
         {/* Ubah bagian src pada iframe Anda menjadi seperti ini */}
<iframe
  title="Google Maps Pekanbaru"
  width="100%"
  height="100%"
  style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  /* Perbaikan: Menggunakan format embed standar Google Maps */
  src={`https://maps.google.com/maps?q=${mapCenter}&z=${zoomLevel}&output=embed`}
></iframe>
          {/* Note: Ganti URL src dengan link embed maps yang valid jika menggunakan API Key */}

          {/* Floating Status Bar */}
          <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/50 flex items-center justify-between transition-all duration-700 group-hover:bottom-10">
            <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-[#FF6B2C] rounded-full animate-pulse"></div>
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Fleet Tracking</p>
                    <h3 className="text-sm font-black text-gray-900 tracking-tight">Pekanbaru City Center</h3>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="flex -space-x-3 mr-2">
                    {[1, 2, 3].map((i) => (
                        <img 
                            key={i}
                            className="w-9 h-9 rounded-full border-2 border-white object-cover" 
                            src={`https://randomuser.me/api/portraits/men/${i + 40}.jpg`} 
                            alt="mechanic"
                        />
                    ))}
                    <div className="w-9 h-9 rounded-full border-2 border-white bg-[#FF6B2C] flex items-center justify-center text-[10px] text-white font-black">
                        +28
                    </div>
                </div>
            </div>
          </div>

          <div className="absolute top-6 right-6 bg-gray-900/80 backdrop-blur-md text-white text-[9px] px-4 py-2 rounded-full font-black uppercase tracking-widest flex items-center gap-2">
            <FaSatellite className="text-[#FF6B2C]" /> Satellite Mode Active
          </div>
        </div>

      </div>
    </div>
  );
}