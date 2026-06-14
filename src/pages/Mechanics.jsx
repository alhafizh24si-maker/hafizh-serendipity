import { useState, useEffect, useRef } from "react"; // HOOK: Mengimport hooks yang diperlukan
import { FaPlus, FaStar, FaChevronRight } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Mechanics() {
  // HOOK: useState untuk mengelola data list mekanik (State Utama)
  const [mechanics, setMechanics] = useState([]);
  
  // HOOK: useState untuk mengontrol form input mekanik baru
  const [newMechanic, setNewMechanic] = useState({ name: "", skill: "" });

  // HOOK: useRef untuk memberikan auto-focus pada input nama saat tombol ditekan
  const inputNamaRef = useRef(null);

  // HOOK: useEffect untuk mensimulasikan Fetching Data dari API CRM saat halaman dimuat
  useEffect(() => {
    // Simulasi memanggil API backend BengkelGo dengan delay 1 detik
    const fetchMechanicsData = () => {
      setTimeout(() => {
        const mockDataFromAPI = [
          { id: 1, name: "Agus Setiawan", skill: "Mesin Mobil", status: "Tersedia", rating: 4.9, jobs: 124 },
          { id: 2, name: "Budi Santoso", skill: "Kelistrikan", status: "Sibuk", rating: 4.8, jobs: 89 },
          { id: 3, name: "Heri Cahyono", skill: "Body Repair", status: "Tersedia", rating: 4.7, jobs: 210 },
        ];
        setMechanics(mockDataFromAPI); // Mengisi state dengan data dari "API"
      }, 1000); 
    };

    fetchMechanicsData();
  }, []); // Dependency array kosong [] artinya hanya berjalan 1x saat page di-mount

  // Fungsi Handler untuk menambah mekanik baru ke dalam state
  const handleAddMechanic = (e) => {
    e.preventDefault();
    if (!newMechanic.name || !newMechanic.skill) return;

    const newEntry = {
      id: Date.now(),
      name: newMechanic.name,
      skill: newMechanic.skill,
      status: "Tersedia",
      rating: 5.0,
      jobs: 0
    };

    setMechanics([newEntry, ...mechanics]); // Menambah data baru ke list
    setNewMechanic({ name: "", skill: "" }); // Reset form
    
    // HOOK: Menggunakan useRef untuk mengembalikan fokus kursor ke input nama
    inputNamaRef.current.focus();
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Mekanik" breadcrumb={["Dashboard", "Mechanics"]} />

      {/* SEKSI FORM INPUT (CRM FITUR) */}
      <div className="px-10 py-6 max-w-4xl">
        <form onSubmit={handleAddMechanic} className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-wrap gap-4 items-end shadow-sm">
          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Nama Mekanik</label>
            <input 
              ref={inputNamaRef} // HOOK: Menyambungkan ref ke elemen DOM input ini
              type="text" 
              placeholder="Contoh: Andi Wijaya"
              value={newMechanic.name}
              onChange={(e) => setNewMechanic({ ...newMechanic, name: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Keahlian / Skill</label>
            <input 
              type="text" 
              placeholder="Contoh: Overhaul Transmisi"
              value={newMechanic.skill}
              onChange={(e) => setNewMechanic({ ...newMechanic, skill: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#FF6B2C] focus:ring-2 focus:ring-[#FF6B2C]/20 transition-all"
            />
          </div>
          <button type="submit" className="bg-[#FF6B2C] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#e85a1f] transition-all shadow-lg shadow-orange-200 active:scale-95 h-[40px]">
            <FaPlus size={10} /> Tambah Mekanik
          </button>
        </form>
      </div>

      {/* SEKSI GRID DATA MEKANIK */}
      <div className="px-10 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mechanics.length === 0 ? (
          <p className="text-sm text-gray-400 italic px-2">Memuat data mekanik dari sistem CRM BengkelGo...</p>
        ) : (
          mechanics.map((m) => (
            <div 
              key={m.id} 
              className="bg-white p-8 rounded-[2rem] border border-gray-200 hover:border-[#FF6B2C]/30 transition-all group relative overflow-hidden shadow-sm hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-50 border-2 border-orange-100 rounded-2xl flex items-center justify-center text-[#FF6B2C] font-black text-2xl group-hover:bg-[#FF6B2C] group-hover:text-white transition-colors duration-500">
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

              <div className="flex justify-between items-center border-t border-gray-100 pt-5 mt-2">
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

              <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <FaChevronRight className="text-orange-200" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}