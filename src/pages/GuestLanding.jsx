import FloatingChat from ".././components/FloatingChat";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FaWrench, FaSearch, FaStar, FaArrowRight, 
    FaCheckCircle, FaMapMarkerAlt, FaGift, FaRocket, 
    FaShieldAlt, FaUsers, FaClock, FaTags, FaBox, 
    FaPhoneAlt, FaHome, FaUserCheck, FaWallet, FaQuoteLeft,
    FaEye, FaArrowUp, FaChevronDown, FaChevronUp, FaSun, FaMoon, FaCircle, FaBell, FaTimes
} from "react-icons/fa";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../components/ui/sheet";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../components/ui/collapsible";
import { Toaster, toast } from "sonner";
import { Switch } from "../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from "../components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

export default function GuestLanding() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [claimedVouchers, setClaimedVouchers] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [animatedStats, setAnimatedStats] = useState({ mitra: 0, mekanik: 0, waktu: 0 });
    const [visibleSections, setVisibleSections] = useState(new Set());
    const [openSheetId, setOpenSheetId] = useState(null);
    const [openCollapsibleId, setOpenCollapsibleId] = useState(null);
    const [isFabHovered, setIsFabHovered] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('bengkelgofix-theme');
        return saved !== null ? saved === 'dark' : true;
    });

    const [selectedMotor, setSelectedMotor] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [selectedParts, setSelectedParts] = useState([]);

    // CRM & Analytics States
    const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
    const [showBanner, setShowBanner] = useState(false);
    const [notifications, setNotifications] = useState([]);
    
    // Lead Capture States
    const [leadModalOpen, setLeadModalOpen] = useState(false);
    const [leadStep, setLeadStep] = useState(1);
    const [leadData, setLeadData] = useState({ nama: '', wa: '', email: '', tujuan: 'Servis Motor Saya', setuju: false, source: '' });
    
    // CRM Dashboard
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const [leadsList, setLeadsList] = useState([]);

    const heroRef = useRef(null);
    const vouchersRef = useRef(null);
    const productsRef = useRef(null);
    const statsRef = useRef(null);
    const ctaRef = useRef(null);
    const testimonialsRef = useRef(null);

    // Data Arrays
    const liveActivities = [
        { id: 1, text: "Budi dari Rumbai baru saja booking Servis Rutin — 2 menit yang lalu" },
        { id: 2, text: "Siti dari Panam mengklaim voucher DISKON20K — 5 menit yang lalu" },
        { id: 3, text: "Andi dari Diponegoro memberi rating 5 bintang — 8 menit yang lalu" },
        { id: 4, text: "Bengkel Maju Jaya baru bergabung sebagai Mitra — 12 menit yang lalu" },
    ];

    const servicePrices = { "Ganti Oli": 50000, "Servis Rutin": 150000, "Ganti Kampas Rem": 75000, "Tune Up Mesin": 200000 };
    const partPrices = { "Oli Mesin": 65000, "Filter Udara": 35000, "Busi": 25000, "Aki": 210000 };

    const calculateTotal = () => {
        let total = servicePrices[selectedService] || 0;
        selectedParts.forEach(part => { total += partPrices[part] || 0; });
        return total;
    };
    const estimatedTime = selectedService === "Tune Up Mesin" ? "60-90 Menit" : selectedService === "Servis Rutin" ? "45-60 Menit" : "15-30 Menit";

    const trackEvent = (eventType, payload) => {
        const events = JSON.parse(localStorage.getItem('bengkelgofix-analytics') || '[]');
        events.push({ eventType, payload, timestamp: new Date().toISOString(), sessionId });
        localStorage.setItem('bengkelgofix-analytics', JSON.stringify(events));
    };

    const addNotification = (notif) => {
        setNotifications(prev => [{ ...notif, timestamp: new Date() }, ...prev].slice(0, 5));
    };

    const handleCtaClick = (source) => {
        trackEvent('cta_click', { source });
        setLeadData({ nama: '', wa: '', email: '', tujuan: 'Servis Motor Saya', setuju: false, source });
        setLeadStep(1);
        setLeadModalOpen(true);
    };

    const submitLead = () => {
        const currentLeads = JSON.parse(localStorage.getItem('bengkelgofix-leads') || '[]');
        const newLead = { ...leadData, id: Date.now(), timestamp: new Date().toISOString() };
        localStorage.setItem('bengkelgofix-leads', JSON.stringify([newLead, ...currentLeads]));
        toast.success("Data berhasil tersimpan! Mengalihkan...", { style: { background: '#10b981', color: 'white', border: 'none' } });
        setTimeout(() => {
            setLeadModalOpen(false);
            navigate(leadData.source === 'cta-mitra' ? "/register" : "/login");
        }, 2000);
    };

    const exportCsv = () => {
        const leads = JSON.parse(localStorage.getItem('bengkelgofix-leads') || '[]');
        const csvRows = ["ID,Nama,WhatsApp,Email,Tujuan,Source,Timestamp"];
        leads.forEach(l => csvRows.push(`${l.id},"${l.nama}","${l.wa}","${l.email}","${l.tujuan}","${l.source}","${l.timestamp}"`));
        const blob = new Blob([csvRows.join("\\n")], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bengkelgofix-leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const vouchers = [
        { id: "FIXNEW20", title: "Diskon Member Baru", desc: "Potongan Rp 20.000 untuk servis pertama + Gratis Cuci Motor", value: "20K", icon: <FaGift /> },
        { id: "OLIMAX", title: "Bundling Ganti Oli", desc: "Diskon 10% + Gratis Cek Kelistrikan + Filter Udara", value: "10%", icon: <FaRocket /> },
        { id: "DEAL24H", title: "Layanan Darurat 24 Jam", desc: "Potongan biaya panggil mekanik khusus malam + Prioritas", value: "50K", icon: <FaShieldAlt /> },
    ];

    const popularProducts = [
        { id: 101, name: "Oli Mesin Shell Advance AX7 10W-40", price: "Rp 65.000", originalPrice: "Rp 78.000", rating: 4.9, sales: "1.2k+", discount: 17, img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop" },
        { id: 102, name: "Kampas Rem Depan High Performance", price: "Rp 45.000", originalPrice: "Rp 55.000", rating: 4.8, sales: "850+", discount: 18, img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop" },
        { id: 103, name: "Aki Kering GS Astra MF GTZ-5S", price: "Rp 210.000", originalPrice: "Rp 250.000", rating: 5.0, sales: "500+", discount: 16, img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop" },
    ];

    const testimonials = [
        { name: "Budi Santoso", location: "Rumbai", rating: 5, text: "Servis cepat dan harga transparan! Motor saya langsung beres dalam 30 menit. Sangat recommended!", avatar: "https://i.pravatar.cc/150?img=1", vehicle: "Honda Vario 150" },
        { name: "Siti Rahayu", location: "Panam", rating: 5, text: "Mekaniknya ramah dan profesional. Voucher diskonnya beneran berlaku! Pasti balik lagi.", avatar: "https://i.pravatar.cc/150?img=5", vehicle: "Yamaha NMAX" },
        { name: "Andi Wijaya", location: "Diponegoro", rating: 4, text: "Aplikasi mudah digunakan, spare part ori semua. Booking servis jadi lebih praktis.", avatar: "https://i.pravatar.cc/150?img=3", vehicle: "Suzuki Satria F150" },
    ];

    const stats = [
        { icon: <FaUsers />, value: animatedStats.mitra, suffix: "+", label: "Mitra Bengkel" },
        { icon: <FaWrench />, value: animatedStats.mekanik, suffix: "+", label: "Mekanik Ahli" },
        { icon: <FaClock />, value: animatedStats.waktu, suffix: " Min", label: "Response Time" },
    ];

    // Observers & Effects
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisibleSections(prev => new Set(prev).add(entry.target.id));
                    trackEvent('section_view', { sectionId: entry.target.id, action: 'enter' });
                }
            });
        }, { threshold: 0.1 });

        [vouchersRef, productsRef, testimonialsRef, ctaRef].forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset > 50);
            
            // Scroll Depth Tracking
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            [25, 50, 75, 100].forEach(depth => {
                if (scrollPercent >= depth && !window[`tracked_depth_${depth}`]) {
                    window[`tracked_depth_${depth}`] = true;
                    trackEvent('scroll_depth', { depth });
                }
            });
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        localStorage.setItem('bengkelgofix-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        // Banner & Dashboard
        if (!localStorage.getItem('bengkelgofix-banner-dismissed')) setShowBanner(true);
        
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                setLeadsList(JSON.parse(localStorage.getItem('bengkelgofix-leads') || '[]'));
                setDashboardOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        // Auto Toasts
        const t1 = setTimeout(() => {
            if (!claimedVouchers.includes("FIXNEW20") && !window.t1Fired) {
                window.t1Fired = true;
                toast("🎁 Voucher FIXNEW20 hampir habis! Klaim sekarang.", { style: { background: '#f97316', color: 'white', border: 'none' } });
                addNotification({ type: 'promo', message: "Voucher FIXNEW20 hampir habis!" });
            }
        }, 3000);

        const t2 = setTimeout(() => {
            if (!window.t2Fired) {
                window.t2Fired = true;
                toast("⚡ Response time rata-rata hari ini: 28 menit", { style: { background: '#3b82f6', color: 'white', border: 'none' } });
                addNotification({ type: 'info', message: "Response time rata-rata hari ini: 28 menit" });
            }
        }, 6000);

        let count = 0;
        let viewersInterval;
        const triggerViewers = () => {
            if (count >= 3) return;
            const delay = Math.floor(Math.random() * 30000) + 30000;
            viewersInterval = setTimeout(() => {
                const num = Math.floor(Math.random() * 20) + 5;
                toast(`🔥 ${num} orang sedang melihat produk ini sekarang`, { style: { background: '#f59e0b', color: 'white', border: 'none' } });
                addNotification({ type: 'warning', message: `${num} orang sedang melihat produk` });
                count++;
                triggerViewers();
            }, delay);
        };
        triggerViewers();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(viewersInterval);
        };
    }, [claimedVouchers]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const duration = 2000, steps = 60;
                let step = 0;
                const timer = setInterval(() => {
                    step++;
                    const p = step / steps;
                    setAnimatedStats({ mitra: Math.floor(142 * p), mekanik: Math.floor(384 * p), waktu: Math.floor(45 * p) });
                    if (step >= steps) clearInterval(timer);
                }, duration / steps);
                observer.disconnect();
            }
        });
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!visibleSections.has('testimonials')) return;
        const interval = setInterval(() => setActiveTestimonial(prev => (prev + 1) % testimonials.length), 5000);
        return () => clearInterval(interval);
    }, [visibleSections, testimonials.length]);

    const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });
    
    const handleClaim = (code) => {
        if (!claimedVouchers.includes(code)) {
            setClaimedVouchers([...claimedVouchers, code]);
            trackEvent('voucher_interaction', { voucherId: code, action: 'claim' });
        }
    };

    return (
        <div className={`min-h-screen font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-gray-300' : 'bg-gray-50 text-gray-800'}`}>
            <style>{`
                .glass { background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)'}; backdrop-filter: blur(20px); border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; }
                .glass-light { background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.5); }
                .glass-card { background: ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,1)'}; backdrop-filter: blur(12px); border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}; box-shadow: ${isDarkMode ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}; }
                
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes marquee { 0% { transform: translateX(100vw); } 100% { transform: translateX(-100%); } }
                
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
                .animate-marquee { animation: marquee 25s linear infinite; display: flex; width: max-content; }
                .animate-marquee:hover { animation-play-state: paused; }
                
                .glow-orange { box-shadow: 0 0 30px rgba(249, 115, 22, 0.3); }
                .glow-text { text-shadow: 0 0 40px rgba(249, 115, 22, 0.5); }
            `}</style>

            {showBanner && (
                <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-r from-orange-600 to-orange-500 text-white flex items-center justify-center text-sm z-[60] px-4 font-medium shadow-md">
                    <span>🎉 Promo Spesial Weekend: Diskon 25% untuk semua servis! Berlaku hingga Minggu malam.</span>
                    <button onClick={() => { setShowBanner(false); localStorage.setItem('bengkelgofix-banner-dismissed', '1'); }} className="absolute right-4 font-bold hover:text-orange-200 transition-colors">
                        <FaTimes />
                    </button>
                </div>
            )}
            {/* NAVBAR */}
            <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'} ${showBanner ? 'top-10' : 'top-0'}`}>
                <div className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${isScrolled ? 'glass-light rounded-full mx-4 md:mx-auto shadow-xl' : ''}`}>
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollTo(heroRef)}>
                            <div className="bg-orange-500 p-2 rounded-xl transition-transform group-hover:scale-110 shadow-lg shadow-orange-500/30">
                                <FaWrench className="text-white" />
                            </div>
                            <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                                BengkelGo<span className="text-orange-500">Fix</span>
                            </span>
                        </div>

                        <div className="hidden md:flex items-center gap-1">
                            {[{ label: "Beranda", icon: <FaHome />, ref: heroRef }, { label: "Promo", icon: <FaTags />, ref: vouchersRef }, { label: "Produk", icon: <FaBox />, ref: productsRef }].map((item, idx) => (
                                <button key={idx} onClick={() => scrollTo(item.ref)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isScrolled ? 'text-gray-600 hover:text-orange-500 hover:bg-orange-50' : (isDarkMode ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-800 hover:text-orange-500 hover:bg-white/50')}`}>
                                    {item.icon} {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-orange-500">
                                        <FaBell />
                                        {notifications.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>}
                                        {notifications.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className={`w-64 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-900'}`} align="end">
                                    <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
                                    <DropdownMenuSeparator className={isDarkMode ? "bg-slate-800" : ""} />
                                    {notifications.length > 0 ? notifications.map((n, i) => (
                                        <DropdownMenuItem key={i} className="flex flex-col items-start gap-1 p-3 cursor-default">
                                            <span className="text-sm">{n.message}</span>
                                            <span className="text-[10px] text-gray-500">{n.timestamp.toLocaleTimeString()}</span>
                                        </DropdownMenuItem>
                                    )) : (
                                        <DropdownMenuItem className="p-3 text-gray-500 cursor-default">Belum ada notifikasi</DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="flex items-center gap-2">
                                <FaSun className={isDarkMode ? "text-gray-500" : "text-orange-500"} />
                                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                                <FaMoon className={isDarkMode ? "text-orange-400" : "text-gray-400"} />
                            </div>
                            <button onClick={() => handleCtaClick("navbar-login")} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-500/30">
                                Masuk / Daftar
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section ref={heroRef} className="relative min-h-screen flex items-center">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1920&q=80" alt="Workshop" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full grid md:grid-cols-2 gap-16 items-center">
                    <div className="text-white animate-fade-up">
                        <div className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full text-orange-300 text-sm mb-8">
                            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" /> Platform Bengkel #1 Indonesia
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
                            Solusi Servis <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 glow-text">Modern & Cepat</span>
                        </h1>
                        
                        <p className="text-gray-400 text-lg mb-10 max-w-lg">
                            Booking servis online, harga transparan, dan mekanik profesional. Didukung teknologi AI untuk pengalaman servis tanpa ribet.
                        </p>

                        <div className="flex items-center glass rounded-2xl p-2 max-w-md mb-6 glow-orange">
                            <FaSearch className="text-gray-400 ml-4" />
                            <input type="text" placeholder="Cari bengkel atau spare part..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-sm px-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all">Cari</button>
                        </div>

                        <div className="w-full max-w-md mb-10 overflow-hidden glass rounded-full py-2 relative">
                            <div className={`absolute left-0 top-0 bottom-0 w-8 z-10 ${isDarkMode ? 'bg-gradient-to-r from-[rgba(0,0,0,0.5)] to-transparent' : 'bg-gradient-to-r from-[rgba(255,255,255,0.8)] to-transparent'}`}></div>
                            <div className={`absolute right-0 top-0 bottom-0 w-8 z-10 ${isDarkMode ? 'bg-gradient-to-l from-[rgba(0,0,0,0.5)] to-transparent' : 'bg-gradient-to-l from-[rgba(255,255,255,0.8)] to-transparent'}`}></div>
                            <div className="animate-marquee gap-8 px-4 cursor-default">
                                {liveActivities.map((activity) => (
                                    <div key={activity.id} className={`flex items-center gap-2 whitespace-nowrap text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-800 font-medium'}`}>
                                        <FaCircle className="text-emerald-500 text-[8px] animate-pulse" />
                                        {activity.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6">
                            {[{ icon: <FaShieldAlt />, text: "Garansi 30 Hari" }, { icon: <FaUserCheck />, text: "Mekanik Sertifikat" }, { icon: <FaWallet />, text: "Harga Transparan" }].map((b, i) => (
                                <div key={i} className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-800 font-medium'}`}><span className="text-orange-400">{b.icon}</span> {b.text}</div>
                            ))}
                        </div>
                    </div>

                    <div ref={statsRef} className="hidden md:block animate-fade-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass rounded-3xl p-8 animate-float hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                                <div className="bg-orange-500 p-3 rounded-xl shadow-lg shadow-orange-500/30"><FaUsers className="text-white text-xl" /></div>
                                <div><h3 className="text-white font-bold">Statistik Platform</h3><p className="text-gray-500 text-xs">Real-time Update</p></div>
                            </div>
                            <div className="space-y-6">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3"><span className="text-orange-400 text-xl group-hover:scale-125 transition-transform">{stat.icon}</span><span className="text-gray-400">{stat.label}</span></div>
                                        <span className="text-white font-bold text-2xl bg-white/5 px-4 py-1 rounded-xl group-hover:bg-orange-500/20 transition-all">{stat.value}{stat.suffix}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/30">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </div>
            </section>

            {/* VOUCHERS */}
            <section id="vouchers" ref={vouchersRef} className={`py-24 px-6 relative ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
                <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className={`text-center mb-16 ${visibleSections.has('vouchers') ? 'animate-fade-up' : 'opacity-0'}`}>
                        <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Promo Spesial</span>
                        <h2 className={`text-4xl md:text-5xl font-extrabold mt-3 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Klaim Voucher Diskon</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">Nikmati berbagai promo menarik untuk pengalaman servis terbaik dan lebih hemat</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {vouchers.map((v, idx) => {
                            const isClaimed = claimedVouchers.includes(v.id);
                            return (
                                <div key={v.id} className={`glass-card rounded-3xl p-8 hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 group ${visibleSections.has('vouchers') ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${idx * 0.15}s` }}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-orange-500/10 p-4 rounded-2xl text-orange-400 text-2xl group-hover:bg-orange-500 group-hover:text-white transition-all">{v.icon}</div>
                                        <span className="glass text-orange-300 text-xs font-bold px-3 py-1 rounded-full">VOUCHER</span>
                                    </div>
                                    <span className={`text-4xl font-extrabold block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Rp {v.value}</span>
                                    <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{v.title}</h3>
                                    <p className="text-gray-500 text-sm mb-8">{v.desc}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <code className="text-xs text-gray-600 bg-white/5 px-3 py-1.5 rounded-lg font-mono">{v.id}</code>
                                        <button onClick={() => handleClaim(v.id)} disabled={isClaimed} className={`text-sm font-bold px-5 py-2.5 rounded-xl transition-all ${isClaimed ? "bg-green-500/20 text-green-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"}`}>
                                            {isClaimed ? <span className="flex items-center gap-1"><FaCheckCircle /> Diklaim</span> : "Klaim"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CALCULATOR */}
            <section id="kalkulator" className={`py-24 px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-100'}`}>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Kalkulator Servis</span>
                        <h2 className={`text-4xl md:text-5xl font-extrabold mt-3 mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Estimasi Biaya Transparan</h2>
                        <p className={`mb-10 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Dapatkan perkiraan biaya sebelum Anda datang ke bengkel. Tidak ada biaya tersembunyi.</p>
                        
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                                    <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Pilih Jenis Motor</h3>
                                </div>
                                <Select onValueChange={setSelectedMotor} value={selectedMotor}>
                                    <SelectTrigger className={`w-full ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                        <SelectValue placeholder="Pilih tipe motor Anda" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Matic">Matic</SelectItem>
                                        <SelectItem value="Sport">Sport</SelectItem>
                                        <SelectItem value="Cub/Bebek">Cub / Bebek</SelectItem>
                                        <SelectItem value="Trail">Trail</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                                    <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Pilih Layanan</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.keys(servicePrices).map(service => (
                                        <button 
                                            key={service} 
                                            onClick={() => setSelectedService(service)}
                                            className={`p-4 rounded-xl border text-left transition-all ${selectedService === service ? 'border-orange-500 bg-orange-500/10' : (isDarkMode ? 'border-slate-700 bg-slate-800 text-gray-300 hover:border-slate-500' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300')}`}
                                        >
                                            <div className="font-semibold">{service}</div>
                                            <div className="text-orange-500 text-sm mt-1">Mulai Rp {servicePrices[service].toLocaleString('id-ID')}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                                    <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Tambah Spare Part (Opsional)</h3>
                                </div>
                                <div className="space-y-3">
                                    {Object.keys(partPrices).map(part => (
                                        <div key={part} className="flex items-center space-x-3">
                                            <Checkbox 
                                                id={`part-${part}`} 
                                                checked={selectedParts.includes(part)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) setSelectedParts([...selectedParts, part]);
                                                    else setSelectedParts(selectedParts.filter(p => p !== part));
                                                }}
                                            />
                                            <Label htmlFor={`part-${part}`} className={`text-sm cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {part} <span className="text-orange-500">(+Rp {partPrices[part].toLocaleString('id-ID')})</span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-full flex items-center">
                        <div className={`glass-card rounded-[2rem] p-8 w-full border-l-4 border-l-orange-500 relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
                            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Estimasi Biaya</h3>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tipe Motor</span>
                                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMotor || "-"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Layanan Utama</span>
                                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedService || "-"}</span>
                                </div>
                                {selectedParts.length > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tambahan Part</span>
                                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} text-right`}>{selectedParts.join(", ")}</span>
                                    </div>
                                )}
                                <div className="pt-4 border-t border-gray-500/20 flex justify-between items-center">
                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Total Estimasi</span>
                                    <span className="text-3xl font-extrabold text-orange-500">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                            
                            <div className={`flex items-center gap-2 text-xs mb-8 p-3 rounded-xl ${isDarkMode ? 'bg-orange-500/10 text-orange-200' : 'bg-orange-50 text-orange-800'}`}>
                                <FaClock className="text-orange-500" /> Estimasi Waktu: <span className="font-bold">{estimatedTime}</span>
                            </div>

                            <button onClick={() => { trackEvent('calculator_use', { service: selectedService, total: calculateTotal() }); handleCtaClick('calculator-booking'); }} disabled={!selectedService} className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${selectedService ? 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105' : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'}`}>
                                Booking Sekarang
                            </button>
                            <p className="text-center text-xs mt-4 text-gray-500">Harga final akan disesuaikan setelah inspeksi mekanik di bengkel.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRODUCTS */}
            <section id="products" ref={productsRef} className={`py-24 px-6 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4 ${visibleSections.has('products') ? 'animate-fade-up' : 'opacity-0'}`}>
                        <div>
                            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Marketplace</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-gray-900">Spare Part Terlaris</h2>
                        </div>
                        <button onClick={() => handleCtaClick('marketplace-seeall')} className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2 group">
                            Lihat Semua <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {popularProducts.map((p, idx) => (
                            <Sheet key={p.id} open={openSheetId === p.id} onOpenChange={(isOpen) => {
                                setOpenSheetId(isOpen ? p.id : null);
                                if (isOpen) trackEvent('product_view', { productId: p.id, productName: p.name });
                            }}>
                                <div className={`bg-gray-50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group ${visibleSections.has('products') ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${idx * 0.15}s` }}>
                                    <div className="relative h-56 overflow-hidden bg-gray-100">
                                        <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">-{p.discount}%</span>
                                        <SheetTrigger asChild>
                                            <button className="absolute top-4 left-4 bg-white/80 hover:bg-white text-slate-900 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                <FaEye />
                                            </button>
                                        </SheetTrigger>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 h-12">{p.name}</h3>
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => <FaStar key={i} className={`text-sm ${i < Math.floor(p.rating) ? "text-amber-400" : "text-gray-200"}`} />)}
                                            <span className="text-xs text-gray-400 ml-1">({p.rating})</span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-extrabold text-orange-500">{p.price}</span>
                                            <span className="text-sm text-gray-400 line-through">{p.originalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                                <SheetContent className="bg-slate-950 text-white border-l border-white/10 overflow-y-auto w-full sm:max-w-md">
                                    <SheetHeader className="text-left mb-6">
                                        <SheetTitle className="text-white text-2xl font-bold">{p.name}</SheetTitle>
                                        <SheetDescription className="text-gray-400">Quick View Produk</SheetDescription>
                                    </SheetHeader>
                                    <div className="mb-6 rounded-2xl overflow-hidden relative">
                                        <img src={p.img} alt={p.name} className="w-full h-64 object-cover" />
                                        <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">Stok Tersedia</span>
                                    </div>
                                    <div className="flex items-baseline gap-3 mb-4">
                                        <span className="text-3xl font-extrabold text-orange-500">{p.price}</span>
                                        <span className="text-lg text-gray-500 line-through">{p.originalPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
                                        <div className="flex items-center gap-1 text-amber-400">
                                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                        </div>
                                        <span>{p.rating} / 5</span>
                                        <span>•</span>
                                        <span>Terjual {p.sales}</span>
                                    </div>
                                    <div className="space-y-4 text-gray-300 text-sm leading-relaxed mb-8">
                                        <p>Produk ini merupakan salah satu dari spare part premium terbaik yang kami tawarkan. Dirancang dengan teknologi mutakhir untuk memastikan performa kendaraan Anda tetap optimal di berbagai kondisi jalan.</p>
                                        <p>Kami menjamin keaslian 100% dan memberikan masa garansi yang jelas untuk setiap pembelian. Anda tidak perlu ragu karena kualitasnya telah teruji dan banyak dipercaya oleh para profesional.</p>
                                        <p>Pesan sekarang dan nikmati layanan pengiriman super cepat, atau booking langsung pemasangan di bengkel mitra terdekat kami melalui aplikasi BengkelGoFix.</p>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setOpenSheetId(null);
                                            toast.success("Produk berhasil ditambahkan ke keranjang!", { style: { background: '#10b981', color: 'white', border: 'none' } });
                                            setTimeout(() => handleCtaClick('quickview-addtocart'), 1500);
                                        }}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95"
                                    >
                                        Tambah ke Keranjang
                                    </button>
                                </SheetContent>
                            </Sheet>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials" ref={testimonialsRef} className={`py-24 px-6 relative overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className={`mb-16 ${visibleSections.has('testimonials') ? 'animate-fade-up' : 'opacity-0'}`}>
                        <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Testimonial</span>
                        <h2 className={`text-4xl md:text-5xl font-extrabold mt-3 mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Apa Kata Pelanggan?</h2>
                    </div>
                    
                    <div className={`glass rounded-3xl p-10 md:p-14 relative ${visibleSections.has('testimonials') ? 'animate-fade-up' : 'opacity-0'}`}>
                        <FaQuoteLeft className="absolute top-8 left-8 text-5xl text-orange-500/10" />
                        
                        <div className="flex flex-col items-center mb-8 relative z-10">
                            <div className="relative mb-6">
                                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full blur-md opacity-30 animate-pulse" />
                                <img src={testimonials[activeTestimonial].avatar} alt="" className="w-24 h-24 rounded-full border-4 border-white/10 shadow-2xl relative z-10 object-cover" />
                                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 rounded-full border-4 border-slate-900 flex items-center justify-center"><FaCheckCircle className="text-white text-xs" /></div>
                            </div>
                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => <FaStar key={i} className={`text-xl ${i < testimonials[activeTestimonial].rating ? "text-amber-400" : "text-gray-700"}`} />)}
                            </div>
                        </div>
                        
                        <p className={`text-xl leading-relaxed italic max-w-2xl mx-auto mb-8 relative z-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            "{testimonials[activeTestimonial].text}"
                        </p>
                        
                        <h4 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonials[activeTestimonial].name}</h4>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                            <FaMapMarkerAlt className="text-orange-400" /> {testimonials[activeTestimonial].location}
                            <span className="text-gray-700">•</span> 🏍️ {testimonials[activeTestimonial].vehicle}
                        </div>
                        
                        <Collapsible 
                            open={openCollapsibleId === activeTestimonial} 
                            onOpenChange={(isOpen) => setOpenCollapsibleId(isOpen ? activeTestimonial : null)}
                            className="w-full relative z-10"
                        >
                            <CollapsibleTrigger asChild>
                                <button className="text-sm font-medium text-orange-400 hover:text-orange-300 flex items-center justify-center gap-2 mx-auto transition-colors">
                                    Lihat Pengalaman Lengkap {openCollapsibleId === activeTestimonial ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-4 text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down transition-all">
                                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-left space-y-3 shadow-inner">
                                    <p>Saya awalnya ragu untuk mencoba servis online, tapi setelah melihat review positif, saya memutuskan booking servis di BengkelGoFix. Prosesnya sangat mudah, saya hanya perlu memasukkan kendala motor saya dan aplikasi langsung mencarikan bengkel mitra terdekat.</p>
                                    <p>Mekanik yang menangani motor saya, Mas Joko, sangat profesional dan ramah. Beliau menjelaskan dengan detail apa saja yang perlu diganti dan mengapa. Tidak ada biaya tersembunyi, semua transparan sesuai yang tertera di aplikasi.</p>
                                    <p>Pengerjaannya cepat dan rapi. Motor saya sekarang terasa seperti baru kembali. Sangat direkomendasikan untuk siapa saja yang butuh layanan servis motor yang jujur, cepat, dan berkualitas. Pasti akan menggunakan BengkelGoFix lagi untuk servis rutin berikutnya!</p>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>

                    <div className="flex justify-center gap-4 mt-10">
                        {testimonials.map((t, idx) => (
                            <button key={idx} onClick={() => setActiveTestimonial(idx)} className={`transition-all duration-300 ${activeTestimonial === idx ? "scale-110 opacity-100" : "opacity-30 hover:opacity-60"}`}>
                                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 object-cover border-orange-500/50" />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="cta" ref={ctaRef} className={`py-24 px-6 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
                <div className={`max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-gray-900 rounded-[2.5rem] p-14 md:p-20 text-center text-white relative overflow-hidden ${visibleSections.has('cta') ? 'animate-fade-up' : 'opacity-0'}`}>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10">
                        <FaRocket className="text-5xl text-orange-400 mx-auto mb-8" />
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Siap Bergabung dengan Kami?</h2>
                        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">Tingkatkan omzet bengkel Anda hingga 3x lipat dengan platform terintegrasi kami.</p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <button onClick={() => { trackEvent('cta_click', { button: 'mitra' }); handleCtaClick('cta-mitra'); }} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 text-lg">
                                Gabung Mitra Sekarang
                            </button>
                            <button onClick={() => { trackEvent('cta_click', { button: 'consultation' }); handleCtaClick('cta-consultation'); }} className="glass hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 text-lg">
                                Konsultasi Gratis
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className={`pt-20 pb-10 px-6 border-t ${isDarkMode ? 'bg-slate-950 text-white border-white/5' : 'bg-white text-gray-900 border-gray-200'}`}>
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/30"><FaWrench className="text-white" /></div>
                            <span className="font-extrabold text-xl">BengkelGo<span className="text-orange-500">Fix</span></span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">Platform servis kendaraan modern dengan teknologi terintegrasi.</p>
                    </div>
                    
                    {[
                        { title: "Layanan", items: ["Servis Rutin", "Perbaikan Mesin", "Spare Part", "Emergency 24/7"] },
                        { title: "Perusahaan", items: ["Tentang Kami", "Karir", "Kebijakan Privasi", "Syarat & Ketentuan"] },
                        { title: "Kontak", items: ["📞 (021) 1234-5678", "✉️ info@bengkelgofix.com", "📍 Pekanbaru, Indonesia"] }
                    ].map((col, idx) => (
                        <div key={idx}>
                            <h4 className="font-bold mb-6 text-lg">{col.title}</h4>
                            <ul className="space-y-3 text-sm text-gray-500">
                                {col.items.map((item, i) => <li key={i} className="hover:text-orange-400 cursor-pointer transition-colors">{item}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-600">
                    © 2024 BengkelGoFix. All rights reserved.
                </div>
            </footer>

            <FloatingChat />

            {/* FAB */}
            <div 
                className={`fixed bottom-24 right-6 z-[60] flex flex-col items-center gap-3 transition-all duration-500 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                onMouseEnter={() => setIsFabHovered(true)}
                onMouseLeave={() => setIsFabHovered(false)}
            >
                <div className={`flex flex-col gap-3 transition-all duration-300 ${isFabHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                    <button onClick={() => scrollTo(vouchersRef)} className="w-10 h-10 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all shadow-lg hover:scale-110" title="Promo">
                        <FaTags className="text-sm" />
                    </button>
                    <button onClick={() => scrollTo(productsRef)} className="w-10 h-10 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all shadow-lg hover:scale-110" title="Produk">
                        <FaBox className="text-sm" />
                    </button>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:text-white transition-all shadow-lg hover:scale-110" title="Hubungi Kami">
                        <FaPhoneAlt className="text-sm" />
                    </a>
                </div>
                <button onClick={() => scrollTo(heroRef)} className="w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-orange-500/30 hover:scale-110 active:scale-95 transition-all">
                    <FaArrowUp className="text-xl" />
                </button>
            </div>

            <Toaster position="top-center" richColors theme={isDarkMode ? "dark" : "light"} />

            {/* LEAD CAPTURE MODAL */}
            <AlertDialog open={leadModalOpen} onOpenChange={setLeadModalOpen}>
                <AlertDialogContent className={`sm:max-w-md ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-gray-900'}`}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hampir Selesai! Lengkapi Data Anda</AlertDialogTitle>
                        <AlertDialogDescription className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                            Langkah {leadStep} dari 3
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    
                    <div className="flex gap-2 justify-center mb-6">
                        {[1, 2, 3].map(step => (
                            <div key={step} className={`h-2 flex-1 rounded-full ${leadStep === step ? 'bg-orange-500' : (leadStep > step ? 'bg-emerald-500' : (isDarkMode ? 'bg-slate-800' : 'bg-gray-200'))}`} />
                        ))}
                    </div>

                    <div className="py-4">
                        {leadStep === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Nama Lengkap *</Label>
                                    <input type="text" value={leadData.nama} onChange={e => setLeadData({...leadData, nama: e.target.value})} className={`w-full p-2 mt-1 border rounded-lg outline-none focus:border-orange-500 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-300'}`} placeholder="Budi Santoso" />
                                </div>
                                <div>
                                    <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>WhatsApp *</Label>
                                    <input type="tel" value={leadData.wa} onChange={e => setLeadData({...leadData, wa: e.target.value})} className={`w-full p-2 mt-1 border rounded-lg outline-none focus:border-orange-500 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-300'}`} placeholder="081234567890" />
                                </div>
                                <div>
                                    <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Email (Opsional)</Label>
                                    <input type="email" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} className={`w-full p-2 mt-1 border rounded-lg outline-none focus:border-orange-500 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-300'}`} placeholder="budi@example.com" />
                                </div>
                            </div>
                        )}
                        {leadStep === 2 && (
                            <div className="space-y-3">
                                <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Apa keperluan Anda?</Label>
                                {["Servis Motor Saya", "Buka Bengkel Mitra", "Beli Spare Part", "Lainnya"].map(t => (
                                    <div key={t} onClick={() => setLeadData({...leadData, tujuan: t})} className={`p-4 border rounded-xl cursor-pointer transition-colors ${leadData.tujuan === t ? 'border-orange-500 bg-orange-500/10' : (isDarkMode ? 'border-slate-700 hover:border-slate-500' : 'border-gray-200 hover:border-gray-300')}`}>
                                        <div className="font-medium">{t}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {leadStep === 3 && (
                            <div className="space-y-4">
                                <div className={`p-4 rounded-xl text-sm ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                                    <p><strong>Nama:</strong> {leadData.nama}</p>
                                    <p><strong>WA:</strong> {leadData.wa}</p>
                                    <p><strong>Keperluan:</strong> {leadData.tujuan}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Checkbox id="setuju" checked={leadData.setuju} onCheckedChange={c => setLeadData({...leadData, setuju: c})} />
                                    <Label htmlFor="setuju" className="text-sm leading-tight cursor-pointer">Saya setuju untuk dihubungi via WhatsApp terkait keperluan ini.</Label>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <AlertDialogFooter className="sm:justify-between flex-row items-center gap-2">
                        <button onClick={() => { if (leadStep > 1) setLeadStep(s => s - 1); else setLeadModalOpen(false); }} className={`px-4 py-2 text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                            {leadStep > 1 ? 'Kembali' : 'Batal'}
                        </button>
                        <button 
                            onClick={() => {
                                if (leadStep === 1) {
                                    if (!leadData.nama || !/^(08|\+62)\d{8,13}$/.test(leadData.wa)) {
                                        toast.error("Nama dan WA valid (08/ +62) wajib diisi!");
                                        return;
                                    }
                                    setLeadStep(2);
                                } else if (leadStep === 2) {
                                    setLeadStep(3);
                                } else {
                                    if (!leadData.setuju) return toast.error("Anda harus menyetujui syarat & ketentuan.");
                                    submitLead();
                                }
                            }} 
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg transition-all active:scale-95"
                        >
                            {leadStep === 3 ? 'Kirim & Lanjutkan' : 'Lanjut'}
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* CRM ADMIN DASHBOARD */}
            <Sheet open={dashboardOpen} onOpenChange={setDashboardOpen}>
                <SheetContent side="left" className={`w-[400px] sm:w-[540px] border-r-orange-500/30 p-0 flex flex-col ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`}>
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950 text-white">
                        <h2 className="text-xl font-bold">CRM Analytics Preview</h2>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass-card p-4 rounded-xl bg-slate-800 text-white">
                                <div className="text-sm text-gray-400">Total Leads</div>
                                <div className="text-3xl font-bold text-orange-500">{leadsList.length}</div>
                            </div>
                            <div className="glass-card p-4 rounded-xl bg-slate-800 text-white">
                                <div className="text-sm text-gray-400">Vouchers Claimed</div>
                                <div className="text-3xl font-bold text-emerald-500">{JSON.parse(localStorage.getItem('bengkelgofix-analytics') || '[]').filter(e => e.eventType === 'voucher_interaction').length}</div>
                            </div>
                            <div className="glass-card p-4 rounded-xl bg-slate-800 text-white">
                                <div className="text-sm text-gray-400">Product Views</div>
                                <div className="text-3xl font-bold text-blue-500">{JSON.parse(localStorage.getItem('bengkelgofix-analytics') || '[]').filter(e => e.eventType === 'product_view').length}</div>
                            </div>
                            <div className="glass-card p-4 rounded-xl bg-slate-800 text-white">
                                <div className="text-sm text-gray-400">Calculator Uses</div>
                                <div className="text-3xl font-bold text-amber-500">{JSON.parse(localStorage.getItem('bengkelgofix-analytics') || '[]').filter(e => e.eventType === 'calculator_use').length}</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-3">10 Leads Terbaru</h3>
                            <div className="rounded-xl border border-white/10 overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-slate-800">
                                        <TableRow className="hover:bg-slate-800 border-white/10">
                                            <TableHead className="text-white">Nama</TableHead>
                                            <TableHead className="text-white">WA</TableHead>
                                            <TableHead className="text-white">Tujuan</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {leadsList.slice(0,10).map((l, i) => (
                                            <TableRow key={i} className="hover:bg-slate-800/50 border-white/10">
                                                <TableCell className="font-medium text-slate-300">{l.nama}</TableCell>
                                                <TableCell className="text-slate-400">{l.wa}</TableCell>
                                                <TableCell className="text-slate-400">{l.tujuan}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-white/10 bg-slate-950 flex gap-3">
                        <button onClick={exportCsv} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition-colors">Export CSV</button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors">Reset Data</button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Hapus semua data CRM?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-gray-400">Tindakan ini tidak dapat dibatalkan. Semua leads dan analytics akan dihapus dari localStorage.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Batal</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => { localStorage.removeItem('bengkelgofix-leads'); localStorage.removeItem('bengkelgofix-analytics'); setLeadsList([]); toast.success('Data di-reset'); }} className="bg-red-600 hover:bg-red-700 text-white border-red-600">Ya, Hapus</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}