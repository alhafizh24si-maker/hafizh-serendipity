import React, { useState } from 'react';
import PageHeader from "../components/PageHeader";
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaTrashAlt, 
  FaEdit, 
  FaTicketAlt, 
  FaChevronLeft, 
  FaChevronRight 
} from "react-icons/fa";

// --- DATA SETS (Mengubah struktur card ke basis data tabel) ---
const initialPromotions = [
  { id: "PRM-001", title: "Diskon Service Tune Up", code: "TUNEUPVIP", discount: "Rp 50.000", group: "VIP", usage: "14/50", status: "Aktif" },
  { id: "PRM-002", title: "Free Ganti Oli Mesin", code: "OLIFREE", discount: "100% OFF", group: "VIP", usage: "30/30", status: "Berakhir" },
  { id: "PRM-003", title: "Promo Ban Baru Akhir Tahun", code: "BANHEMAT", discount: "15% OFF", group: "Semua", usage: "89/200", status: "Aktif" },
  { id: "PRM-004", title: "Voucher Cuci Salju Gratis", code: "CUCIBERSIH", discount: "Rp 25.000", group: "Semua", usage: "0/100", status: "Mendatang" },
  { id: "PRM-005", title: "Diskon Spooring Balancing", code: "VIPBALANCE", discount: "Rp 75.000", group: "VIP", usage: "12/40", status: "Aktif" },
];

export default function Promotions() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGroup, setFilterGroup] = useState("Semua");

  // Filter Logika Pencarian & Dropdown
  const filteredPromotions = initialPromotions.filter((promo) => {
    const matchesSearch = 
      promo.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      promo.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGroup = filterGroup === "Semua" || promo.group === filterGroup;
    
    return matchesSearch && matchesGroup;
  });

  // Helper styling warna target grup
  const getGroupBadge = (group) => {
    return group === "VIP" 
      ? "bg-purple-50 text-purple-700 border border-purple-200" 
      : "bg-blue-50 text-blue-700 border border-blue-200";
  };

  // Helper styling warna status voucher
  const getStatusBadge = (status) => {
    switch (status) {
      case "Aktif": return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Berakhir": return "bg-rose-50 text-rose-700 border border-rose-200";
      default: return "bg-amber-50 text-amber-700 border border-amber-200"; // Mendatang
    }
  };

  return (
    /* 🟢 SINKRONISASI BACKGROUND LAYOUT: bg-[#F8FAFC] menyatu penuh dengan header atas */
    <div className="p-8 pb-10 bg-[#F8FAFC] min-h-screen font-jakarta selection:bg-orange-200">
      
      {/* Page Header Component */}
      <PageHeader title="Manajemen Promosi & Voucher" breadcrumb={["Home", "Promotions"]}>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#FF6B2C] hover:bg-[#e85a1b] text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-orange-100 transition flex items-center gap-2 text-sm"
        >
          <FaPlus /> Buat Promo Baru
        </button>
      </PageHeader>

      {/* Mini Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Voucher</p>
            <h3 className="text-2xl font-black text-gray-800">{initialPromotions.length} <span className="text-xs font-medium text-gray-400">Kupon</span></h3>
          </div>
          <div className="p-4 rounded-xl bg-orange-50 text-[#FF6B2C] text-lg"><FaTicketAlt /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Khusus Target VIP</p>
            <h3 className="text-2xl font-black text-purple-600">{initialPromotions.filter(p => p.group === "VIP").length} <span className="text-xs font-medium text-gray-400">Kupon</span></h3>
          </div>
          <div className="p-4 rounded-xl bg-purple-50 text-purple-600 text-lg"><FaTicketAlt /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Status Kupon Aktif</p>
            <h3 className="text-2xl font-black text-emerald-600">{initialPromotions.filter(p => p.status === "Aktif").length} <span className="text-xs font-medium text-gray-400">Kupon</span></h3>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-600 text-lg"><FaTicketAlt /></div>
        </div>
      </div>

      {/* Main Table Card Wrapper */}
      <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-gray-100/70">
        
        {/* Toolbar Pencarian & Filter */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          {/* Box Search */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama promo atau kode kupon..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all font-medium text-sm text-gray-700"
            />
          </div>

          {/* Filter Dropdown Target Group */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider pl-1">
              <FaFilter className="text-xs" />
              <span>Target:</span>
            </div>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="bg-transparent outline-none text-sm font-bold text-gray-700 cursor-pointer pr-2 py-1 flex-1 sm:flex-initial"
            >
              <option value="Semua">🌟 Semua Target</option>
              <option value="VIP">👑 Khusus VIP</option>
              <option value="Semua">👥 Umum (Semua)</option>
            </select>
          </div>
        </div>

        {/* Render Tabel Data Promosi */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-gray-100">
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">ID</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Nama Promo</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Kode Kupon</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Nominal Potongan</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Target Group</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Kuota Terpakai</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredPromotions.length > 0 ? (
                filteredPromotions.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50/50 transition group">
                    <td className="p-5 text-gray-400 font-mono text-xs">{promo.id}</td>
                    <td className="p-5">
                      <div className="font-bold text-gray-800 text-sm group-hover:text-[#FF6B2C] transition-colors">
                        {promo.title}
                      </div>
                    </td>
                    <td className="p-5">
                      <code className="bg-gray-100 px-3 py-1 rounded-lg text-gray-600 font-black text-xs uppercase tracking-wider border border-gray-200/50">
                        {promo.code}
                      </code>
                    </td>
                    <td className="p-5 font-black text-gray-800 text-sm text-[#FF6B2C]">
                      {promo.discount}
                    </td>
                    <td className="p-5">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${getGroupBadge(promo.group)}`}>
                        {promo.group === "VIP" ? "👑 VIP Only" : "👥 Umum"}
                      </span>
                    </td>
                    <td className="p-5 text-gray-500 font-medium text-xs">
                      {promo.usage}
                    </td>
                    <td className="p-5">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusBadge(promo.status)}`}>
                        {promo.status}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition" title="Edit Promo">
                          <FaEdit size={12} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Hapus Promo">
                          <FaTrashAlt size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-10 text-center text-gray-400 font-medium text-sm bg-white">
                    ⚠️ Tidak ada data promosi / kupon yang cocok dengan kriteria pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Row */}
        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Menampilkan <span className="font-black text-gray-800">1</span> sampai <span className="font-black text-gray-800">{filteredPromotions.length}</span> dari <span className="font-black text-gray-800">{filteredPromotions.length}</span> Total Data
          </span>
          <div className="flex items-center gap-1">
            <button className="p-2 w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition">
              <FaChevronLeft size={10} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FF6B2C] text-white text-xs font-black shadow-md shadow-orange-100">
              1
            </button>
            <button className="p-2 w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition">
              <FaChevronRight size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup Dummy: Tambah Promo Baru */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl border border-gray-100">
            <h2 className="text-xl font-black text-gray-800 mb-6 tracking-tight">Buat Promosi / Voucher Baru</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Nama Promosi</label>
                <input type="text" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] text-sm font-medium" placeholder="Contoh: Diskon Kemerdekaan" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Kode Kupon</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] text-sm font-bold uppercase" placeholder="MERDEKA77" required />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Nominal / Potongan</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] text-sm font-medium" placeholder="15% atau Rp 20k" required />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Target Group Pelanggan</label>
                <select className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] text-sm font-bold text-gray-700 bg-white">
                  <option>Semua</option>
                  <option>VIP</option>
                </select>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-gray-500 font-bold text-sm hover:bg-gray-50 rounded-xl transition">Batal</button>
                <button type="submit" className="flex-1 py-3 bg-[#FF6B2C] hover:bg-[#e85a1b] text-white font-bold text-sm rounded-xl shadow-md shadow-orange-100 transition">Simpan Promo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}