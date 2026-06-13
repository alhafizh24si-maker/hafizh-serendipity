import React, { useState } from "react";
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaEllipsisV, 
  FaChevronLeft, 
  FaChevronRight 
} from "react-icons/fa";

const dataCust = () => {
  // Mapping Data Utama dari CSV
  const [customersList] = useState([
    { id: "CUST-001", nama: "Dewi Santoso", level: "Bronze", group: "Reguler", kendaraan: "Honda Vario 125", total: 1067034, status: "Tidak Aktif" },
    { id: "CUST-002", nama: "Iwan Sari", level: "Silver", group: "Reguler", kendaraan: "Toyota Avanza", total: 1561779, status: "Aktif" },
    { id: "CUST-003", nama: "Hendra Wulandari", level: "Gold", group: "VIP Premium", kendaraan: "Mitsubishi Xpander", total: 3105188, status: "Aktif" },
    { id: "CUST-010", nama: "Iwan Saputra", level: "Platinum", group: "VIP Premium", kendaraan: "Toyota Innova", total: 657528, status: "Aktif" },
    { id: "CUST-006", nama: "Doni Setiawan", level: "Platinum", group: "VIP Premium", kendaraan: "Suzuki Ertiga", total: 730205, status: "Tidak Aktif" },
    { id: "CUST-004", nama: "Rina Siregar", level: "Silver", group: "Reguler", kendaraan: "Honda Brio", total: 3017006, status: "Aktif" },
    { id: "CUST-012", nama: "Anto Wulandari", level: "Gold", group: "VIP Premium", kendaraan: "Daihatsu GranMax", total: 2108843, status: "Tidak Aktif" },
  ]);

  // State untuk Pencarian dan Filter Level
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("Semua");

  // Logika Filter Data Gabungan (Search + Level Filter)
  const filteredCustomers = customersList.filter((cust) => {
    const matchesSearch = cust.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cust.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cust.kendaraan.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = filterLevel === "Semua" || cust.level === filterLevel;

    return matchesSearch && matchesLevel;
  });

  const getBadgeColor = (level) => {
    switch (level) {
      case "Platinum": return "bg-purple-50 text-purple-700 border border-purple-200";
      case "Gold": return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Silver": return "bg-slate-50 text-slate-700 border border-slate-200";
      default: return "bg-orange-50 text-orange-700 border border-orange-200";
    }
  };

  const getStatusBadge = (status) => {
    return status === "Aktif" 
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
      : "bg-rose-50 text-rose-700 border border-rose-200";
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-jakarta">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Database Customer</h1>
          <p className="text-gray-400 text-sm font-medium mt-1">Kelola data keanggotaan VIP dan Reguler bengkel Anda.</p>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total VIP (P+G)</p>
          <h3 className="text-2xl font-black text-purple-600">375 <span className="text-sm font-medium text-gray-400">Cust</span></h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Reguler (S+B)</p>
          <h3 className="text-2xl font-black text-orange-500">425 <span className="text-sm font-medium text-gray-400">Cust</span></h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Pendapatan CRM</p>
          <h3 className="text-2xl font-black text-emerald-600">Rp 1.46 B</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Avg Transaction</p>
          <h3 className="text-2xl font-black text-blue-600">Rp 1.83 M</h3>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Toolbar (Search, Advanced Filter, Add Button) */}
        <div className="p-5 border-b border-gray-100 flex flex-col xl:flex-row gap-4 justify-between xl:items-center bg-white">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full xl:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, ID, kendaraan..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all font-medium text-sm text-gray-700"
              />
            </div>

            {/* Beautiful Filter Dropdown Segment */}
            <div className="flex items-center gap-2 bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-1.5">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold uppercase tracking-wider pl-1">
                <FaFilter className="text-gray-400 text-xs" />
                <span className="hidden sm:inline">Level:</span>
              </div>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="bg-transparent outline-none text-sm font-bold text-gray-700 cursor-pointer pr-2 py-1"
              >
                <option value="Semua">🌟 Semua Level</option>
                <option value="Platinum">🔮 Platinum</option>
                <option value="Gold">👑 Gold</option>
                <option value="Silver">🥈 Silver</option>
                <option value="Bronze">🥉 Bronze</option>
              </select>
            </div>
          </div>

          {/* Add Button */}
          <button className="bg-[#FF6B2C] hover:bg-[#e85a1b] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md shadow-orange-200/80 transition-all active:scale-95 w-full xl:w-auto justify-center">
            <FaPlus /> Tambah Customer
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-gray-100">
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" className="w-4 h-4 text-[#FF6B2C] rounded border-gray-300 focus:ring-[#FF6B2C]" />
                </th>
                <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Grup & Level</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Kendaraan</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Total Transaksi</th>
                <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-gray-50/40 transition-colors group">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="w-4 h-4 text-[#FF6B2C] rounded border-gray-300 focus:ring-[#FF6B2C]" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-sm group-hover:text-[#FF6B2C] transition-colors">{cust.nama}</span>
                        <span className="text-xs text-gray-400 font-mono mt-0.5">{cust.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{cust.group}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm ${getBadgeColor(cust.level)}`}>
                          {cust.level}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-600">
                      {cust.kendaraan}
                    </td>
                    <td className="px-4 py-4 text-sm font-black text-gray-800">
                      Rp {cust.total.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm ${getStatusBadge(cust.status)}`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all">
                        <FaEllipsisV size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty State jika filter tidak menemukan data */
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400 font-medium text-sm">
                    ⚠️ Tidak ada data customer yang cocok dengan filter atau pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
          <span className="text-sm text-gray-500 font-medium">
            Showing <span className="font-bold text-gray-800">1</span> to <span className="font-bold text-gray-800">{filteredCustomers.length}</span> of <span className="font-bold text-gray-800">{filteredCustomers.length}</span> Results
          </span>
          <div className="flex items-center gap-1">
            <button className="p-2 w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
              <FaChevronLeft size={12} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FF6B2C] text-white text-sm font-bold shadow-md shadow-orange-200">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
              3
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="p-2 w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default dataCust;