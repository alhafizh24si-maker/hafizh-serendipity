import React, { useState } from 'react';
import PageHeader from "../components/PageHeader";
import { 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaEllipsisV, 
  FaChevronLeft, 
  FaChevronRight 
} from "react-icons/fa";

const customersData = [
  { "customerId": "CUS-001", "customerName": "Budi Santoso", "email": "budi.s@gmail.com", "phone": "081234567890", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Honda HR-V", "status": "Aktif" },
  { "customerId": "CUS-002", "customerName": "Siti Aminah", "email": "siti.a@yahoo.com", "phone": "081234567891", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Toyota Avanza", "status": "Aktif" },
  { "customerId": "CUS-003", "customerName": "Andi Wijaya", "email": "andi.w@outlook.com", "phone": "081234567892", "loyalty": "Bronze", "group": "Reguler", "kendaraan": "Honda Vario 125", "status": "Tidak Aktif" },
  { "customerId": "CUS-004", "customerName": "Rina Rose", "email": "rina.r@gmail.com", "phone": "081234567893", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Mitsubishi Xpander", "status": "Aktif" },
  { "customerId": "CUS-005", "customerName": "Dewi Lestari", "email": "dewi.l@gmail.com", "phone": "081234567894", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Honda Brio", "status": "Aktif" },
  { "customerId": "CUS-006", "customerName": "Ahmad Dhani", "email": "dhani.a@dewa19.com", "phone": "081234567895", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Toyota Alphard", "status": "Aktif" },
  { "customerId": "CUS-007", "customerName": "Raisa Andriana", "email": "raisa@gmail.com", "phone": "081234567896", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Hyundai Creta", "status": "Aktif" },
  { "customerId": "CUS-008", "customerName": "Tulus", "email": "tulus@musik.com", "phone": "081234567897", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Mazda CX-5", "status": "Aktif" },
  { "customerId": "CUS-009", "customerName": "Isyana Sarasvati", "email": "isyana@gmail.com", "phone": "081234567898", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Mini Cooper", "status": "Aktif" },
  { "customerId": "CUS-010", "customerName": "Afgan", "email": "afgan@gmail.com", "phone": "081234567899", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Honda Civic", "status": "Tidak Aktif" },
  { "customerId": "CUS-011", "customerName": "Vidi Aldiano", "email": "vidi@gmail.com", "phone": "081234567800", "loyalty": "Bronze", "group": "Reguler", "kendaraan": "Yamaha NMAX", "status": "Aktif" },
  { "customerId": "CUS-012", "customerName": "Lyodra Ginting", "email": "lyodra@gmail.com", "phone": "081234567801", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Honda CR-V", "status": "Aktif" },
  { "customerId": "CUS-013", "customerName": "Tiara Andini", "email": "tiara@gmail.com", "phone": "081234567802", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Toyota Yaris", "status": "Aktif" },
  { "customerId": "CUS-014", "customerName": "Ziva Magnolya", "email": "ziva@gmail.com", "phone": "081234567803", "loyalty": "Bronze", "group": "Reguler", "kendaraan": "Honda Scoopy", "status": "Aktif" },
  { "customerId": "CUS-015", "customerName": "Rizky Febian", "email": "rizky@gmail.com", "phone": "081234567804", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Toyota Raize", "status": "Aktif" },
  { "customerId": "CUS-016", "customerName": "Mahalini Raharja", "email": "mahalini@gmail.com", "phone": "081234567805", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Wuling Air EV", "status": "Aktif" },
  { "customerId": "CUS-017", "customerName": "Nadin Amizah", "email": "nadin@gmail.com", "phone": "081234567806", "loyalty": "Bronze", "group": "Reguler", "kendaraan": "Vespa Sprint", "status": "Tidak Aktif" },
  { "customerId": "CUS-018", "customerName": "Pamungkas", "email": "pam@gmail.com", "phone": "081234567807", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Mercedes-Benz C-Class", "status": "Aktif" },
  { "customerId": "CUS-019", "customerName": "Hindia", "email": "hindia@gmail.com", "phone": "081234567808", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Suzuki Jimny", "status": "Aktif" },
  { "customerId": "CUS-020", "customerName": "Sal Priadi", "email": "sal@gmail.com", "phone": "081234567809", "loyalty": "Bronze", "group": "Reguler", "kendaraan": "Honda PCX 160", "status": "Aktif" },
  { "customerId": "CUS-021", "customerName": "Kunto Aji", "email": "kunto@gmail.com", "phone": "081234567810", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Toyota Innova Zenix", "status": "Aktif" },
  { "customerId": "CUS-022", "customerName": "Yura Yunita", "email": "yura@gmail.com", "phone": "081234567811", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Daihatsu Rocky", "status": "Aktif" },
  { "customerId": "CUS-023", "customerName": "Glenn Fredly", "email": "glenn@gmail.com", "phone": "081234567812", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "BMW 3 Series", "status": "Tidak Aktif" },
  { "customerId": "CUS-024", "customerName": "Marion Jola", "email": "lala@gmail.com", "phone": "081234567813", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Hyundai Stargazer", "status": "Aktif" },
  { "customerId": "CUS-025", "customerName": "Ardhito Pramono", "email": "ardhito@gmail.com", "phone": "081234567814", "loyalty": "Bronze", "group": "Reguler", "kendaraan": "Yamaha XSR 155", "status": "Aktif" },
  { "customerId": "CUS-026", "customerName": "Danilla Riyadi", "email": "danilla@gmail.com", "phone": "081234567815", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Mitsubishi Pajero Sport", "status": "Aktif" },
  { "customerId": "CUS-027", "customerName": "Fiersa Besari", "email": "fiersa@gmail.com", "phone": "081234567816", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Suzuki XL7", "status": "Aktif" },
  { "customerId": "CUS-028", "customerName": "Jason Ranti", "email": "jejeng@gmail.com", "phone": "081234567817", "loyalty": "Bronze", "group": "Reguler", "kendaraan": "Vespa PX 150", "status": "Tidak Aktif" },
  { "customerId": "CUS-029", "customerName": "Iwan Fals", "email": "iwan@gmail.com", "phone": "081234567818", "loyalty": "Gold", "group": "VIP Premium", "kendaraan": "Toyota Land Cruiser", "status": "Aktif" },
  { "customerId": "CUS-030", "customerName": "Ebiet G. Ade", "email": "ebiet@gmail.com", "phone": "081234567819", "loyalty": "Silver", "group": "Reguler", "kendaraan": "Nissan Grand Livina", "status": "Aktif" }
];

export default function Customers() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("Semua");

  const filteredCustomers = customersData.filter((cust) => {
    const matchesSearch = 
      cust.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cust.customerId.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cust.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = filterLevel === "Semua" || cust.loyalty === filterLevel;
    
    return matchesSearch && matchesLevel;
  });

  const getBadgeColor = (level) => {
    switch (level) {
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
    /* 🟢 KONTROL LATAR BELAKANG: bg-[#F8FAFC] ditarik penuh agar menyatu mulus tanpa batasan */
    <div className="p-8 pb-10 bg-[#F8FAFC] min-h-screen font-jakarta selection:bg-orange-200">
      
      {/* Page Header Component */}
      <PageHeader title="Database Customer" breadcrumb={["Home", "User List"]}>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#FF6B2C] hover:bg-[#e85a1b] text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-orange-100 transition flex items-center gap-2 text-sm"
        >
          <FaPlus /> Add Customer
        </button>
      </PageHeader>

      {/* Stats Mini Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Members</p>
          <h3 className="text-2xl font-black text-gray-800">{customersData.length} <span className="text-xs font-medium text-gray-400">Cust</span></h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">VIP (Gold)</p>
          <h3 className="text-2xl font-black text-amber-600">{customersData.filter(c => c.loyalty === "Gold").length} <span className="text-xs font-medium text-gray-400">Cust</span></h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Reguler (Silver + Bronze)</p>
          <h3 className="text-2xl font-black text-orange-500">{customersData.filter(c => c.loyalty !== "Gold").length} <span className="text-xs font-medium text-gray-400">Cust</span></h3>
        </div>
      </div>

      {/* Main Table Card Area */}
      <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-gray-100/70">
        
        {/* Advanced Toolbar Filter */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, ID or email..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all font-medium text-sm text-gray-700"
            />
          </div>

          {/* Interactive Select Filter Dropdown */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider pl-1">
              <FaFilter className="text-xs" />
              <span>Loyalty:</span>
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-transparent outline-none text-sm font-bold text-gray-700 cursor-pointer pr-2 py-1 flex-1 sm:flex-initial"
            >
              <option value="Semua">🌟 Semua Level</option>
              <option value="Gold">👑 Gold</option>
              <option value="Silver">🥈 Silver</option>
              <option value="Bronze">🥉 Bronze</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              {/* 🟢 SINKRONISASI INNER TABLE: Menggunakan bg-[#F8FAFC] agar serasi saat transisi heading tabel */}
              <tr className="bg-[#F8FAFC] border-b border-gray-100">
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Customer ID</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Name</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Contact Info</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Group & Level</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <tr key={cust.customerId} className="hover:bg-gray-50/50 transition group">
                    <td className="p-5 text-gray-400 font-mono text-xs">{cust.customerId}</td>
                    <td className="p-5">
                      <div className="font-bold text-gray-800 text-sm group-hover:text-[#FF6B2C] transition-colors">
                        {cust.customerName}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-700">{cust.phone}</span>
                        <span className="text-xs text-gray-400 mt-0.5">{cust.email}</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col items-start gap-1">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${getBadgeColor(cust.loyalty)}`}>
                          {cust.loyalty}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusBadge(cust.status || "Aktif")}`}>
                        {cust.status || "Aktif"}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <button className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition">
                        <FaEllipsisV size={11} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-gray-400 font-medium text-sm bg-white">
                    ⚠️ Tidak ada data customer yang cocok dengan kriteria filter Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Row */}
        <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Showing <span className="font-black text-gray-800">1</span> to <span className="font-black text-gray-800">{filteredCustomers.length}</span> of <span className="font-black text-gray-800">{filteredCustomers.length}</span> Results
          </span>
          <div className="flex items-center gap-1">
            <button className="p-2 w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition">
              <FaChevronLeft size={10} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FF6B2C] text-white text-xs font-black shadow-md shadow-orange-100">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 text-xs font-bold hover:bg-gray-50 transition">
              2
            </button>
            <span className="px-1 text-gray-300 text-xs">...</span>
            <button className="p-2 w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition">
              <FaChevronRight size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup: Add Customer */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl border border-gray-100">
            <h2 className="text-xl font-black text-gray-800 mb-6 tracking-tight">Tambah Customer Baru</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Customer ID</label>
                <input type="text" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] text-sm font-medium" placeholder="E.g., CUS-031" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Nama Lengkap</label>
                <input type="text" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] text-sm font-medium" placeholder="Nama Lengkap" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Alamat Email</label>
                <input type="email" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] text-sm font-medium" placeholder="E.g., nama@bengkel.com" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Nomor Telepon</label>
                <input type="text" className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] text-sm font-medium" placeholder="Nomor Handphone" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Tingkatan Loyalty</label>
                <select className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] text-sm font-bold text-gray-700 bg-white">
                  <option>Bronze</option>
                  <option>Silver</option>
                  <option>Gold</option>
                </select>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-gray-500 font-bold text-sm hover:bg-gray-50 rounded-xl transition">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#FF6B2C] hover:bg-[#e85a1b] text-white font-bold text-sm rounded-xl shadow-md shadow-orange-100 transition">Save Customer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}