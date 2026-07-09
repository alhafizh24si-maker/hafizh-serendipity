import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCrown, FaWrench, FaClock, FaCheckCircle, 
  FaCoins, FaCalendarPlus, FaUserShield, FaHistory,
  FaSignOutAlt, FaChevronDown, FaCar, FaGift, FaAward,
  FaShoppingCart, FaStar, FaHeadset, FaTimes, FaPlus, FaMinus, FaTrash,
  FaFire, FaTrophy, FaChevronRight, FaGem
} from "react-icons/fa";

export default function Member() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [activeTab, setActiveTab] = useState("booking");
  const [historyTab, setHistoryTab] = useState("transaksi");

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

  // 2. STATE DATA METRICS MEMBER (MIGRASI V2)
  const [memberStats, setMemberStats] = useState(() => {
    const savedV2 = localStorage.getItem("gofix_member_stats_v2");
    if (savedV2) return JSON.parse(savedV2);

    const savedV1 = localStorage.getItem("gofix_member_stats");
    let base = savedV1 ? JSON.parse(savedV1) : { totalTransactions: 4, points: 380 };
    
    // Migration Logic
    let tierLevel = 0;
    if (base.tier?.includes("Bronze")) tierLevel = 1;
    if (base.tier?.includes("Silver")) tierLevel = 2;
    if (base.tier?.includes("Gold")) tierLevel = 3;
    if (base.tier?.includes("Platinum")) tierLevel = 4;
    
    let celebratedLevels = [];
    for(let i=0; i<=tierLevel; i++) celebratedLevels.push(i);

    return {
      totalTransactions: base.totalTransactions || 0,
      points: base.points || 0,
      lifetimePoints: (base.points || 0) + ((base.totalTransactions || 0) * 50),
      totalBookingPoints: 0,
      totalCompletionPoints: 0,
      totalRedeemedPoints: 0,
      weeklyStreak: 0,
      lastBookingWeek: null,
      celebratedLevels: celebratedLevels
    };
  });

  const [pointsHistory, setPointsHistory] = useState(() => {
    const saved = localStorage.getItem("gofix_points_history");
    return saved ? JSON.parse(saved) : [];
  });

  // 3. STATE LAINNYA
  const [bookingForm, setBookingForm] = useState({ serviceType: "", notes: "", estimatedPrice: 0 });
  
  const [queue, setQueue] = useState(() => {
    const savedQueue = localStorage.getItem("gofix_queue");
    return savedQueue ? JSON.parse(savedQueue) : [
      { id: 'TX-9901', plat: 'B 1234 GOF', owner: 'Budi Setiawan', issue: 'Tune Up Injection', status: 'Selesai', mechanicId: 'm1', price: 150000, date: '2026-06-10T10:00:00.000Z' },
      { id: 'TX-9902', plat: 'B 1234 GOF', owner: 'Budi Setiawan', issue: 'Ganti Kampas Rem Depan', status: 'Menunggu Servis', mechanicId: null, price: 120000, date: '2026-06-15T08:00:00.000Z' }
    ];
  });

  const [claimHistory, setClaimHistory] = useState(() => {
    const savedClaims = localStorage.getItem("gofix_claim_history");
    return savedClaims ? JSON.parse(savedClaims) : [];
  });
  
  const [cartItems, setCartItems] = useState(() => { const saved = localStorage.getItem("gofix_cart"); return saved ? JSON.parse(saved) : []; });
  const [reviews, setReviews] = useState(() => { const saved = localStorage.getItem("gofix_reviews"); return saved ? JSON.parse(saved) : []; });
  const [tickets, setTickets] = useState(() => { const saved = localStorage.getItem("gofix_tickets"); return saved ? JSON.parse(saved) : []; });
  const [pendingPayments, setPendingPayments] = useState(() => { const saved = localStorage.getItem("gofix_payments"); return saved ? JSON.parse(saved) : []; });
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    const saved = localStorage.getItem("gofix_banner_dismissed");
    if (!saved) return false;
    const { timestamp } = JSON.parse(saved);
    if (new Date().getTime() - timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("gofix_banner_dismissed"); return false;
    }
    return true;
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, orderData: null, method: "", vaNumber: "" });
  const [reviewModal, setReviewModal] = useState({ isOpen: false, txId: null, rating: 0, comment: "", category: "Performa Mekanik" });
  const [ticketForm, setTicketForm] = useState({ category: "Lainnya", txId: "", detail: "" });
  const [adminReply, setAdminReply] = useState({ ticketId: null, text: "" });
  
  // Celebration States
  const [showCelebration, setShowCelebration] = useState(false);
  const [newLevelData, setNewLevelData] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Sync to localStorage
  useEffect(() => { localStorage.setItem("gofix_member_stats_v2", JSON.stringify(memberStats)); }, [memberStats]);
  useEffect(() => { localStorage.setItem("gofix_points_history", JSON.stringify(pointsHistory)); }, [pointsHistory]);
  useEffect(() => { localStorage.setItem("gofix_queue", JSON.stringify(queue)); }, [queue]);
  useEffect(() => { localStorage.setItem("gofix_claim_history", JSON.stringify(claimHistory)); }, [claimHistory]);
  useEffect(() => { localStorage.setItem("gofix_cart", JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem("gofix_reviews", JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem("gofix_tickets", JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { localStorage.setItem("gofix_payments", JSON.stringify(pendingPayments)); }, [pendingPayments]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(prev => ({ ...prev, ...parsedUser, role: parsedUser.email?.includes("admin") ? "admin" : "user" }));
    }
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- DYNAMIC LEVEL & GAMIFICATION LOGIC ---
  const calculateLevel = (pts) => {
    if (pts >= 50000) return { level: 5, name: "Diamond Member 👑", nextThreshold: null, prevThreshold: 50000, color: "border-[#B9F2FF]", multiplier: 4.0, icon: "👑" };
    if (pts >= 15000) return { level: 4, name: "Platinum Member 💎", nextThreshold: 50000, prevThreshold: 15000, color: "border-[#E5E4E2]", multiplier: 3.0, icon: "💎" };
    if (pts >= 5000)  return { level: 3, name: "Gold Member 🥇", nextThreshold: 15000, prevThreshold: 5000, color: "border-[#FFD700]", multiplier: 2.0, icon: "🥇" };
    if (pts >= 1500)  return { level: 2, name: "Silver Member 🥈", nextThreshold: 5000, prevThreshold: 1500, color: "border-[#C0C0C0]", multiplier: 1.5, icon: "🥈" };
    if (pts >= 500)   return { level: 1, name: "Bronze Member 🥉", nextThreshold: 1500, prevThreshold: 500, color: "border-[#CD7F32]", multiplier: 1.2, icon: "🥉" };
    return { level: 0, name: "Regular Customer", nextThreshold: 500, prevThreshold: 0, color: "border-gray-200", multiplier: 1.0, icon: "👤" };
  };

  const currentLevelInfo = calculateLevel(memberStats.lifetimePoints);
  const currentMultiplier = currentLevelInfo.multiplier;

  // Watch for Level Up
  useEffect(() => {
    if (user.role === "user") {
      const currentLvl = calculateLevel(memberStats.lifetimePoints);
      if (!memberStats.celebratedLevels.includes(currentLvl.level)) {
        setNewLevelData(currentLvl);
        setShowCelebration(true);
        setMemberStats(prev => ({
          ...prev,
          celebratedLevels: [...prev.celebratedLevels, currentLvl.level]
        }));
      }
    }
  }, [memberStats.lifetimePoints, memberStats.celebratedLevels, user.role]);

  // Streak Logic
  const getIsoWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return `${d.getFullYear()}-W${Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7) + 1}`;
  };

  const calculateStreakBonus = (streak) => {
    if (streak >= 12) return 0.30;
    if (streak >= 8) return 0.20;
    if (streak >= 4) return 0.10;
    if (streak >= 2) return 0.05;
    return 0;
  };

  const checkTierEligibility = (minTier, userTier) => {
    const tiers = ["Regular Customer", "Bronze Member 🥉", "Silver Member 🥈", "Gold Member 🥇", "Platinum Member 💎", "Diamond Member 👑"];
    return tiers.indexOf(userTier) >= tiers.indexOf(minTier);
  };

  // --- CATALOGS ---
  const sparepartCatalog = [
    { id: "sp1", name: "Oli Mesin Shell Helix HX3 10W-40", price: 85000, category: "Oli", stock: 12, image: "🛢️" },
    { id: "sp2", name: "Kampas Rem Depan Honda Vario", price: 45000, category: "Rem", stock: 8, image: "🔧" },
    { id: "sp3", name: "Busi NGK Iridium CR7HIX", price: 65000, category: "Kelistrikan", stock: 15, image: "⚡" },
    { id: "sp4", name: "Filter Udara Vario 125/150", price: 35000, category: "Filter", stock: 20, image: "🌬️" },
    { id: "sp5", name: "Aki GS Astra MF GTZ5S", price: 210000, category: "Aki", stock: 5, image: "🔋" },
  ];

  const rewardsList = [
    { id: "r1", title: "Gratis Cuci Salju Hidrolik", cost: 40, desc: "Berlaku untuk semua level member.", minTier: "Regular Customer" },
    { id: "r2", title: "Potongan Jasa Servis Rp 50k", cost: 100, desc: "Voucher diskon khusus minimal Bronze.", minTier: "Bronze Member 🥉" },
    { id: "r3", title: "Diskon Oli Premium Eksklusif", cost: 150, desc: "Voucher diskon khusus minimal Silver.", minTier: "Silver Member 🥈" },
    { id: "r4", title: "Free Ganti Sparepart Up To 200k", cost: 300, desc: "Voucher Sultan khusus Gold Member.", minTier: "Gold Member 🥇" },
    { id: "r5", title: "Priority Lane Access + Free Oli", cost: 500, desc: "Bebas antrean & gratis ganti oli. Khusus Platinum.", minTier: "Platinum Member 💎" },
    { id: "r6", title: "VIP Event Access + Merch", cost: 1000, desc: "Akses VIP eksklusif untuk level Diamond.", minTier: "Diamond Member 👑" }
  ];

  // --- CART & CHECKOUT LOGIC ---
  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    let price = 0;
    if (selectedService === "Ganti Oli Shell Helix") price = 95000;
    if (selectedService === "Tune Up Injection") price = 150000;
    if (selectedService === "Service Rem & Kampas") price = 120000;
    if (selectedService === "Paket Service Lengkap + Oli") price = 350000;
    setBookingForm({ ...bookingForm, serviceType: selectedService, estimatedPrice: price });
  };

  const handleAddToCart = (item) => {
    const existing = cartItems.find(c => c.id === item.id);
    if (existing) {
      setCartItems(cartItems.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const getCartSubtotal = () => cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const getSparepartDiscount = () => {
    if (currentLevelInfo.name.includes("Diamond")) return 0.15;
    if (currentLevelInfo.name.includes("Platinum")) return 0.10;
    if (currentLevelInfo.name.includes("Gold")) return 0.05;
    return 0;
  };
  const cartSubtotal = getCartSubtotal();
  const discountAmount = cartSubtotal * getSparepartDiscount();
  const cartTotal = cartSubtotal - discountAmount;
  const grandTotal = bookingForm.estimatedPrice + cartTotal;

  const initiateCheckout = (e) => {
    if (e) e.preventDefault();
    if (!bookingForm.serviceType && cartItems.length === 0) return alert("Pilih minimal satu layanan servis atau sparepart!");

    const orderData = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      plat: user.platNomor,
      owner: user.name,
      issue: bookingForm.serviceType 
        ? `${bookingForm.serviceType} ${cartItems.length > 0 ? `+ ${cartItems.length} Sparepart` : ''}` 
        : `Pembelian ${cartItems.length} Sparepart`,
      notes: bookingForm.notes,
      price: grandTotal,
      cartItems: [...cartItems],
    };

    setPaymentModal({ isOpen: true, orderData, method: "", vaNumber: "" });
    setIsCartOpen(false);
  };

  // --- DUAL POINTS SYSTEM: PAYMENT / BOOKING ---
  const handlePaymentSubmit = () => {
    if (!paymentModal.method) return alert("Pilih metode pembayaran terlebih dahulu!");
    
    let va = "";
    if (paymentModal.method !== "Tunai di Kasir") {
      if (!paymentModal.vaNumber) {
        va = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
        setPaymentModal({...paymentModal, vaNumber: va});
        return;
      }
      va = paymentModal.vaNumber;
    }

    const orderData = paymentModal.orderData;
    const now = new Date();
    const currentWeek = getIsoWeek(now);
    
    // Streak logic
    let newStreak = memberStats.weeklyStreak;
    if (memberStats.lastBookingWeek !== currentWeek) {
      if (!memberStats.lastBookingWeek) {
        newStreak = 1;
      } else {
        const lastWeekYear = parseInt(memberStats.lastBookingWeek.split("-W")[0]);
        const lastWeekNum = parseInt(memberStats.lastBookingWeek.split("-W")[1]);
        const currWeekYear = parseInt(currentWeek.split("-W")[0]);
        const currWeekNum = parseInt(currentWeek.split("-W")[1]);
        
        const weekDiff = (currWeekYear - lastWeekYear) * 52 + (currWeekNum - lastWeekNum);
        if (weekDiff === 1) newStreak += 1;
        else if (weekDiff > 1) newStreak = 1; // Reset
      }
    }

    // A1. Booking Points (Instant Reward)
    const baseBookingPts = Math.floor(orderData.price / 20000);
    const streakBonusMultiplier = calculateStreakBonus(newStreak);
    const bonusBookingPts = Math.floor(baseBookingPts * streakBonusMultiplier);
    const totalBookingPts = baseBookingPts + bonusBookingPts;

    const newPayment = {
      ...orderData,
      paymentStatus: "Menunggu Pembayaran",
      method: paymentModal.method,
      date: now.toISOString()
    };
    
    setPendingPayments([newPayment, ...pendingPayments]);

    if (user.role === "user") {
      setMemberStats({
        ...memberStats,
        points: memberStats.points + totalBookingPts,
        lifetimePoints: memberStats.lifetimePoints + totalBookingPts,
        totalBookingPoints: memberStats.totalBookingPoints + totalBookingPts,
        weeklyStreak: newStreak,
        lastBookingWeek: currentWeek
      });

      const newHistory = {
        id: `PH-${Math.floor(10000+Math.random()*90000)}`,
        type: "booking",
        amount: totalBookingPts,
        description: `Booking: ${orderData.issue}`,
        txId: orderData.id,
        timestamp: now.toISOString(),
        metadata: { baseAmount: baseBookingPts, multiplier: 1.0, bonusType: streakBonusMultiplier > 0 ? "streak" : null, bonusAmount: bonusBookingPts }
      };
      setPointsHistory([newHistory, ...pointsHistory]);

      setToastMessage(`🎉 +${totalBookingPts} Poin Booking! Lakukan servis untuk unlock bonus poin selesai!`);
      setTimeout(() => setToastMessage(""), 5000);
    }
    
    setPaymentModal({ isOpen: false, orderData: null, method: "", vaNumber: "" });
    setBookingForm({ serviceType: "", notes: "", estimatedPrice: 0 });
    setCartItems([]);
    setActiveTab("history");
    setHistoryTab("transaksi");
  };

  // --- DUAL POINTS SYSTEM: COMPLETION ---
  const handleApproveService = (txId) => {
    setQueue(prevQueue => 
      prevQueue.map(item => {
        if (item.id === txId) {
          const now = new Date();
          const bookingDate = new Date(item.date);
          const hoursDiff = Math.abs(now - bookingDate) / 36e5;
          const isSpeedBonus = hoursDiff <= 24;

          const savedStats = localStorage.getItem("gofix_member_stats_v2");
          let currentStats = savedStats ? JSON.parse(savedStats) : { ...memberStats };
          
          const userLevelInfo = calculateLevel(currentStats.lifetimePoints);
          const baseCompletionPts = Math.floor(item.price / 10000);
          const completionPoints = Math.floor(baseCompletionPts * userLevelInfo.multiplier);
          
          let speedBonusPts = 0;
          if (isSpeedBonus) {
            speedBonusPts = Math.floor(completionPoints * 0.20); // 20% speed bonus
          }
          const totalEarned = completionPoints + speedBonusPts;

          const updatedStats = {
            ...currentStats,
            totalTransactions: currentStats.totalTransactions + 1,
            points: currentStats.points + totalEarned,
            lifetimePoints: currentStats.lifetimePoints + totalEarned,
            totalCompletionPoints: currentStats.totalCompletionPoints + totalEarned
          };

          setMemberStats(updatedStats);
          localStorage.setItem("gofix_member_stats_v2", JSON.stringify(updatedStats));

          const savedHistory = localStorage.getItem("gofix_points_history");
          const currHistory = savedHistory ? JSON.parse(savedHistory) : pointsHistory;
          const newHistory = {
            id: `PH-${Math.floor(10000+Math.random()*90000)}`,
            type: "completion",
            amount: totalEarned,
            description: `Selesai: ${item.issue}`,
            txId: item.id,
            timestamp: now.toISOString(),
            metadata: { baseAmount: baseCompletionPts, multiplier: userLevelInfo.multiplier, bonusType: isSpeedBonus ? "speed" : null, bonusAmount: speedBonusPts }
          };
          setPointsHistory([newHistory, ...currHistory]);

          return { ...item, status: "Selesai" }; 
        }
        return item;
      })
    );
    alert("Pesanan diselesaikan! Poin pelanggan telah berhasil ditambahkan.");
  };

  // --- REVIEW & BONUS LOGIC ---
  const handleReviewSubmit = () => {
    if (reviewModal.rating === 0) return alert("Berikan rating minimal 1 bintang!");
    
    const now = new Date().toISOString();
    const newReview = {
      id: `REV-${Math.floor(1000 + Math.random()*9000)}`,
      txId: reviewModal.txId,
      rating: reviewModal.rating,
      comment: reviewModal.comment,
      category: reviewModal.category,
      timestamp: now
    };
    setReviews([newReview, ...reviews]);
    
    // Auto flag complaint
    if (reviewModal.rating <= 2) {
      const newTicket = {
        id: `TKT-${Math.floor(1000 + Math.random()*9000)}`,
        txId: reviewModal.txId,
        category: "Kualitas Pekerjaan",
        detail: `[AUTO-FLAG dari Review Bintang ${reviewModal.rating}] ${reviewModal.comment}`,
        status: "Open",
        adminResponse: "",
        createdAt: now.split("T")[0]
      };
      setTickets([newTicket, ...tickets]);
    }

    // Review Bonus
    if (reviewModal.rating >= 4) {
      const tx = queue.find(q => q.id === reviewModal.txId) || pendingPayments.find(p => p.id === reviewModal.txId);
      if (tx) {
        const baseCompletionPts = Math.floor(tx.price / 10000);
        const completionPoints = Math.floor(baseCompletionPts * currentLevelInfo.multiplier);
        const reviewBonusPts = Math.floor(completionPoints * 0.10);
        
        if (reviewBonusPts > 0) {
          setMemberStats({
            ...memberStats,
            points: memberStats.points + reviewBonusPts,
            lifetimePoints: memberStats.lifetimePoints + reviewBonusPts,
          });
          const newHistory = {
            id: `PH-${Math.floor(10000+Math.random()*90000)}`,
            type: "bonus_review",
            amount: reviewBonusPts,
            description: `Review Bonus: Bintang ${reviewModal.rating}`,
            txId: reviewModal.txId,
            timestamp: now,
            metadata: { baseAmount: 0, multiplier: 1.0, bonusType: "review", bonusAmount: reviewBonusPts }
          };
          setPointsHistory(prev => [newHistory, ...prev]);
        }
      }
    }
    
    setReviewModal({ isOpen: false, txId: null, rating: 0, comment: "", category: "Performa Mekanik" });
    alert("Terima kasih atas ulasan Anda!");
  };

  // --- REWARD KLAIM ---
  const handleClaimReward = (reward) => {
    if (!checkTierEligibility(reward.minTier, currentLevelInfo.name)) {
      alert(`Maaf, reward ini khusus untuk level minimal ${reward.minTier.split(" ")[0]}.`);
      return;
    }
    if (memberStats.points < reward.cost) {
      alert("Maaf, poin loyalty Anda tidak mencukupi.");
      return;
    }

    setMemberStats(prev => ({ 
      ...prev, 
      points: prev.points - reward.cost,
      totalRedeemedPoints: prev.totalRedeemedPoints + reward.cost
    }));
    
    const now = new Date().toISOString();
    const newClaim = {
      id: `VCH-${Math.floor(10000 + Math.random() * 90000)}`,
      title: reward.title,
      cost: reward.cost,
      date: now.split("T")[0],
      code: `GOFIX-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    };
    setClaimHistory([newClaim, ...claimHistory]);

    const newHistory = {
      id: `PH-${Math.floor(10000+Math.random()*90000)}`,
      type: "redeem",
      amount: -reward.cost,
      description: `Redeem: ${reward.title}`,
      txId: newClaim.id,
      timestamp: now,
      metadata: { baseAmount: 0, multiplier: 1.0, bonusType: null, bonusAmount: 0 }
    };
    setPointsHistory(prev => [newHistory, ...prev]);
    
    alert(`Sukses klaim ${reward.title}! Kode voucher: ${newClaim.code}`);
  };

  // --- TICKET LOGIC ---
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.txId || !ticketForm.detail) return alert("Lengkapi ID Transaksi dan Detail Keluhan!");
    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random()*9000)}`,
      txId: ticketForm.txId,
      category: ticketForm.category,
      detail: ticketForm.detail,
      status: "Open",
      adminResponse: "",
      createdAt: new Date().toISOString().split("T")[0]
    };
    setTickets([newTicket, ...tickets]);
    setTicketForm({ category: "Lainnya", txId: "", detail: "" });
    alert("Tiket keluhan berhasil dikirim.");
  };

  // --- ADMIN LAINNYA ---
  const handleVerifyPayment = (paymentId) => {
    const payment = pendingPayments.find(p => p.id === paymentId);
    if (!payment) return;
    const newOrder = {
      id: payment.id,
      plat: payment.plat,
      owner: payment.owner,
      issue: payment.issue,
      status: "Menunggu Servis", 
      mechanicId: null,
      price: payment.price,
      date: payment.date
    };
    setQueue([newOrder, ...queue]);
    setPendingPayments(pendingPayments.filter(p => p.id !== paymentId));
    alert("Pembayaran diverifikasi! Pesanan masuk ke antrean bengkel.");
  };

  const submitAdminReply = () => {
    if(!adminReply.text) return;
    setTickets(tickets.map(t => t.id === adminReply.ticketId ? { ...t, status: "Resolved", adminResponse: adminReply.text, resolvedAt: new Date().toISOString().split("T")[0] } : t));
    setAdminReply({ ticketId: null, text: "" });
    alert("Tanggapan berhasil dikirim!");
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("user");
      navigate("/"); 
    }
  };

  // --- UI RENDERS ---
  const renderBanner = () => {
    if (bannerDismissed || user.role !== "user") return null;
    let content = { bg: "bg-[#FF6B2C]", text: "🎉 Diskon 10% servis pertama! Gunakan kode: WELCOME10" };
    if (currentLevelInfo.name.includes("Bronze")) content = { bg: "bg-[#CD7F32]", text: "🥉 Naik ke Silver untuk unlock diskon khusus." };
    if (currentLevelInfo.name.includes("Silver")) content = { bg: "bg-gray-500", text: "🥈 Gratis coolant check bulan ini! Jadwalkan servis sekarang." };
    if (currentLevelInfo.name.includes("Gold")) content = { bg: "bg-yellow-600", text: "🥇 Dapatkan 5% diskon sparepart eksklusif." };
    if (currentLevelInfo.name.includes("Platinum")) content = { bg: "bg-gradient-to-r from-purple-500 to-blue-500", text: "💎 Priority Lane aktif! Langsung ke mekanik tanpa antre." };
    if (currentLevelInfo.name.includes("Diamond")) content = { bg: "bg-gradient-to-r from-blue-400 to-cyan-400", text: "👑 VIP Event Gathering — RSVP sekarang!" };

    return (
      <div className={`${content.bg} text-white px-4 py-3 rounded-xl mb-6 flex justify-between items-center shadow-sm`}>
        <span className="text-xs font-black">{content.text}</span>
        <button onClick={() => {
          setBannerDismissed(true);
          localStorage.setItem("gofix_banner_dismissed", JSON.stringify({ timestamp: new Date().getTime() }));
        }} className="p-1 hover:bg-black/10 rounded"><FaTimes /></button>
      </div>
    );
  };

  // SVG Progress Calculation
  const progressRadius = 42;
  const progressCircumference = 2 * Math.PI * progressRadius;
  const progressPercent = currentLevelInfo.nextThreshold 
    ? ((memberStats.lifetimePoints - currentLevelInfo.prevThreshold) / (currentLevelInfo.nextThreshold - currentLevelInfo.prevThreshold)) * 100
    : 100;
  const progressOffset = progressCircumference - (progressPercent / 100) * progressCircumference;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-jakarta text-[#1A1A1A]">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-2xl z-[100] font-black text-xs flex items-center gap-3 animate-bounce">
          <FaCoins className="text-yellow-300 text-lg" /> {toastMessage}
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-[#FF6B2C] text-white p-2 rounded-xl font-black text-sm tracking-tighter">GO</div>
            <span className="font-black text-lg tracking-tight">Bengkel<span className="text-[#FF6B2C]">GoFix</span></span>
          </div>

          {user.role === "user" && (
            <nav className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button onClick={() => setActiveTab("booking")} className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "booking" ? "bg-[#FF6B2C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>Booking</button>
              <button onClick={() => setActiveTab("sparepart")} className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "sparepart" ? "bg-[#FF6B2C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>Sparepart</button>
              <button onClick={() => setActiveTab("history")} className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "history" ? "bg-[#FF6B2C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>Riwayat</button>
              <button onClick={() => setActiveTab("rewards")} className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "rewards" ? "bg-[#FF6B2C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>Voucher</button>
              <button onClick={() => setActiveTab("bantuan")} className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === "bantuan" ? "bg-[#FF6B2C] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>Bantuan</button>
            </nav>
          )}

          <div className="flex items-center gap-4" ref={dropdownRef}>
            {user.role === "user" && (
              <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-2 text-gray-500 hover:text-[#FF6B2C] transition-colors">
                <FaShoppingCart className="text-xl" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6B2C] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{cartItems.length}</span>
                )}
              </button>
            )}
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-2 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#FF6B2C] font-black text-xs">
                  {user.name ? user.name.charAt(0) : "M"}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black leading-none max-w-[120px] truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-0.5 uppercase tracking-tight">{currentLevelInfo.name.split(" ")[0]}</p>
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
                    <div className="flex items-center gap-1.5 text-xs font-black text-gray-700"><FaCar className="text-[#FF6B2C]" /> Kendaraan</div>
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
      <div className="md:hidden bg-white border-b border-gray-100 p-2 flex flex-wrap gap-1.5 justify-center">
        {user.role === "user" && ["booking", "sparepart", "history", "rewards", "bantuan"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase ${activeTab === tab ? "bg-[#FF6B2C] text-white" : "bg-gray-50 text-gray-500"}`}>{tab}</button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {renderBanner()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SEKSI KIRI: GAMIFIED METRICS */}
          {user.role === "user" && (
            <div className="lg:col-span-1 space-y-6">
              
              {/* GAMIFIED PROFILE CARD */}
              <div className="bg-[#1A1A1A] text-white p-6 rounded-[24px] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-50"></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="transform -rotate-90 w-28 h-28 absolute inset-0">
                      <circle cx="56" cy="56" r={progressRadius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-800" />
                      <circle cx="56" cy="56" r={progressRadius} stroke="currentColor" strokeWidth="6" fill="transparent"
                        strokeDasharray={progressCircumference} strokeDashoffset={progressOffset} 
                        className="text-[#FF6B2C] transition-all duration-1000 ease-in-out" strokeLinecap="round" />
                    </svg>
                    <div className={`w-20 h-20 rounded-full border-4 ${currentLevelInfo.color} flex flex-col items-center justify-center bg-gray-900 shadow-inner`}>
                      <span className="text-3xl filter drop-shadow-md">{currentLevelInfo.icon}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Lifetime Points</p>
                    <p className="text-2xl font-black text-white">{memberStats.lifetimePoints.toLocaleString()}</p>
                    <div className="flex items-center justify-end gap-1 text-[10px] mt-1 text-orange-400 font-bold">
                      <FaFire className="text-orange-500 animate-pulse" /> Streak: {memberStats.weeklyStreak} Mgg
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className={`text-xl font-black mb-1 ${currentLevelInfo.name.includes("Diamond") || currentLevelInfo.name.includes("Platinum") ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300" : "text-white"}`}>{currentLevelInfo.name}</h3>
                  <p className="text-[11px] text-gray-400 font-medium">Multiplier Poin Servis: <b className="text-green-400">{currentMultiplier}x</b></p>
                  
                  {currentLevelInfo.nextThreshold && (
                    <p className="text-[10px] text-gray-500 font-bold mt-4">
                      Butuh {currentLevelInfo.nextThreshold - memberStats.lifetimePoints} poin lagi untuk ke level selanjutnya.
                    </p>
                  )}
                </div>
              </div>

              {/* DOMPET POIN (REDEEMABLE) */}
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-yellow-50 rounded-lg text-yellow-500"><FaCoins /></div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Poin Tersedia</h4>
                  </div>
                  <span className="text-2xl font-black text-gray-800">{memberStats.points.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-blue-500" />
                    <span className="text-[10px] font-black text-blue-800 uppercase">Total Dibelanjakan</span>
                  </div>
                  <span className="text-xs font-black text-blue-600">{memberStats.totalRedeemedPoints.toLocaleString()}</span>
                </div>
              </div>

            </div>
          )}

          {/* SEKSI KANAN: KONTEN TABS */}
          <div className={`${user.role === "admin" ? "lg:col-span-3" : "lg:col-span-2"} space-y-6`}>
            
            {/* TAB BOOKING */}
            {user.role === "user" && activeTab === "booking" && (
              <div className="bg-white p-6 md:p-8 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-50 text-[#FF6B2C] p-2.5 rounded-xl"><FaCalendarPlus className="text-lg" /></div>
                  <div>
                    <h2 className="text-base font-black">Formulir Booking Servis</h2>
                    <p className="text-xs text-gray-400">Poin Anda dikalikan berdasarkan tingkat level member Anda sekarang.</p>
                  </div>
                </div>

                <form onSubmit={initiateCheckout} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Jenis Layanan</label>
                    <select value={bookingForm.serviceType} onChange={handleServiceChange} className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs">
                      <option value="">-- Pilih Jenis Layanan (Opsional jika hanya beli sparepart) --</option>
                      <option value="Ganti Oli Shell Helix">Ganti Oli Shell Helix — Rp 95.000</option>
                      <option value="Tune Up Injection">Tune Up Service Injection — Rp 150.000</option>
                      <option value="Service Rem & Kampas">Paket Service Rem & Kampas — Rp 120.000</option>
                      <option value="Paket Service Lengkap + Oli">Paket Service Lengkap + Oli — Rp 350.000</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Detail Tambahan Keluhan</label>
                    <textarea rows="3" value={bookingForm.notes} onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })} className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs" placeholder="Misal: Rem belakang blong, bunyi berdecit..." />
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase">Estimasi Jasa Servis</p>
                      <p className="text-lg font-black text-[#FF6B2C]">Rp {bookingForm.estimatedPrice.toLocaleString("id-ID")}</p>
                    </div>
                    <button type="submit" className="bg-[#1A1A1A] text-white font-black px-6 py-3 rounded-xl uppercase text-xs tracking-widest shadow-md hover:bg-black transition-colors">
                      Lanjut Checkout
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB SPAREPART */}
            {user.role === "user" && activeTab === "sparepart" && (
              <div className="bg-white p-6 md:p-8 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl"><FaWrench className="text-lg" /></div>
                  <div>
                    <h2 className="text-base font-black">Katalog Suku Cadang</h2>
                    <p className="text-xs text-gray-400">Tambahkan ke keranjang untuk dipasang saat servis.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sparepartCatalog.map(sp => (
                    <div key={sp.id} className="p-4 border border-gray-100 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="flex gap-3">
                        <div className="text-3xl bg-gray-50 p-2 rounded-lg">{sp.image}</div>
                        <div>
                          <span className="text-[9px] font-black text-gray-400 uppercase">{sp.category}</span>
                          <h4 className="text-xs font-black text-gray-800 leading-tight mt-0.5">{sp.name}</h4>
                          <p className="text-sm font-black text-[#FF6B2C] mt-1">Rp {sp.price.toLocaleString("id-ID")}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-500">Stok: {sp.stock}</span>
                        <button onClick={() => handleAddToCart(sp)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wide">
                          + Keranjang
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB HISTORY & REVIEWS WITH SUBTABS */}
            {user.role === "user" && activeTab === "history" && (
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <FaHistory className="text-gray-400 text-xl" />
                  <h2 className="text-base font-black">Riwayat Transaksi & Poin</h2>
                </div>

                {/* Subtabs */}
                <div className="flex gap-2 mb-6 border-b border-gray-100 pb-4">
                  <button onClick={() => setHistoryTab("transaksi")} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${historyTab === "transaksi" ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-500"}`}>Transaksi Servis</button>
                  <button onClick={() => setHistoryTab("poin")} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${historyTab === "poin" ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-500"}`}>Riwayat Poin</button>
                </div>

                {historyTab === "transaksi" && (
                  <div className="space-y-3">
                    {[...pendingPayments, ...queue.filter(t => t.owner === user.name)].map((item) => {
                      const hasReviewed = reviews.some(r => r.txId === item.id);
                      return (
                        <div key={item.id} className="p-4 bg-[#F8FAFC] rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                          <div>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                              <span>{item.id}</span> • <span>{new Date(item.date).toLocaleDateString("id-ID")}</span>
                            </div>
                            <h4 className="text-xs font-black text-gray-800 mt-0.5">{item.issue}</h4>
                            <p className="text-xs font-bold text-[#FF6B2C]">Rp {item.price?.toLocaleString("id-ID")}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg border ${
                              item.paymentStatus === "Menunggu Pembayaran" ? "text-orange-700 bg-orange-50 border-orange-200" :
                              item.status === "Selesai" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-amber-700 bg-amber-50 border-amber-200"
                            }`}>
                              {item.paymentStatus === "Menunggu Pembayaran" ? "⏳ Menunggu Pembayaran" : 
                               item.status === "Selesai" ? "✅ Selesai" : `⏳ ${item.status}`}
                            </span>
                            
                            {item.status === "Selesai" && !hasReviewed && (
                              <button onClick={() => setReviewModal({ ...reviewModal, isOpen: true, txId: item.id })} className="text-[10px] font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase">
                                <FaStar /> Beri Ulasan (+ Bonus Poin)
                              </button>
                            )}
                            {hasReviewed && <span className="text-[10px] font-black text-gray-400 flex items-center gap-1"><FaStar className="text-yellow-400"/> Telah Diulas</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {historyTab === "poin" && (
                  <div className="space-y-3">
                    {pointsHistory.length === 0 ? <p className="text-xs text-gray-400">Belum ada riwayat poin.</p> : null}
                    {pointsHistory.map(ph => (
                      <div key={ph.id} className="p-4 border border-gray-100 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${ph.amount > 0 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                            {ph.type === 'booking' ? '📅' : ph.type === 'completion' ? '✅' : ph.type === 'redeem' ? '🎟️' : '🎁'}
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{new Date(ph.timestamp).toLocaleString("id-ID", {dateStyle:"medium", timeStyle:"short"})}</p>
                            <p className="text-xs font-bold text-gray-800">{ph.description}</p>
                            <div className="hidden group-hover:block text-[9px] text-gray-500 mt-1">
                              {ph.metadata?.bonusType && <span className="bg-yellow-100 text-yellow-700 px-1 py-0.5 rounded">+{ph.metadata.bonusAmount} {ph.metadata.bonusType} bonus</span>}
                            </div>
                          </div>
                        </div>
                        <span className={`text-sm font-black ${ph.amount > 0 ? "text-emerald-600" : "text-red-500"}`}>
                          {ph.amount > 0 ? "+" : ""}{ph.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB REWARDS */}
            {user.role === "user" && activeTab === "rewards" && (
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <FaAward className="text-orange-500 text-xl" />
                  <div>
                    <h2 className="text-base font-black">Tukar Poin & Voucher</h2>
                    <p className="text-xs text-gray-400">Tukarkan redeemable points Anda. (Poin ditukar tidak mengurangi Lifetime Points).</p>
                  </div>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto mb-8 pr-1">
                  {rewardsList.map((reward) => {
                    const isEligible = checkTierEligibility(reward.minTier, currentLevelInfo.name);
                    return (
                      <div key={reward.id} className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between sm:items-center gap-3 transition-all ${isEligible ? "bg-[#F8FAFC] border-gray-200" : "bg-gray-50 border-gray-100 opacity-60"}`}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-black text-gray-800">{reward.title}</h5>
                            {!isEligible && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-black">LOCKED</span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{reward.desc}</p>
                          <span className="text-[10px] text-[#FF6B2C] font-bold block mt-1">Syarat: {reward.minTier}</span>
                        </div>
                        <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                          <span className="text-sm font-black bg-orange-100 text-orange-700 px-2 py-1 rounded-lg">-{reward.cost} Pts</span>
                          <button 
                            onClick={() => handleClaimReward(reward)} 
                            disabled={!isEligible}
                            className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-colors ${isEligible ? "bg-[#1A1A1A] text-white hover:bg-black" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                          >
                            {isEligible ? "Tukar" : `Butuh ${reward.minTier.split(" ")[0]}`}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <h3 className="text-sm font-black mb-4 border-t pt-6">Voucher Tersedia Milik Anda</h3>
                {claimHistory.length === 0 ? (
                  <div className="text-center py-4 text-gray-400 text-xs font-bold">Belum ada voucher yang diklaim.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {/* TAB TICKETS / BANTUAN */}
            {user.role === "user" && activeTab === "bantuan" && (
              <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <FaHeadset className="text-indigo-500 text-lg" />
                  <div>
                    <h2 className="text-base font-black">Pusat Bantuan & Keluhan</h2>
                    <p className="text-xs text-gray-400">Ajukan keluhan layanan atau masalah suku cadang di sini.</p>
                  </div>
                </div>

                <form onSubmit={handleTicketSubmit} className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h3 className="text-xs font-black uppercase text-gray-600 mb-4">Buat Tiket Baru</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <select value={ticketForm.category} onChange={e => setTicketForm({...ticketForm, category: e.target.value})} className="px-3 py-2 border rounded-lg text-xs font-bold" required>
                      <option value="Lainnya">Kategori Keluhan</option>
                      <option value="Kualitas Pekerjaan">Kualitas Pekerjaan Servis</option>
                      <option value="Suku Cadang Bermasalah">Suku Cadang Bermasalah</option>
                      <option value="Keterlambatan Servis">Keterlambatan Servis</option>
                      <option value="Biaya Tidak Sesuai">Biaya Tidak Sesuai</option>
                    </select>
                    <input type="text" placeholder="ID Transaksi (Contoh: TX-1234)" value={ticketForm.txId} onChange={e => setTicketForm({...ticketForm, txId: e.target.value})} className="px-3 py-2 border rounded-lg text-xs font-bold" required />
                  </div>
                  <textarea rows="3" placeholder="Jelaskan detail keluhan Anda..." value={ticketForm.detail} onChange={e => setTicketForm({...ticketForm, detail: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-xs mb-3" required />
                  <button type="submit" className="bg-indigo-600 text-white font-black px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider">Ajukan Tiket</button>
                </form>

                <h3 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Riwayat Tiket Anda</h3>
                <div className="space-y-3">
                  {tickets.length === 0 ? <p className="text-xs text-gray-400 font-medium">Belum ada tiket keluhan yang dibuat.</p> : null}
                  {tickets.map(t => (
                    <div key={t.id} className="p-4 border border-gray-100 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-black text-gray-500 uppercase">{t.id} • {t.txId}</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${t.status === 'Open' ? 'bg-red-100 text-red-700' : t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.status}</span>
                      </div>
                      <p className="text-xs font-bold text-gray-800 mb-2">[{t.category}] {t.detail}</p>
                      {t.adminResponse && (
                        <div className="mt-2 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                          <span className="text-[9px] font-black text-indigo-800 uppercase block mb-1">Tanggapan Admin ({t.resolvedAt})</span>
                          <p className="text-xs text-indigo-900">{t.adminResponse}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HALAMAN ADMIN PANEL */}
            {user.role === "admin" && (
              <div className="space-y-6">
                
                {/* ADMIN: APPROVE SERVICE */}
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="bg-purple-50 text-purple-600 p-2 rounded-xl"><FaWrench /></div>
                    <div>
                      <h2 className="text-base font-black">Antrean Servis (Sisi Admin)</h2>
                      <p className="text-xs text-gray-400">Selesaikan servis untuk mengirim Completion Points ke member.</p>
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
                          <span className="text-[10px] text-blue-600 font-bold">Total Harga: Rp {item.price?.toLocaleString()}</span>
                        </div>
                        <div className="w-full md:w-auto text-right">
                          {item.status !== "Selesai" ? (
                            <button onClick={() => handleApproveService(item.id)} className="bg-purple-600 hover:bg-purple-700 text-white font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider">
                              Selesaikan & Beri Poin
                            </button>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-3 py-1.5 rounded-lg">✓ Selesai</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ADMIN: PAYMENT VERIFICATION */}
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="bg-green-50 text-green-600 p-2 rounded-xl"><FaCoins /></div>
                    <div>
                      <h2 className="text-base font-black">Pembayaran Menunggu Verifikasi</h2>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {pendingPayments.length === 0 && <p className="text-xs text-gray-400">Tidak ada pembayaran tertunda.</p>}
                    {pendingPayments.map(p => (
                      <div key={p.id} className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex justify-between items-center">
                        <div>
                          <p className="text-xs font-black text-gray-800">{p.id} - {p.owner}</p>
                          <p className="text-[10px] text-gray-500">{p.method} • Rp {p.price?.toLocaleString()}</p>
                        </div>
                        <button onClick={() => handleVerifyPayment(p.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase">Verifikasi</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ADMIN: TICKET RESPONSES */}
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="bg-red-50 text-red-600 p-2 rounded-xl"><FaHeadset /></div>
                    <div>
                      <h2 className="text-base font-black">Keluhan & Tiket Masuk (Prioritas)</h2>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {tickets.filter(t => t.status === "Open").length === 0 && <p className="text-xs text-gray-400">Tidak ada tiket terbuka.</p>}
                    {tickets.filter(t => t.status === "Open").map(t => (
                      <div key={t.id} className="p-4 border-l-4 border-red-500 bg-gray-50 rounded-r-xl">
                        <div className="flex justify-between">
                          <span className="text-[10px] font-black text-gray-600">{t.txId}</span>
                          <span className="text-[9px] bg-red-100 text-red-600 px-2 rounded font-black">{t.category}</span>
                        </div>
                        <p className="text-xs font-medium my-2">{t.detail}</p>
                        <div className="flex gap-2 mt-4">
                          <input type="text" placeholder="Tulis tanggapan..." value={adminReply.ticketId === t.id ? adminReply.text : ""} onChange={(e) => setAdminReply({ ticketId: t.id, text: e.target.value })} className="flex-1 text-xs px-3 py-2 border border-gray-300 rounded font-bold" />
                          <button onClick={submitAdminReply} className="bg-gray-800 text-white px-4 py-2 text-[10px] font-black rounded uppercase">Balas</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </main>

      {/* --- SIDEBAR KERANJANG (SLIDE IN) --- */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <h3 className="font-black text-sm flex items-center gap-2"><FaShoppingCart /> Keranjang Sparepart</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-red-500 p-2"><FaTimes /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-400 text-xs font-bold mt-10">Keranjang kosong.</div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                  <div className="text-2xl bg-gray-100 p-2 rounded">{item.image}</div>
                  <div className="flex-1">
                    <h4 className="text-[10px] font-black leading-tight">{item.name}</h4>
                    <p className="text-[#FF6B2C] text-xs font-black mt-1">Rp {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCartItems(cartItems.map(c => c.id === item.id ? {...c, qty: Math.max(1, c.qty-1)} : c))} className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-xs hover:bg-gray-200"><FaMinus/></button>
                    <span className="text-xs font-black w-3 text-center">{item.qty}</span>
                    <button onClick={() => setCartItems(cartItems.map(c => c.id === item.id ? {...c, qty: c.qty+1} : c))} className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-xs hover:bg-gray-200"><FaPlus/></button>
                    <button onClick={() => setCartItems(cartItems.filter(c => c.id !== item.id))} className="ml-2 text-red-500 p-1 hover:bg-red-50 rounded"><FaTrash className="text-xs"/></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-gray-50 border-t space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>Subtotal Suku Cadang:</span>
              <span>Rp {cartSubtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-xs font-bold text-green-600">
                <span>Diskon Tier ({(getSparepartDiscount()*100).toFixed(0)}%):</span>
                <span>- Rp {discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>Estimasi Jasa Servis:</span>
              <span>Rp {bookingForm.estimatedPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-black pt-2 border-t">
              <span>Grand Total:</span>
              <span className="text-[#FF6B2C]">Rp {grandTotal.toLocaleString()}</span>
            </div>
            <button onClick={initiateCheckout} disabled={grandTotal === 0} className={`w-full py-3 mt-4 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${grandTotal > 0 ? "bg-[#1A1A1A] text-white hover:bg-black" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
              Checkout Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* --- PAYMENT MODAL --- */}
      {paymentModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-[#1A1A1A] text-white p-4 text-center relative">
              <h3 className="font-black text-sm uppercase tracking-widest">Pembayaran Digital</h3>
              <button onClick={() => setPaymentModal({ ...paymentModal, isOpen: false })} className="absolute right-4 top-4 text-gray-400 hover:text-white"><FaTimes/></button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Tagihan</p>
                <p className="text-3xl font-black text-[#FF6B2C]">Rp {paymentModal.orderData?.price.toLocaleString()}</p>
                <p className="text-[10px] text-blue-600 font-bold mt-1">Dapatkan Poin Booking setelah bayar!</p>
              </div>

              {!paymentModal.vaNumber ? (
                <>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Metode Pembayaran</label>
                  <div className="space-y-2 mb-6">
                    {["Transfer Bank (BCA/BNI/Mandiri)", "E-Wallet (GoPay/OVO/DANA)", "Tunai di Kasir"].map(m => (
                      <button key={m} onClick={() => setPaymentModal({...paymentModal, method: m})} className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all ${paymentModal.method === m ? "border-[#FF6B2C] bg-orange-50 text-[#FF6B2C]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                  <button onClick={handlePaymentSubmit} className="w-full bg-[#FF6B2C] text-white font-black py-3 rounded-xl uppercase text-[10px] tracking-widest shadow-md hover:bg-orange-600 transition-colors">Lanjutkan Pembayaran</button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-xs font-bold text-gray-600">Selesaikan pembayaran dalam 15:00</p>
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Virtual Account Number</p>
                    <p className="text-xl font-black text-gray-800 tracking-widest select-all">{paymentModal.vaNumber}</p>
                  </div>
                  <button onClick={handlePaymentSubmit} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl uppercase text-[10px] tracking-widest shadow-md transition-colors">Saya Sudah Bayar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- REVIEW MODAL --- */}
      {reviewModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-sm p-6 shadow-2xl relative">
            <button onClick={() => setReviewModal({ ...reviewModal, isOpen: false })} className="absolute right-4 top-4 text-gray-400 hover:text-gray-800"><FaTimes/></button>
            <h3 className="font-black text-sm uppercase text-center mb-6">Beri Ulasan Servis</h3>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setReviewModal({...reviewModal, rating: star})} className="text-3xl focus:outline-none transition-transform hover:scale-110">
                  <FaStar className={reviewModal.rating >= star ? "text-yellow-400" : "text-gray-200"} />
                </button>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <select value={reviewModal.category} onChange={e => setReviewModal({...reviewModal, category: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-bold">
                <option value="Performa Mekanik">Performa Mekanik</option>
                <option value="Kecepatan Pengerjaan">Kecepatan Pengerjaan</option>
                <option value="Kualitas Suku Cadang">Kualitas Suku Cadang</option>
              </select>
              <textarea rows="3" placeholder="Ceritakan pengalaman Anda..." value={reviewModal.comment} onChange={e => setReviewModal({...reviewModal, comment: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs" />
            </div>

            <button onClick={handleReviewSubmit} className="w-full bg-[#1A1A1A] text-white font-black py-3 rounded-xl uppercase text-[10px] tracking-widest shadow-md hover:bg-black transition-colors">Kirim Ulasan</button>
          </div>
        </div>
      )}

      {/* --- LEVEL UP CELEBRATION MODAL --- */}
      {showCelebration && newLevelData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70] flex items-center justify-center p-4 transition-opacity duration-500">
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl text-center relative animate-bounce-short">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className={`w-32 h-32 rounded-full border-8 ${newLevelData.color} bg-gray-900 flex items-center justify-center shadow-2xl`}>
                <span className="text-6xl">{newLevelData.icon}</span>
              </div>
            </div>
            
            <div className="mt-16 mb-6">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Selamat! Anda Naik Level!</p>
              <h2 className={`text-2xl font-black ${newLevelData.name.includes("Diamond") || newLevelData.name.includes("Platinum") ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500" : "text-gray-900"}`}>{newLevelData.name}</h2>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8 space-y-2 text-left">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Benefit Baru Terbuka:</h4>
              <p className="text-xs font-bold text-gray-700 flex items-center gap-2"><FaCheckCircle className="text-green-500"/> Multiplier Poin naik menjadi <span className="text-green-600 font-black">{newLevelData.multiplier}x</span></p>
              {newLevelData.name.includes("Bronze") && <p className="text-xs font-bold text-gray-700 flex items-center gap-2"><FaCheckCircle className="text-green-500"/> Akses diskon jasa servis</p>}
              {newLevelData.name.includes("Silver") && <p className="text-xs font-bold text-gray-700 flex items-center gap-2"><FaCheckCircle className="text-green-500"/> Diskon oli premium terbuka</p>}
              {newLevelData.name.includes("Gold") && <p className="text-xs font-bold text-gray-700 flex items-center gap-2"><FaCheckCircle className="text-green-500"/> Diskon sparepart 5% aktif</p>}
              {newLevelData.name.includes("Platinum") && <p className="text-xs font-bold text-gray-700 flex items-center gap-2"><FaCheckCircle className="text-green-500"/> Bebas antrean & Diskon sparepart 10%</p>}
              {newLevelData.name.includes("Diamond") && <p className="text-xs font-bold text-gray-700 flex items-center gap-2"><FaCheckCircle className="text-green-500"/> Diskon 15%, Akses VIP Event & Merchandise</p>}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowCelebration(false)} className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">Tutup</button>
              <button onClick={() => { setShowCelebration(false); setActiveTab("rewards"); }} className="flex-1 px-4 py-3 bg-[#FF6B2C] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 transition-colors">Lihat Reward</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}