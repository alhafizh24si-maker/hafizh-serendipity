import { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaPlus, FaSatellite, FaTimes } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function CoverageArea() {
  const initialAreas = [
    { id: 1, city: "Pekanbaru Kota", zones: ["Senapelan", "Sukajadi", "Limapuluh"], activeMechanics: 12, coords: "0.5312,101.4428", zoom: "14" },
    { id: 2, city: "Tampan & Payung Sekaki", zones: ["Panam", "Labuh Baru", "Air Hitam"], activeMechanics: 10, coords: "0.4792,101.3789", zoom: "14" },
    { id: 3, city: "Bukit Raya", zones: ["Simpang Tiga", "Tangkerang"], activeMechanics: 6, coords: "0.4682,101.4556", zoom: "14" },
  ];

  // HOOK: useState untuk mengelola data list area secara dinamis
  const [areas, setAreas] = useState(initialAreas);
  const [mapCenter, setMapCenter] = useState("0.5071,101.4478");
  const [zoomLevel, setZoomLevel] = useState("12");

  // HOOK BARU: useState untuk mengontrol buka/tutup modal form tambah wilayah
  const [isModalOpen, setIsModalOpen] = useState(false);

  // HOOK BARU: useState untuk menampung input dari form tambah wilayah
  const [newArea, setNewArea] = useState({ city: "", zones: "", coords: "" });

  const mapFrameRef = useRef(null);
  
  // HOOK BARU: useRef untuk otomatis focus ke input kota saat modal terbuka
  const inputCityRef = useRef(null);

  useEffect(() => {
    if (mapFrameRef.current) {
      const container = mapFrameRef.current.parentElement;
      container.classList.add("border-[#FF6B2C]");
      const timeout = setTimeout(() => {
        container.classList.remove("border-[#FF6B2C]");
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [mapCenter, zoomLevel]);

  // HOOK BARU: useEffect untuk mendeteksi ketika modal terbuka, langsung focus kursor
  useEffect(() => {
    if (isModalOpen && inputCityRef.current) {
      inputCityRef.current.focus();
    }
  }, [isModalOpen]);

  const handleAreaSelect = (coords, zoom) => {
    setMapCenter(coords);
    setZoomLevel(zoom);
  };

  const handleResetView = () => {
    setMapCenter("0.5071,101.4478");
    setZoomLevel("12");
    mapFrameRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // FUNGSI BARU: Menangani submit form wilayah baru ke dalam state CRM
  const handleAddAreaSubmit = (e) => {
    e.preventDefault();
    if (!newArea.city || !newArea.zones) return;

    // Bersihkan input zona dari string menjadi array (dipisah koma)
    const zoneArray = newArea.zones.split(",").map(zone => zone.trim());
    
    // Jika koordinat kosong, beri koordinat default pusat kota Pekanbaru
    const finalCoords = newArea.coords.trim() || "0.5071,101.4478";

    const newlyCreatedArea = {
      id: Date.now(),
      city: newArea.city,
      zones: zoneArray,
      activeMechanics: 0, // Default awal mekanik kosong
      coords: finalCoords,
      zoom: "14"
    };

    setAreas([...areas, newlyCreatedArea]); // Masukkan data baru ke list
    setNewArea({ city: "", zones: "", coords: "" }); // Reset isi form
    setIsModalOpen(false); // Tutup modal pop-up
    setMapCenter(finalCoords); // Langsung arahkan peta ke lokasi baru tersebut
  };

  return (
    <div className="bg-[#FDF8F4] min-h-screen relative">
      <PageHeader title="Area Jangkauan" breadcrumb={["System", "Coverage Area"]} />
      
      <div className="px-10 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Kolom Kiri: Daftar Wilayah */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-orange-100/50 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 tracking-tight">
                <FaMapMarkerAlt className="text-[#FF6B2C]" /> Wilayah Aktif
              </h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Pekanbaru, Riau</p>
            </div>
            <button 
              onClick={handleResetView}
              className="text-[10px] font-black text-[#FF6B2C] uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              Reset View
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {areas.map((a) => (
              <div 
                key={a.id} 
                onClick={() => handleAreaSelect(a.coords, a.zoom)}
                className={`p-5 rounded-[1.5rem] flex justify-between items-center group cursor-pointer transition-all border ${
                  mapCenter === a.coords 
                    ? "bg-orange-50/50 border-[#FF6B2C] shadow-lg shadow-orange-100/30" 
                    : "bg-[#FDF8F4]/50 border-transparent hover:bg-white hover:shadow-xl hover:shadow-orange-100/50 hover:border-orange-100"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm transition-all duration-500 ${
                    mapCenter === a.coords ? "text-[#FF6B2C] scale-110" : "text-gray-400 group-hover:text-[#FF6B2C] group-hover:scale-110"
                  }`}>
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 tracking-tight text-md">{a.city}</h4>
                    <p className="text-[10px] text-[#FF6B2C] font-black uppercase tracking-wider opacity-60 mt-0.5">
                      {a.zones.join(" • ")}
                    </p>
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

          {/* AKTIF: Tombol sekarang mengubah state isModalOpen menjadi true */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-8 w-full py-5 border-2 border-dashed border-orange-100 rounded-[1.5rem] text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:border-[#FF6B2C] hover:text-[#FF6B2C] hover:bg-orange-50/50 transition-all group"
          >
            <FaPlus size={10} className="group-hover:rotate-90 transition-transform" /> Tambah Wilayah Baru
          </button>
        </div>
        
        {/* Kolom Kanan: Google Maps Map Box */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-orange-100/50 min-h-[550px] border-[12px] border-white transition-all duration-500 group">
          <iframe
            ref={mapFrameRef}
            title="Google Maps Pekanbaru"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0.1) contrast(1.05)' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${mapCenter}&z=${zoomLevel}&output=embed`}
          ></iframe>

          {/* Floating Status Bar */}
          <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/50 flex items-center justify-between transition-all duration-700 group-hover:bottom-10">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-[#FF6B2C] rounded-full animate-pulse"></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Fleet Tracking</p>
                <h3 className="text-sm font-black text-gray-900 tracking-tight">
                  {mapCenter === "0.5071,101.4478" ? "Pekanbaru City Center" : `Koordinat: ${mapCenter}`}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3 mr-2">
                {[1, 2, 3].map((i) => (
                  <img 
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover" 
                    src={`https://randomuser.me/api/portraits/men/${i + 43}.jpg`} 
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

      {/* POP-UP MODAL FORM: Hanya muncul jika isModalOpen === true */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
          <div className="bg-white rounded-[2.5rem] border border-orange-100 p-8 max-w-md w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#FF6B2C]" /> Tambah Wilayah Operasional
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleAddAreaSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Nama Kota / Distrik</label>
                <input 
                  ref={inputCityRef} // LINKED REF: Fokus otomatis ke sini saat modal muncul
                  type="text"
                  required
                  placeholder="Contoh: Rumbai Pesisir"
                  value={newArea.city}
                  onChange={(e) => setNewArea({ ...newArea, city: e.target.value })}
                  className="w-full border border-orange-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2C] font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Zona Wilayah (Pisahkan dengan koma)</label>
                <input 
                  type="text"
                  required
                  placeholder="Contoh: Limbungan, Meranti Pandak"
                  value={newArea.zones}
                  onChange={(e) => setNewArea({ ...newArea, zones: e.target.value })}
                  className="w-full border border-orange-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2C] font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Titik Koordinat Google Maps (Opsional)</label>
                <input 
                  type="text"
                  placeholder="Contoh: 0.5634,101.4390"
                  value={newArea.coords}
                  onChange={(e) => setNewArea({ ...newArea, coords: e.target.value })}
                  className="w-full border border-orange-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF6B2C] font-medium"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 text-gray-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-[#FF6B2C] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#e85a1f] shadow-lg shadow-orange-200 transition-all"
                >
                  Simpan Wilayah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}