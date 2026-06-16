import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCrown, FaWrench, FaClock, FaCheckCircle, 
  FaCoins, FaCalendarPlus, FaUserShield, FaHistory,
  FaSignOutAlt, FaUserCircle, FaCar, FaChevronDown, FaMapMarkerAlt
} from "react-icons/fa"; // 🟢 Mengganti FaLogOut menjadi FaSignOutAlt

export default function Member() {
  const navigate = useNavigate();
  
  // State untuk kontrol UI mandiri
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 1. STATE USER & PROFIL (Data berkendara & akun)
  const [user, setUser] = useState({ 
    id: "USR-09", 
    email: "budi@gmail.com", 
    name: "Budi Setiawan",
    phone: "0812-3456-7890",
    platNomor: "B 1234 GOF",
    vehicleModel: "Honda Vario 160 CC (2023)",
    role: "user" 
  });
  
  const [activeTab, setActiveTab] = useState("booking");

  // 2. STATE DATA MEMBER (Loyalty & Leveling)
  const [memberStats, setMemberStats] = useState({
    totalTransactions: 4, 
    points: 380,
    tier: "Regular Customer",
  });

  // 3. STATE FORM INPUT DATA BOOKING BENGKEL
  const [bookingForm, setBookingForm] = useState({
    serviceType: "",
    notes: "",
    estimatedPrice: 0,
  });

  // 4. DATA TRANSAKSI GLOBAL
  const [transactions, setTransactions] = useState([
    { id: "TX-9901", userId: "USR-09", userEmail: "budi@gmail.com", service: "Tune Up Injection", price: 150000, pointsEarned: 15, status: "Approved", date: "2026-06-10" },
    { id: "TX-9902", userId: "USR-09", userEmail: "budi@gmail.com", service: "Ganti Kampas Rem Depan", price: 120000, pointsEarned: 12, status: "Waiting Workshop", date: "2026-06-15" },
    { id: "TX-9903", userId: "USR-88", userEmail: "alex@gmail.com", service: "Paket Service Lengkap + Oli", price: 350000, pointsEarned: 35, status: "Waiting Workshop", date: "2026-06-16" },
  ]);

  // Efek membaca session login & menutup dropdown jika klik di luar area
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const currentRole = parsedUser.email?.includes("admin") ? "admin" : "user";
      setUser(prev => ({ ...prev, ...parsedUser, role: currentRole }));
    }

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 5. LOGIK INPUT DATA OTOMATIS
  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    let price = 0;
    if (selectedService === "Ganti Oli Shell Helix") price = 95000;
    if (selectedService === "Tune Up Injection") price = 150000;
    if (selectedService === "Service Rem & Kampas") price = 120000;
    if (selectedService === "Paket Service Lengkap + Oli") price = 350000;

    setBookingForm({ ...bookingForm, serviceType: selectedService, estimatedPrice: price });
  };

  // 6. ACTION: Kirim data booking
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.serviceType) return alert("Silakan pilih jenis service terlebih dahulu!");

    const newTransaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user.id,
      userEmail: user.email,
      service: bookingForm.serviceType,
      price: bookingForm.estimatedPrice,
      pointsEarned: Math.floor(bookingForm.estimatedPrice / 10000),
      status: "Waiting Workshop",
      date: new Date().toISOString().split("T")[0]
    };

    setTransactions([newTransaction, ...transactions]);
    alert("Booking Berhasil diajukan! Menunggu konfirmasi montir.");
    setBookingForm({ serviceType: "", notes: "", estimatedPrice: 0 });
    setActiveTab("history");
  };

  // 7. ACTION: Klaim Point Rewards
  const handleClaimReward = (pointsCost, rewardName) => {
    if (memberStats.points < pointsCost) {
      alert("Maaf, poin loyalty Anda tidak mencukupi.");
      return;
    }
    setMemberStats(prev => ({ ...prev, points: prev.points - pointsCost }));
    alert(`Sukses mengklaim ${rewardName}! Kode voucher telah ditambahkan.`);
  };

  // 8. ACTION ADMIN: Approve status service
  const handleApproveService = (txId) => {
    setTransactions(prevTx => 
      prevTx.map(tx => {
        if (tx.id === txId) {
          if (tx.userId === user.id) {
            const newTotalTx = memberStats.totalTransactions + 1;
            let currentTier = "Regular Customer";
            if (newTotalTx >= 5 && newTotalTx < 10) currentTier = "Bronze Member 🥉";
            if (newTotalTx >= 10 && newTotalTx < 20) currentTier = "Silver Member 🥈";
            if (newTotalTx >= 20) currentTier = "Gold Member 🥇";

            setMemberStats(prev => ({
              ...prev,
              totalTransactions: newTotalTx,
              points: prev.points + tx.pointsEarned,
              tier: currentTier
            }));
          }
          return { ...tx, status: "Approved" };
        }
        return tx;
      })
    );
  };

  // 9. LOGOUT ACTION (Keluar Halaman Member)
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari halaman Member GoFix?")) {
      localStorage.removeItem("user");
      navigate("/"); 
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-jakarta text-[#1A1A1A]">
      
      {/* 🟢 STANDALONE INDEPENDENT HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Bengkel */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-[#FF6B2C] text-white p-2 rounded-xl font-black text-sm tracking-tighter">
              GO
            </div>
            <span className="font-black text-lg tracking-tight">
              Bengkel<span className="text-[#FF6B2C]">GoFix</span>
            </span>
          </div>

          {/* Navigasi Utama Tab Halaman Mandiri */}
          {user.role === "user" && (
            <nav className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab("booking")}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "booking" ? "bg-[#FF6B2C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              >
                Booking Service
              </button>
              <button 
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "history" ? "bg-[#FF6B2C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              >
                Riwayat & Status Mekanik
              </button>
            </nav>
          )}

          {/* Dropdown Menu Profil & Logout */}
          <div className="flex items-center gap-4" ref={dropdownRef}>
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 hover:border-gray-300 p-2 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#FF6B2C] font-black text-xs">
                  {user.name ? user.name.charAt(0) : "M"}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black leading-none max-w-[120px] truncate">{user.name || "User Member"}</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-0.5 uppercase tracking-tight">{memberStats.tier.split(" ")[0]}</p>
                </div>
                <FaChevronDown className={`text-gray-400 text-xs transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Box Dropdown Konten */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Informasi Akun</p>
                    <p className="text-sm font-bold text-gray-800 truncate mt-1">{user.email}</p>
                    <p className="text-xs text-gray-500 font-medium">{user.phone}</p>
                  </div>
                  
                  <div className="px-4 py-2 border-b border-gray-50 bg-gray-50/50">
                    <div className="flex items-center gap-1.5 text-xs font-black text-gray-700">
                      <FaCar className="text-[#FF6B2C]" /> Kendaraan Terdaftar
                    </div>
                    <p className="text-xs font-black text-gray-800 mt-1">{user.platNomor}</p>
                    <p className="text-[11px] text-gray-400 font-bold">{user.vehicleModel}</p>
                  </div>

                  {/* 🟢 Tombol logout diperbarui menggunakan tag ikon FaSignOutAlt */}
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-xs font-black uppercase tracking-wider text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1 transition-colors"
                  >
                    <FaSignOutAlt /> Keluar Member
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Navigasi Mobile (Bawah Header jika layar kecil) */}
      <div className="md:hidden bg-white border-b border-gray-100 p-2 flex gap-2">
        <button 
          onClick={() => setActiveTab("booking")}
          className={`flex-1 text-center py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wide ${activeTab === "booking" ? "bg-[#FF6B2C] text-white" : "bg-gray-50 text-gray-500"}`}
        >
          Booking Service
        </button>
        <button 
          onClick={() => setActiveTab("history")}
          className={`flex-1 text-center py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wide ${activeTab === "history" ? "bg-[#FF6B2C] text-white" : "bg-gray-50 text-gray-500"}`}
        >
          Riwayat Transaksi
        </button>
      </div>

      {/* 🟢 BODY MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner Selamat Datang Independen */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <span className="text-[10px] bg-orange-100 text-[#FF6B2C] px-3 py-1 rounded-full font-black tracking-widest uppercase">
              {user.role === "admin" ? "Workshop Workspace Admin" : "Dashboard Eksklusif Pelanggan"}
            </span>
            <h2 className="text-xl md:text-2xl font-black tracking-tight mt-2">
              Selamat Datang Kembali, <span className="text-[#FF6B2C]">{user.name || "Pemilik Kendaraan"}</span>!
            </h2>
          </div>
          {user.role === "admin" && (
            <div className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <FaUserShield /> Kontrol Admin Aktif
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PANEL KIRI: TIERS & REWARDS VOUCHER */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Card Status Rank Tier */}
            <div className="bg-[#1A1A1A] text-white p-6 rounded-[24px] relative overflow-hidden shadow-lg">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#FF6B2C] opacity-20 rounded-full blur-2xl" />
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <FaCrown className="text-yellow-400" />
                  <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Level Keanggotaan</h3>
                </div>
                <span className="text-[10px] font-black bg-[#FF6B2C] px-2 py-0.5 rounded text-white uppercase">
                  {memberStats.totalTransactions} Selesai
                </span>
              </div>
              <p className="text-xl font-black text-orange-400 tracking-tight">{memberStats.tier}</p>

              <div className="mt-4 pt-3 border-t border-white/5 space-y-2 text-[11px] text-gray-400">
                <p className="font-bold text-white mb-1">Ketentuan Upgrade Otomatis:</p>
                <div className="flex justify-between"><span>Sub Bronze Member</span><span className="text-white font-bold">5 Transaksi</span></div>
                <div className="flex justify-between"><span>🥈 Silver Member</span><span className="text-white font-bold">10 Transaksi</span></div>
                <div className="flex justify-between"><span>🥇 Gold Member</span><span className="text-white font-bold">20 Transaksi</span></div>
              </div>
            </div>

            {/* Dompet Reward */}
            <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <FaCoins className="text-yellow-500" />
                  <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">Dompet Poin Loyalty</h4>
                </div>
                <span className="text-lg font-black text-[#1A1A1A]">{memberStats.points} <span className="text-xs font-bold text-gray-400">Pts</span></span>
              </div>

              <div className="space-y-2.5">
                {[
                  { title: "Gratis Cuci Salju Hidrolik", cost: 40, desc: "Tukarkan 40 poin untuk kebersihan motor/mobil." },
                  { title: "Potongan Jasa Servis Rp 50k", cost: 100, desc: "Voucher diskon tagihan jasa mekanik." },
                  { title: "Free Oli Mesin Castrol 1L", cost: 200, desc: "Klaim gratis pelumas resmi di bengkel." },
                ].map((reward, idx) => (
                  <div key={idx} className="p-3 bg-[#F8FAFC] rounded-xl border border-gray-100 flex flex-col justify-between gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-xs font-black text-gray-800">{reward.title}</h5>
                        <p className="text-[10px] text-gray-400">{reward.desc}</p>
                      </div>
                      <span className="text-[9px] font-black bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded flex-shrink-0">-{reward.cost} Pts</span>
                    </div>
                    <button 
                      onClick={() => handleClaimReward(reward.cost, reward.title)}
                      className="w-full bg-[#1A1A1A] hover:bg-[#FF6B2C] text-white text-[10px] font-black uppercase tracking-wider py-1.5 rounded-lg transition-colors"
                    >
                      Tukarkan Reward
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* PANEL KANAN: FORM BOOKING ATAU TRANSAKSI */}
          <div className="lg:col-span-2 space-y-6">

            {/* 1. LAYANAN USER: FORM BOOKING SERVICE */}
            {user.role === "user" && activeTab === "booking" && (
              <div className="bg-white p-6 md:p-8 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-50 text-[#FF6B2C] p-2.5 rounded-xl">
                    <FaCalendarPlus className="text-lg" />
                  </div>
                  <div>
                    <h2 className="text-base font-black tracking-tight">Formulir Booking Antrean Layanan</h2>
                    <p className="text-xs text-gray-400">Pilih jenis penanganan. Point loyalty dihitung kelipatan Rp 10.000 otomatis.</p>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Jenis Penanganan & Suku Cadang</label>
                    <select
                      value={bookingForm.serviceType}
                      onChange={handleServiceChange}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs focus:outline-none focus:border-[#FF6B2C]"
                      required
                    >
                      <option value="">-- Klik Untuk Memilih Jenis Layanan --</option>
                      <option value="Ganti Oli Shell Helix">Ganti Oli Shell Helix — Rp 95.000</option>
                      <option value="Tune Up Injection">Tune Up Service Injection — Rp 150.000</option>
                      <option value="Service Rem & Kampas">Paket Service Rem & Kampas — Rp 120.000</option>
                      <option value="Paket Service Lengkap + Oli">Paket Service Lengkap + Oli Berkala — Rp 350.000</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100/50">
                      <span className="block text-[9px] font-black text-[#FF6B2C] uppercase tracking-wider">Estimasi Harga</span>
                      <span className="text-base font-black text-gray-800">Rp {bookingForm.estimatedPrice.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                      <span className="block text-[9px] font-black text-blue-600 uppercase tracking-wider">Estimasi Bonus Poin</span>
                      <span className="text-base font-black text-blue-700">+{Math.floor(bookingForm.estimatedPrice / 10000)} Pts</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Detail Keluhan Kendaraan</label>
                    <textarea
                      rows="3"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs focus:outline-none focus:border-[#FF6B2C] placeholder:text-gray-300"
                      placeholder="Tuliskan keluhan mesin, kelistrikan atau rem secara mendetail..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF6B2C] text-white font-black py-3.5 rounded-xl uppercase text-xs tracking-widest shadow-md shadow-orange-100 transition-all hover:bg-[#1A1A1A]"
                  >
                    Ajukan Jadwal Sekarang
                  </button>
                </form>
              </div>
            )}

            {/* 2. LAYANAN USER: MONITOR DAFTAR TRANSAKSI PER-MEMBER */}
            {user.role === "user" && activeTab === "history" && (
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <FaHistory className="text-gray-400" />
                  <div>
                    <h2 className="text-base font-black tracking-tight">Status & Riwayat Service Anda</h2>
                    <p className="text-xs text-gray-400">Pantau proses approval montir untuk kedatangan ke workshop bengkel.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {transactions.filter(t => t.userId === user.id).map((tx) => (
                    <div key={tx.id} className="p-4 bg-[#F8FAFC] rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                          <span>{tx.id}</span> • <span>{tx.date}</span>
                        </div>
                        <h4 className="text-xs font-black text-gray-800 mt-0.5">{tx.service}</h4>
                        <p className="text-xs font-bold text-[#FF6B2C]">Rp {tx.price.toLocaleString("id-ID")}</p>
                      </div>
                      <div>
                        {tx.status === "Waiting Workshop" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200">
                            <FaClock className="animate-spin text-amber-500" /> Waiting Workshop
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                            <FaCheckCircle className="text-emerald-500" /> Approved
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. LAYANAN ADMIN: MANAGEMENT APPROVAL BENGKEL */}
            {user.role === "admin" && (
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-50 text-purple-600 p-2 rounded-xl">
                      <FaWrench />
                    </div>
                    <div>
                      <h2 className="text-base font-black tracking-tight">Antrean Verifikasi Booking Bengkel</h2>
                      <p className="text-xs text-gray-400">Daftar verifikasi pengajuan antrean service dari member GoFix.</p>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {transactions.filter(t => t.status === "Waiting Workshop").length} Antrean
                  </span>
                </div>

                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">{tx.id}</span>
                          <span className="text-xs text-gray-400 font-bold">{tx.userEmail}</span>
                        </div>
                        <h4 className="text-xs font-black text-gray-800">{tx.service}</h4>
                        <p className="text-xs text-gray-600 font-medium">
                          Total Tagihan: <b className="text-gray-900">Rp {tx.price.toLocaleString("id-ID")}</b> 
                          <span className="text-orange-500 ml-2">(+{tx.pointsEarned} Pts)</span>
                        </p>
                      </div>

                      <div className="w-full md:w-auto flex justify-end">
                        {tx.status === "Waiting Workshop" ? (
                          <button
                            onClick={() => handleApproveService(tx.id)}
                            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all"
                          >
                            Approve Service
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                            <FaCheckCircle /> Terverifikasi
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}