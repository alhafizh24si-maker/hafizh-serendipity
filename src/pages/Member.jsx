import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCrown, FaWrench, FaClock, FaCheckCircle, 
  FaCoins, FaCalendarPlus, FaUserShield, FaHistory,
  FaSignOutAlt, FaChevronDown, FaCar, FaGift, FaAward
} from "react-icons/fa";

export default function Member() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [activeTab, setActiveTab] = useState("booking");

  // 1. STATE USER & PROFIL
  const [user, setUser] = useState({ 
    id: "USR-09", 
    email: "budi@gmail.com", 
    name: "Budi Setiawan",
    phone: "0812-3456-7890",
    platNomor: "B 1234 GOF",
    vehicleModel: "Honda Vario 160 CC (2023)",
    role: "user" 
  });

  // 2. STATE DATA METRICS MEMBER (Diambil dari localStorage agar persisten)
  const [memberStats, setMemberStats] = useState(() => {
    const savedStats = localStorage.getItem("gofix_member_stats");
    return savedStats ? JSON.parse(savedStats) : {
      totalTransactions: 4, 
      points: 380,
      tier: "Regular Customer",
    };
  });

  // 3. STATE FORM INPUT DATA BOOKING
  const [bookingForm, setBookingForm] = useState({
    serviceType: "",
    notes: "",
    estimatedPrice: 0,
  });

  // 4. DATA ANTRIAN / TRANSAKSI GLOBAL (Diambil dari localStorage)
  const [queue, setQueue] = useState(() => {
    const savedQueue = localStorage.getItem("gofix_queue");
    return savedQueue ? JSON.parse(savedQueue) : [
      { id: 'TX-9901', plat: 'B 1234 GOF', owner: 'Budi Setiawan', issue: 'Tune Up Injection', status: 'Selesai', mechanicId: 'm1', price: 150000, pointsEarned: 15, date: '2026-06-10' },
      { id: 'TX-9902', plat: 'B 1234 GOF', owner: 'Budi Setiawan', issue: 'Ganti Kampas Rem Depan', status: 'Menunggu', mechanicId: null, price: 120000, pointsEarned: 12, date: '2026-06-15' },
      { id: 'TX-9903', plat: 'D 5678 AB', owner: 'Siti R.', issue: 'Starter Mati', status: 'Pending Konfirmasi', mechanicId: null, price: 350000, pointsEarned: 35, date: '2026-06-16' },
    ];
  });

  // FITUR TAMBAHAN: Riwayat Klaim Voucher / Reward
  const [claimHistory, setClaimHistory] = useState(() => {
    const savedClaims = localStorage.getItem("gofix_claim_history");
    return savedClaims ? JSON.parse(savedClaims) : [];
  });

  // Sinkronisasi ke localStorage setiap kali ada perubahan data
  useEffect(() => {
    localStorage.setItem("gofix_member_stats", JSON.stringify(memberStats));
  }, [memberStats]);

  useEffect(() => {
    localStorage.setItem("gofix_queue", JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    localStorage.setItem("gofix_claim_history", JSON.stringify(claimHistory));
  }, [claimHistory]);

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

  // 🛠️ LOGIK MENGHITUNG MULTIPLIER POIN BERDASARKAN TIER
  const getTierMultiplier = (tierName) => {
    if (tierName.includes("Bronze")) return 1.2; // Bonus 20% Poin
    if (tierName.includes("Silver")) return 1.5; // Bonus 50% Poin
    if (tierName.includes("Gold")) return 2.0;   // Bonus 100% Poin
    return 1.0; // Regular
  };

  const currentMultiplier = getTierMultiplier(memberStats.tier);
  const basePoints = Math.floor(bookingForm.estimatedPrice / 10000);
  const finalPointsCalculated = Math.floor(basePoints * currentMultiplier);

  // LOGIK MENENTUKAN TARGET TRANSAKSI UNTUK BERGANTI TIER NEXT LEVEL
  const getTierProgress = (txCount) => {
    if (txCount < 5) return { next: "Bronze Member 🥉", target: 5, currentMin: 0 };
    if (txCount < 10) return { next: "Silver Member 🥈", target: 10, currentMin: 5 };
    if (txCount < 20) return { next: "Gold Member 🥇", target: 20, currentMin: 10 };
    return { next: "Max Level Reached 🎉", target: 20, currentMin: 20 };
  };
  const tierProgress = getTierProgress(memberStats.totalTransactions);
  const progressPercentage = tierProgress.target === tierProgress.currentMin ? 100 : 
    ((memberStats.totalTransactions - tierProgress.currentMin) / (tierProgress.target - tierProgress.currentMin)) * 100;

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    let price = 0;
    if (selectedService === "Ganti Oli Shell Helix") price = 95000;
    if (selectedService === "Tune Up Injection") price = 150000;
    if (selectedService === "Service Rem & Kampas") price = 120000;
    if (selectedService === "Paket Service Lengkap + Oli") price = 350000;

    setBookingForm({ ...bookingForm, serviceType: selectedService, estimatedPrice: price });
  };

  // ACTION: Kirim data booking
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.serviceType) return alert("Silakan pilih jenis service terlebih dahulu!");

    const newOrder = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      plat: user.platNomor,
      owner: user.name,
      issue: `${bookingForm.serviceType} ${bookingForm.notes ? `(${bookingForm.notes})` : ''}`,
      status: "Pending Konfirmasi", 
      mechanicId: null,
      price: bookingForm.estimatedPrice,
      pointsEarned: finalPointsCalculated, // Poin yang sudah dikalikan multiplier tier
      date: new Date().toISOString().split("T")[0]
    };

    setQueue([newOrder, ...queue]);
    alert(`Booking Berhasil! Anda berpotensi mendapatkan ${finalPointsCalculated} Poin (Multiplier ${currentMultiplier}x) setelah dikonfirmasi Selesai oleh Admin.`);
    setBookingForm({ serviceType: "", notes: "", estimatedPrice: 0 });
    setActiveTab("history");
  };

  // 🎁 DAFTAR REWARDS DENGAN BATASAN TIER (Klaim Dibedakan)
  const rewardsList = [
    { id: "r1", title: "Gratis Cuci Salju Hidrolik", cost: 40, desc: "Berlaku untuk semua level member.", minTier: "Regular Customer" },
    { id: "r2", title: "Potongan Jasa Servis Rp 50k", cost: 100, desc: "Voucher diskon khusus minimal Bronze.", minTier: "Bronze Member 🥉" },
    { id: "r3", title: "Diskon Oli Premium Eksklusif", cost: 150, desc: "Voucher diskon khusus minimal Silver.", minTier: "Silver Member 🥈" },
    { id: "r4", title: "Free Ganti Sparepart Up To 200k", cost: 300, desc: "Voucher Sultan khusus Gold Member.", minTier: "Gold Member 🥇" },
  ];

  // Cek validasi tier untuk klaim reward
  const checkTierEligibility = (minTier, userTier) => {
    const tiers = ["Regular Customer", "Bronze Member 🥉", "Silver Member 🥈", "Gold Member 🥇"];
    return tiers.indexOf(userTier) >= tiers.indexOf(minTier);
  };

  // ACTION: Klaim Point Rewards
  const handleClaimReward = (reward) => {
    if (!checkTierEligibility(reward.minTier, memberStats.tier)) {
      alert(`Maaf, reward ini khusus untuk level minimal ${reward.minTier}. Upgrade level Anda dengan memperbanyak transaksi!`);
      return;
    }
    if (memberStats.points < reward.cost) {
      alert("Maaf, poin loyalty Anda tidak mencukupi.");
      return;
    }

    // Kurangi poin
    setMemberStats(prev => ({ ...prev, points: prev.points - reward.cost }));
    
    // Tambah ke history klaim
    const newClaim = {
      id: `VCH-${Math.floor(10000 + Math.random() * 90000)}`,
      title: reward.title,
      cost: reward.cost,
      date: new Date().toISOString().split("T")[0],
      code: `GOFIX-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    };
    setClaimHistory([newClaim, ...claimHistory]);
    
    alert(`Sukses klaim ${reward.title}! Kode voucher: ${newClaim.code}`);
  };

  // ACTION ADMIN: Terima & Selesaikan status service
  const handleApproveService = (txId) => {
    setQueue(prevQueue => 
      prevQueue.map(item => {
        if (item.id === txId) {
          if (item.owner === user.name) {
            const newTotalTx = memberStats.totalTransactions + 1;
            
            // Penentuan Tier Otomatis berdasarkan Jumlah Transaksi
            let currentTier = "Regular Customer";
            if (newTotalTx >= 5 && newTotalTx < 10) currentTier = "Bronze Member 🥉";
            if (newTotalTx >= 10 && newTotalTx < 20) currentTier = "Silver Member 🥈";
            if (newTotalTx >= 20) currentTier = "Gold Member 🥇";

            setMemberStats(prev => ({
              ...prev,
              totalTransactions: newTotalTx,
              points: prev.points + item.pointsEarned, // Poin baru ditambahkan ke dompet poin saat status Selesai
              tier: currentTier
            }));
          }
          return { ...item, status: "Selesai" }; 
        }
        return item;
      })
    );
    alert("Pesanan diselesaikan! Poin pelanggan telah berhasil ditambahkan.");
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("user");
      navigate("/"); 
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-jakarta text-[#1A1A1A]">
      {/* HEADER NAVBAR */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-[#FF6B2C] text-white p-2 rounded-xl font-black text-sm tracking-tighter">GO</div>
            <span className="font-black text-lg tracking-tight">Bengkel<span className="text-[#FF6B2C]">GoFix</span></span>
          </div>

          {user.role === "user" && (
            <nav className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button onClick={() => setActiveTab("booking")} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "booking" ? "bg-[#FF6B2C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>Booking Service</button>
              <button onClick={() => setActiveTab("history")} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "history" ? "bg-[#FF6B2C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>Riwayat & Antrian</button>
              <button onClick={() => setActiveTab("rewards")} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "rewards" ? "bg-[#FF6B2C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>Voucher Saya ({claimHistory.length})</button>
            </nav>
          )}

          <div className="flex items-center gap-4" ref={dropdownRef}>
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-2 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#FF6B2C] font-black text-xs">
                  {user.name ? user.name.charAt(0) : "M"}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black leading-none max-w-[120px] truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-0.5 uppercase tracking-tight">{memberStats.tier.split(" ")[0]}</p>
                </div>
                <FaChevronDown className="text-gray-400 text-xs" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Informasi Akun</p>
                    <p className="text-sm font-bold text-gray-800 truncate mt-1">{user.email}</p>
                    <p className="text-xs text-gray-500 font-medium">{user.phone}</p>
                  </div>
                  <div className="px-4 py-2 border-b border-gray-50 bg-gray-50/50">
                    <div className="flex items-center gap-1.5 text-xs font-black text-gray-700"><FaCar className="text-[#FF6B2C]" /> Kendaraan Terdaftar</div>
                    <p className="text-xs font-black text-gray-800 mt-1">{user.platNomor}</p>
                    <p className="text-[11px] text-gray-400 font-bold">{user.vehicleModel}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-xs font-black uppercase text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1"><FaSignOutAlt /> Keluar Member</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className="md:hidden bg-white border-b border-gray-100 p-2 flex gap-1.5">
        <button onClick={() => setActiveTab("booking")} className={`flex-1 text-center py-2.5 rounded-xl text-[10px] font-black uppercase ${activeTab === "booking" ? "bg-[#FF6B2C] text-white" : "bg-gray-50 text-gray-500"}`}>Booking</button>
        <button onClick={() => setActiveTab("history")} className={`flex-1 text-center py-2.5 rounded-xl text-[10px] font-black uppercase ${activeTab === "history" ? "bg-[#FF6B2C] text-white" : "bg-gray-50 text-gray-500"}`}>Riwayat</button>
        <button onClick={() => setActiveTab("rewards")} className={`flex-1 text-center py-2.5 rounded-xl text-[10px] font-black uppercase ${activeTab === "rewards" ? "bg-[#FF6B2C] text-white" : "bg-gray-50 text-gray-500"}`}>Voucher</button>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SEKSI KIRI: METRIKS & TIER LEVEL PROGRESS */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1A1A1A] text-white p-6 rounded-[24px] shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <FaCrown className="text-yellow-400" />
                  <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Level Keanggotaan</h3>
                </div>
                <span className="text-[10px] font-black bg-[#FF6B2C] px-2 py-0.5 rounded-full">{memberStats.totalTransactions} Servis Selesai</span>
              </div>
              <p className="text-xl font-black text-orange-400">{memberStats.tier}</p>
              <span className="text-[11px] text-gray-400 font-medium">Multiplier Keuntungan: <b className="text-white">{currentMultiplier}x Poin</b></span>
              
              {/* FITUR PROGRESS BAR MENUJU NEXT LEVEL TIER */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                  <span>Progress Ke: {tierProgress.next}</span>
                  <span>{memberStats.totalTransactions} / {tierProgress.target} Tx</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#FF6B2C] h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>
              </div>
            </div>

            {/* DOMPET POIN & KLAM REWARD TER-DIKONDISIKAN TIER */}
            <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <FaCoins className="text-yellow-500" />
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Dompet Poin Loyalty</h4>
                </div>
                <span className="text-lg font-black">{memberStats.points} <span className="text-xs text-gray-400">Pts</span></span>
              </div>
              
              <div className="space-y-2.5">
                {rewardsList.map((reward) => {
                  const isEligible = checkTierEligibility(reward.minTier, memberStats.tier);
                  return (
                    <div key={reward.id} className={`p-3 rounded-xl border flex flex-col gap-2 transition-all ${isEligible ? "bg-[#F8FAFC] border-gray-100" : "bg-gray-50 border-gray-200 opacity-60"}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-1">
                            <h5 className="text-xs font-black text-gray-800">{reward.title}</h5>
                            {!isEligible && <span className="text-[8px] bg-red-100 text-red-600 px-1 rounded font-black">Locked</span>}
                          </div>
                          <p className="text-[10px] text-gray-400">{reward.desc}</p>
                          <span className="text-[9px] text-[#FF6B2C] font-bold">Syarat Level: {reward.minTier.split(" ")[0]}</span>
                        </div>
                        <span className="text-[9px] font-black bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded">-{reward.cost} Pts</span>
                      </div>
                      <button 
                        onClick={() => handleClaimReward(reward)} 
                        disabled={!isEligible}
                        className={`w-full text-[10px] font-black uppercase py-1.5 rounded-lg transition-colors ${isEligible ? "bg-[#1A1A1A] text-white hover:bg-black" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                      >
                        {isEligible ? "Tukarkan Reward" : `Butuh Level ${reward.minTier.split(" ")[0]}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SEKSI KANAN: FORM DYNAMIC / STATUS / RIWAYAT KLAIM */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* TAB BOOKING */}
            {user.role === "user" && activeTab === "booking" && (
              <div className="bg-white p-6 md:p-8 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-50 text-[#FF6B2C] p-2.5 rounded-xl"><FaCalendarPlus className="text-lg" /></div>
                  <div>
                    <h2 className="text-base font-black">Formulir Booking Antrean Bengkel</h2>
                    <p className="text-xs text-gray-400">Poin Anda dikalikan berdasarkan tingkat level member Anda sekarang.</p>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Jenis Layanan</label>
                    <select value={bookingForm.serviceType} onChange={handleServiceChange} className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs" required>
                      <option value="">-- Pilih Jenis Layanan --</option>
                      <option value="Ganti Oli Shell Helix">Ganti Oli Shell Helix — Rp 95.000</option>
                      <option value="Tune Up Injection">Tune Up Service Injection — Rp 150.000</option>
                      <option value="Service Rem & Kampas">Paket Service Rem & Kampas — Rp 120.000</option>
                      <option value="Paket Service Lengkap + Oli">Paket Service Lengkap + Oli — Rp 350.000</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100/50">
                      <span className="block text-[9px] font-black text-[#FF6B2C] uppercase tracking-wider">Estimasi Harga</span>
                      <span className="text-base font-black">Rp {bookingForm.estimatedPrice.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                      <span className="block text-[9px] font-black text-blue-600 uppercase tracking-wider">Estimasi Bonus Poin ({currentMultiplier}x multiplier)</span>
                      <span className="text-base font-black text-blue-700">+{finalPointsCalculated} Pts</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Detail Tambahan Keluhan</label>
                    <textarea rows="3" value={bookingForm.notes} onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })} className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs" placeholder="Misal: Rem belakang blong, bunyi berdecit..." />
                  </div>

                  <button type="submit" className="w-full bg-[#FF6B2C] text-white font-black py-3.5 rounded-xl uppercase text-xs tracking-widest shadow-md hover:bg-orange-600">
                    Kirim Permintaan Booking
                  </button>
                </form>
              </div>
            )}

            {/* TAB STATUS & RIWAYAT ANTRIAN */}
            {user.role === "user" && activeTab === "history" && (
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <FaHistory className="text-gray-400" />
                  <h2 className="text-base font-black">Status Antrian Anda</h2>
                </div>

                <div className="space-y-3">
                  {queue.filter(t => t.owner === user.name).map((item) => (
                    <div key={item.id} className="p-4 bg-[#F8FAFC] rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                          <span>{item.id}</span> • <span>{item.date || 'Hari Ini'}</span>
                        </div>
                        <h4 className="text-xs font-black text-gray-800 mt-0.5">{item.issue}</h4>
                        <p className="text-xs font-bold text-[#FF6B2C]">Rp {item.price?.toLocaleString("id-ID")} • <span className="text-blue-600 font-black">+{item.pointsEarned} Pts</span></p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg border ${
                          item.status === "Pending Konfirmasi" ? "text-purple-700 bg-purple-50 border-purple-200" :
                          item.status === "Menunggu" ? "text-amber-700 bg-amber-50 border-amber-200" : "text-emerald-700 bg-emerald-50 border-emerald-200"
                        }`}>
                          {item.status === "Selesai" ? "✅ Selesai" : `⏳ ${item.status}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FITUR BARU TAB: DAFTAR KODE VOUCHER REWARD SAYA */}
            {user.role === "user" && activeTab === "rewards" && (
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <FaAward className="text-orange-500" />
                  <div>
                    <h2 className="text-base font-black">Voucher & Kupon Saya</h2>
                    <p className="text-xs text-gray-400">Tunjukkan kode unik di bawah ini ke kasir bengkel GoFix saat melakukan pembayaran.</p>
                  </div>
                </div>

                {claimHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-xs font-bold">Belum ada voucher yang diklaim. Tukarkan poin loyalty Anda!</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {claimHistory.map((vch) => (
                      <div key={vch.id} className="p-4 bg-orange-50/40 rounded-2xl border-2 border-dashed border-orange-200 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] bg-orange-100 text-[#FF6B2C] px-2 py-0.5 rounded font-black uppercase">{vch.id}</span>
                          <h4 className="text-xs font-black text-gray-800 mt-1.5">{vch.title}</h4>
                          <p className="text-[10px] text-gray-400">Diklaim pada: {vch.date}</p>
                        </div>
                        <div className="mt-4 p-2 bg-white rounded-xl border border-orange-100 text-center">
                          <span className="text-xs font-black tracking-widest text-gray-700 select-all block">{vch.code}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* HALAMAN KONTROL ADMIN (DENGAN REFRESH AUTO KE STORAGE) */}
            {user.role === "admin" && (
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-50 text-purple-600 p-2 rounded-xl"><FaWrench /></div>
                    <div>
                      <h2 className="text-base font-black">Konfirmasi Booking Masuk (Sisi Admin)</h2>
                      <p className="text-xs text-gray-400">Tombol di bawah ini langsung merubah status menjadi <b>Selesai</b> dan otomatis menyuntikkan bonus poin serta akumulasi level ke member terkait.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {queue.map((item) => (
                    <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="w-full md:w-auto">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">{item.plat}</span>
                          <span className="text-xs text-gray-500 font-bold">{item.owner}</span>
                        </div>
                        <h4 className="text-xs font-black text-gray-800 mt-1">{item.issue}</h4>
                        <span className="text-[10px] text-blue-600 font-bold">Potensi Hadiah: +{item.pointsEarned} Pts</span>
                      </div>

                      <div className="w-full md:w-auto text-right">
                        {item.status === "Pending Konfirmasi" ? (
                          <button onClick={() => handleApproveService(item.id)} className="bg-purple-600 hover:bg-purple-700 text-white font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider">
                            Selesaikan & Beri Poin
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-lg">✓ Selesai & Poin Masuk</span>
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