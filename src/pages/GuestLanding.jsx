import FloatingChat from ".././components/FloatingChat";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FaWrench, FaSearch, FaStar, FaArrowRight, 
    FaCheckCircle, FaMapMarkerAlt, FaGift, FaRocket, 
    FaShieldAlt, FaUsers, FaClock, FaTags, FaBox, 
    FaPhoneAlt, FaHome, FaUserCheck, FaWallet, FaQuoteLeft,
    FaEye, FaArrowUp, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../components/ui/sheet";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../components/ui/collapsible";
import { Toaster, toast } from "sonner";

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

    const heroRef = useRef(null);
    const vouchersRef = useRef(null);
    const productsRef = useRef(null);
    const statsRef = useRef(null);
    const ctaRef = useRef(null);
    const testimonialsRef = useRef(null);

    // Data Arrays
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
                if (entry.isIntersecting) setVisibleSections(prev => new Set(prev).add(entry.target.id));
            });
        }, { threshold: 0.1 });

        [vouchersRef, productsRef, testimonialsRef, ctaRef].forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.pageYOffset > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        if (!claimedVouchers.includes(code)) setClaimedVouchers([...claimedVouchers, code]);
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-gray-800 overflow-hidden">
            <style>{`
                .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); }
                .glass-light { background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.5); }
                .glass-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
                
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
                
                .glow-orange { box-shadow: 0 0 30px rgba(249, 115, 22, 0.3); }
                .glow-text { text-shadow: 0 0 40px rgba(249, 115, 22, 0.5); }
            `}</style>

            {/* NAVBAR */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
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
                                <button key={idx} onClick={() => scrollTo(item.ref)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isScrolled ? 'text-gray-600 hover:text-orange-500 hover:bg-orange-50' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                                    {item.icon} {item.label}
                                </button>
                            ))}
                        </div>

                        <button onClick={() => navigate("/login")} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-500/30">
                            Masuk / Daftar
                        </button>
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

                        <div className="flex items-center glass rounded-2xl p-2 max-w-md mb-10 glow-orange">
                            <FaSearch className="text-gray-400 ml-4" />
                            <input type="text" placeholder="Cari bengkel atau spare part..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm px-3" />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all">Cari</button>
                        </div>

                        <div className="flex flex-wrap gap-6">
                            {[{ icon: <FaShieldAlt />, text: "Garansi 30 Hari" }, { icon: <FaUserCheck />, text: "Mekanik Sertifikat" }, { icon: <FaWallet />, text: "Harga Transparan" }].map((b, i) => (
                                <div key={i} className="flex items-center gap-2 text-white/70 text-sm"><span className="text-orange-400">{b.icon}</span> {b.text}</div>
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
            <section id="vouchers" ref={vouchersRef} className="py-24 px-6 bg-slate-950 relative">
                <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className={`text-center mb-16 ${visibleSections.has('vouchers') ? 'animate-fade-up' : 'opacity-0'}`}>
                        <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Promo Spesial</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4 text-white">Klaim Voucher Diskon</h2>
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
                                    <span className="text-4xl font-extrabold text-white block mb-2">Rp {v.value}</span>
                                    <h3 className="font-bold text-white mb-2">{v.title}</h3>
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

            {/* PRODUCTS */}
            <section id="products" ref={productsRef} className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4 ${visibleSections.has('products') ? 'animate-fade-up' : 'opacity-0'}`}>
                        <div>
                            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Marketplace</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 text-gray-900">Spare Part Terlaris</h2>
                        </div>
                        <button onClick={() => navigate("/login")} className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2 group">
                            Lihat Semua <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {popularProducts.map((p, idx) => (
                            <Sheet key={p.id} open={openSheetId === p.id} onOpenChange={(isOpen) => setOpenSheetId(isOpen ? p.id : null)}>
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
                                            toast.success("Produk berhasil ditambahkan ke keranjang!");
                                            setTimeout(() => navigate("/login"), 1500);
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
            <section id="testimonials" ref={testimonialsRef} className="py-24 px-6 bg-slate-950 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className={`mb-16 ${visibleSections.has('testimonials') ? 'animate-fade-up' : 'opacity-0'}`}>
                        <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Testimonial</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4 text-white">Apa Kata Pelanggan?</h2>
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
                        
                        <p className="text-gray-300 text-xl leading-relaxed italic max-w-2xl mx-auto mb-8 relative z-10">
                            "{testimonials[activeTestimonial].text}"
                        </p>
                        
                        <h4 className="font-bold text-white text-lg mb-1">{testimonials[activeTestimonial].name}</h4>
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
            <section id="cta" ref={ctaRef} className="py-24 px-6 bg-white">
                <div className={`max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-gray-900 rounded-[2.5rem] p-14 md:p-20 text-center text-white relative overflow-hidden ${visibleSections.has('cta') ? 'animate-fade-up' : 'opacity-0'}`}>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10">
                        <FaRocket className="text-5xl text-orange-400 mx-auto mb-8" />
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Siap Bergabung dengan Kami?</h2>
                        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">Tingkatkan omzet bengkel Anda hingga 3x lipat dengan platform terintegrasi kami.</p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <button onClick={() => navigate("/register")} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 text-lg">
                                Gabung Mitra Sekarang
                            </button>
                            <a href="https://wa.me/6281234567890" className="glass hover:bg-white/10 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 text-lg">
                                Konsultasi Gratis
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-950 text-white pt-20 pb-10 px-6 border-t border-white/5">
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

            <Toaster position="top-center" richColors theme="dark" />
        </div>
    );
}