import React, { useState } from 'react';
import PageHeader from "../components/PageHeader";
import { 
  FaStar, 
  FaSearch, 
  FaFilter, 
  FaTrashAlt, 
  FaReply, 
  FaChevronLeft, 
  FaChevronRight,
  FaCheckCircle 
} from "react-icons/fa";

// --- DATA SETS (Mengubah data list/card ke basis data tabel) ---
const initialReviews = [
  { id: "REV-101", name: "Sarah Wijaya", comment: "Pelayanannya cepat, mekanik detail banget ngejelasinnya. Puas!", rating: 5, date: "12 JUN 2026", status: "Sudah Dibalas" },
  { id: "REV-102", name: "Doni Pratama", comment: "Tempat nunggu nyaman ada AC, motor mantap lagi tarikannya setelah tune up.", rating: 4, date: "10 JUN 2026", status: "Belum Dibalas" },
  { id: "REV-103", name: "Rian Hidayat", comment: "Antrean agak panjang pas weekend, tapi hasil kerja mekanik oke dan rapi.", rating: 3, date: "08 JUN 2026", status: "Sudah Dibalas" },
  { id: "REV-104", name: "Siti Nurhaliza", comment: "Sangat kecewa, nunggu ganti oli aja sampai 2 jam padahal kondisi sepi.", rating: 1, date: "05 JUN 2026", status: "Belum Dibalas" },
  { id: "REV-105", name: "Budi Utomo", comment: "Harga sparepart transparan dan bisa dicek online. Sangat recommended!", rating: 5, date: "01 JUN 2026", status: "Sudah Dibalas" },
];

export default function Reviews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("Semua");

  // Logika Filter & Pencarian Pelanggan
  const filteredReviews = initialReviews.filter((rev) => {
    const matchesSearch = rev.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          rev.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRating = filterRating === "Semua" || rev.rating === parseInt(filterRating);
    
    return matchesSearch && matchesRating;
  });

  // Helper untuk merender komponen Bintang Statis di dalam Tabel
  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={`text-xs ${i < rating ? "text-amber-400" : "text-gray-200"}`} 
          />
        ))}
      </div>
    );
  };

  return (
    /* 🟢 SINKRONISASI BACKGROUND LAYOUT: bg-[#F8FAFC] terpasang mulus */
    <div className="p-8 pb-10 bg-[#F8FAFC] min-h-screen font-jakarta selection:bg-orange-200">
      
      {/* Page Header Component */}
      <PageHeader title="Customer Reviews & Feedback" breadcrumb={["Home", "Reviews"]}>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border border-emerald-200 shadow-sm">
          <FaCheckCircle /> Google Sync Active
        </div>
      </PageHeader>

      {/* Summary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Rata-rata Rating</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-gray-800">4.6</h3>
            <div className="flex text-amber-400 text-xs gap-0.5 mb-1">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Review Bintang 5</p>
          <h3 className="text-2xl font-black text-amber-500">
            {initialReviews.filter(r => r.rating === 5).length} <span className="text-xs font-medium text-gray-400">Ulasan</span>
          </h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Butuh Respon/Balasan</p>
          <h3 className="text-2xl font-black text-rose-500">
            {initialReviews.filter(r => r.status === "Belum Dibalas").length} <span className="text-xs font-medium text-gray-400">Ulasan</span>
          </h3>
        </div>
      </div>

      {/* Main Table Card Area */}
      <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-gray-100/70">
        
        {/* Advanced Toolbar Filter */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama pengulas atau isi komentar..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all font-medium text-sm text-gray-700"
            />
          </div>

          {/* Star Filter Dropdown */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider pl-1">
              <FaFilter className="text-xs" />
              <span>Rating:</span>
            </div>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-transparent outline-none text-sm font-bold text-gray-700 cursor-pointer pr-2 py-1 flex-1 sm:flex-initial"
            >
              <option value="Semua">🌟 Semua Bintang</option>
              <option value="5">⭐⭐⭐⭐⭐ Bintang 5</option>
              <option value="4">⭐⭐⭐⭐ Bintang 4</option>
              <option value="3">⭐⭐⭐ Bintang 3</option>
              <option value="1">⭐ Bintang 1</option>
            </select>
          </div>
        </div>

        {/* Reviews Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-gray-100">
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">ID</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Customer Name</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Komentar / Ulasan</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Tanggal</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Status Respon</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-gray-50/50 transition group">
                    <td className="p-5 text-gray-400 font-mono text-xs">{rev.id}</td>
                    <td className="p-5">
                      <div className="font-bold text-gray-800 text-sm group-hover:text-[#FF6B2C] transition-colors">
                        {rev.name}
                      </div>
                    </td>
                    <td className="p-5">
                      {renderStars(rev.rating)}
                    </td>
                    <td className="p-5 max-w-xs md:max-w-md overflow-hidden text-ellipsis">
                      <p className="text-gray-600 font-medium italic text-xs leading-relaxed whitespace-pre-wrap">
                        "{rev.comment}"
                      </p>
                    </td>
                    <td className="p-5 text-gray-400 font-bold text-[10px] uppercase tracking-wider">
                      {rev.date}
                    </td>
                    <td className="p-5">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        rev.status === "Sudah Dibalas" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}>
                        {rev.status}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center items-center gap-1">
                        <button className="p-2 text-gray-400 hover:text-[#FF6B2C] hover:bg-orange-50 rounded-lg transition" title="Balas Ulasan">
                          <FaReply size={11} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Hapus">
                          <FaTrashAlt size={11} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-gray-400 font-medium text-sm bg-white">
                    ⚠️ Tidak ada ulasan customer yang cocok dengan kriteria filter Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Row */}
        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Showing <span className="font-black text-gray-800">1</span> to <span className="font-black text-gray-800">{filteredReviews.length}</span> of <span className="font-black text-gray-800">{filteredReviews.length}</span> Results
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
    </div>
  );
}