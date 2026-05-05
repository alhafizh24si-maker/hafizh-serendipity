import React from 'react';
import { FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function CoverageArea() {
  // Data wilayah diubah menjadi area di Pekanbaru
  const areas = [
    { city: "Pekanbaru Kota", zones: ["Senapelan", "Sukajadi", "Limapuluh"], activeMechanics: 12 },
    { city: "Tampan & Payung Sekaki", zones: ["Panam", "Labuh Baru", "Air Hitam"], activeMechanics: 10 },
    { city: "Bukit Raya", zones: ["Simpang Tiga", "Tangkerang"], activeMechanics: 6 },
  ];

  // Koordinat Pekanbaru (Pusat Kota)
  // Latitude: 0.5071, Longitude: 101.4478
  const mapCenter = "0.5071,101.4478"; 
  const zoomLevel = "13"; // Zoom sedikit lebih dalam agar jalanan kota terlihat jelas

  return (
    <div className="pb-10 bg-gray-50 min-h-screen">
      <PageHeader title="Area Jangkauan" breadcrumb={["System", "Coverage Area"]} />
      
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom Kiri: Daftar Wilayah */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <FaMapMarkerAlt className="text-emerald-500" /> Daftar Wilayah Aktif (Pekanbaru)
            </h2>
            <button className="text-xs font-bold text-emerald-600 hover:underline">Lihat Semua</button>
          </div>

          <div className="space-y-4 flex-1">
            {areas.map((a, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center group hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:text-emerald-500">
                        <FaMapMarkerAlt />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800">{a.city}</h4>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{a.zones.join(", ")}</p>
                    </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600 bg-white px-3 py-1 rounded-lg shadow-sm">{a.activeMechanics} Mekanik</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-sm flex items-center justify-center gap-2 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
            <FaPlus size={12} /> Tambah Wilayah Baru
          </button>
        </div>
        
        {/* --- KOLOM KANAN: GOOGLE MAPS INTERAKTIF PEKANBARU --- */}
        <div className="bg-white rounded-[32px] relative overflow-hidden shadow-2xl min-h-[450px] border-8 border-white group">
          
          <iframe
            title="Google Maps Pekanbaru"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            // Menggunakan koordinat Pekanbaru
            src={`https://www.google.com/maps?q=${mapCenter}&z=${zoomLevel}&output=embed`}
          ></iframe>

          {/* Overlay Status Bar */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center justify-between pointer-events-none transition-transform group-hover:-translate-y-2">
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Monitoring</p>
                <h3 className="text-sm font-bold text-blue-900">Pekanbaru & Sekitarnya</h3>
            </div>
            <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                    <img 
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" 
                        src={`https://randomuser.me/api/portraits/men/${i + 30}.jpg`} 
                        alt="mechanic"
                    />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">
                    +15
                </div>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-blue-900 text-white text-[10px] px-3 py-1.5 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            Area Pekanbaru Terpusat
          </div>
        </div>
      </div>
    </div>
  );
}