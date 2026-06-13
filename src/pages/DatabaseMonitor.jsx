import { useState, useEffect } from "react";
// 🟢 FaRefresh diganti menjadi FaSync agar tidak error 'does not provide an export named'
import { FaDatabase, FaSearch, FaSync, FaUserShield, FaKey, FaClock } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { supabaseAPI } from "../services/supabaseAPI"; 

export default function DatabaseMonitor() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Mengambil data dari Supabase saat halaman dibuka atau saat tombol refresh ditekan
  useEffect(() => {
    const fetchDatabaseData = async () => {
      setLoading(true);
      try {
        const data = await supabaseAPI.getAllUsers?.() || []; 
        setUsers(data);
      } catch (error) {
        console.error("Gagal mengambil data database:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatabaseData();
  }, [refreshKey]);

  // Fungsi pencarian lokal berdasarkan email
  const filteredUsers = (users || []).filter((user) =>
    user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🟢 Hitung apakah masih ada user yang menggunakan password plain text (belum di-hash bcrypt)
  const hasUnencryptedPassword = users.some(
    (user) => !user.password?.startsWith("$2a$") && !user.password?.startsWith("$2b$")
  );

  return (
    <div className="p-6 space-y-6 font-jakarta bg-[#F8FAFC] min-h-screen">
      
      {/* 1. HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-[#FF6B2C] mb-1">
            <FaDatabase className="text-xl" />
            <span className="text-xs font-black uppercase tracking-widest">System Monitor</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
            Supabase Database Viewer
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Memantau data tabel <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#FF6B2C] font-mono">users_bengkel</code> secara real-time.
          </p>
        </div>

        <button
          onClick={() => setRefreshKey((prev) => prev + 1)}
          disabled={loading}
          className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#FF6B2C] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 disabled:opacity-50"
        >
          <FaSync className={loading ? "animate-spin" : ""} />
          Refresh Data
        </button>
      </div>

      {/* 2. RINGKASAN STATISTIK DATA (STATS CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 rounded-xl text-[#FF6B2C]">
            <FaUserShield className="text-2xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Total Record Users</p>
            <h3 className="text-xl font-black text-[#1A1A1A]">{users?.length || 0} Pengguna</h3>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500">
            <span className="relative flex h-3 w-3 m-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Status Koneksi</p>
            <h3 className="text-xl font-black text-emerald-500">Connected</h3>
          </div>
        </div>

        {/* 🟢 Status Keamanan Makro dibuat dinamis berdasarkan kondisi enkripsi data database */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-xl ${hasUnencryptedPassword ? "bg-amber-50 text-amber-500" : "bg-emerald-50 text-emerald-500"}`}>
            <FaKey className="text-xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Keamanan Password</p>
            {hasUnencryptedPassword ? (
              <h3 className="text-sm font-black text-rose-500 uppercase tracking-wide">Plain Text (Sangat Rentan)</h3>
            ) : (
              <h3 className="text-sm font-black text-emerald-500 uppercase tracking-wide">Secure (Bcrypt Enforced)</h3>
            )}
          </div>
        </div>
      </div>

      {/* 3. KONTEN UTAMA: TABEL DATA */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Fitur Pencarian */}
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari berdasarkan email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all"
            />
            <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-xs" />
          </div>
          <span className="text-xs text-gray-400 font-bold">
            Menampilkan {filteredUsers.length} dari {users?.length || 0} data
          </span>
        </div>

        {/* Area Tabel */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <ImSpinner2 className="animate-spin text-3xl text-[#FF6B2C]" />
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Menghubungi Server Supabase...</p>
            </div>
          ) : filteredUsers.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/30">
                  <th className="py-4 px-6 w-16 text-center">ID</th>
                  <th className="py-4 px-6">Created At</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Password (Raw)</th>
                  <th className="py-4 px-6 text-center">Status Enkripsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs font-bold text-[#1A1A1A]">
                {filteredUsers.map((user) => {
                  // 🟢 Cek apakah string password diawali dengan format signature bcrypt ($2a$ atau $2b$)
                  const isEnriched = user.password?.startsWith("$2a$") || user.password?.startsWith("$2b$");
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-center font-mono text-gray-400">{user.id}</td>
                      <td className="py-4 px-6 text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <FaClock className="text-[10px]" />
                          {user.created_at ? new Date(user.created_at).toLocaleString('id-ID') : "-"}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#FF6B2C] font-semibold">{user.email}</td>
                      <td className="py-4 px-6 font-mono tracking-wider bg-gray-50/30 text-gray-600 truncate max-w-[200px]">
                        {user.password}
                      </td>
                      {/* 🟢 Badge status berubah warna hijau jika terenkripsi dan merah jika masih plain text */}
                      <td className="py-4 px-6 text-center">
                        {isEnriched ? (
                          <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide border border-emerald-100">
                            Encrypted
                          </span>
                        ) : (
                          <span className="bg-rose-50 text-rose-600 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide border border-rose-100">
                            Unencrypted
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-sm font-bold">Data tidak ditemukan.</p>
              <p className="text-xs mt-1">Coba periksa kata kunci pencarian kamu kembali.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}