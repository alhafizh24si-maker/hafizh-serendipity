import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FaWrench, FaSearch, FaStar, FaArrowRight, 
    FaWhatsapp, FaShoppingCart, FaCheckCircle, FaMapMarkerAlt,
    FaGift, FaRocket, FaShieldAlt, FaUsers, FaClock,
    FaTags, FaBox, FaPhoneAlt, FaTimes, FaCommentDots,
    FaHome, FaUserCheck, FaWallet, FaQuoteLeft
} from "react-icons/fa";

export default function GuestLanding() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [claimedVouchers, setClaimedVouchers] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { type: "bot", message: "Halo! Ada yang bisa kami bantu terkait servis atau promo?" }
    ]);
    const [userMessage, setUserMessage] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [animatedStats, setAnimatedStats] = useState({ mitra: 0, mekanik: 0, waktu: 0 });
    const [isTyping, setIsTyping] = useState(false);
    
    // Visibility states for scroll animations
    const [visibleSections, setVisibleSections] = useState({
        vouchers: false,
        products: false,
        testimonials: false,
        cta: false
    });

    const heroRef = useRef(null);
    const vouchersRef = useRef(null);
    const productsRef = useRef(null);
    const statsRef = useRef(null);
    const ctaRef = useRef(null);
    const testimonialsRef = useRef(null);
    const chatEndRef = useRef(null);
    const chatInputRef = useRef(null);

    // Vouchers data
    const vouchers = [
        { 
            id: "FIXNEW20", 
            title: "Diskon Member Baru", 
            desc: "Potongan Rp 20.000 untuk servis pertama + Gratis Cuci Motor", 
            value: "20K",
            icon: <FaGift className="text-orange-500" />
        },
        { 
            id: "OLIMAX", 
            title: "Bundling Ganti Oli", 
            desc: "Diskon 10% + Gratis Cek Kelistrikan + Filter Udara", 
            value: "10%",
            icon: <FaRocket className="text-orange-500" />
        },
        { 
            id: "DEAL24H", 
            title: "Layanan Darurat 24 Jam", 
            desc: "Potongan biaya panggil mekanik khusus malam + Prioritas Service", 
            value: "50K",
            icon: <FaShieldAlt className="text-orange-500" />
        },
    ];

    // Products data
    // Products data - dengan multiple fallback URLs
const popularProducts = [
    { 
        id: 101, 
        name: "Oli Mesin Shell Advance AX7 10W-40 Matic 1L", 
        price: "Rp 65.000", 
        originalPrice: "Rp 78.000",
        rating: 4.9, 
        sales: "1.2k+ terjual", 
        discount: 17,
        img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop"
    },
    { 
        id: 102, 
        name: "Kampas Rem Depan High Performance", 
        price: "Rp 45.000", 
        originalPrice: "Rp 55.000",
        rating: 4.8, 
        sales: "850+ terjual",
        discount: 18,
        img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop"
    },
    { 
        id: 103, 
        name: "Aki Kering GS Astra MF GTZ-5S Original", 
        price: "Rp 210.000", 
        originalPrice: "Rp 250.000",
        rating: 5.0, 
        sales: "500+ terjual",
        discount: 16,
        img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop"
    },
];

    // Testimonials
    const testimonials = [
        { 
            name: "Budi Santoso", 
            location: "Rumbai", 
            rating: 5, 
            text: "Servis cepat dan harga transparan! Motor saya langsung beres dalam 30 menit. Sangat recommended!", 
            avatar: "https://i.pravatar.cc/150?img=1",
            vehicle: "Honda Vario 150"
        },
        { 
            name: "Siti Rahayu", 
            location: "Panam", 
            rating: 5, 
            text: "Mekaniknya ramah dan profesional. Voucher diskonnya beneran berlaku! Pasti balik lagi.", 
            avatar: "https://i.pravatar.cc/150?img=5",
            vehicle: "Yamaha NMAX"
        },
        { 
            name: "Andi Wijaya", 
            location: "Diponegoro", 
            rating: 4, 
            text: "Aplikasi mudah digunakan, spare part ori semua. Booking servis jadi lebih praktis.", 
            avatar: "https://i.pravatar.cc/150?img=3",
            vehicle: "Suzuki Satria F150"
        },
    ];

    // Stats data
    const stats = [
        { icon: <FaUsers className="text-2xl" />, value: animatedStats.mitra, suffix: "+", label: "Mitra Bengkel" },
        { icon: <FaWrench className="text-2xl" />, value: animatedStats.mekanik, suffix: "+", label: "Mekanik Ahli" },
        { icon: <FaClock className="text-2xl" />, value: animatedStats.waktu, suffix: " Menit", label: "Response Time" },
    ];

    // Scroll observer for reveal animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const handleIntersect = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.dataset.section;
                    if (sectionId) {
                        setVisibleSections(prev => ({
                            ...prev,
                            [sectionId]: true
                        }));
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        const sections = [
            { ref: vouchersRef, id: 'vouchers' },
            { ref: productsRef, id: 'products' },
            { ref: testimonialsRef, id: 'testimonials' },
            { ref: ctaRef, id: 'cta' }
        ];

        sections.forEach(section => {
            if (section.ref.current) {
                section.ref.current.dataset.section = section.id;
                observer.observe(section.ref.current);
            }
        });

        return () => observer.disconnect();
    }, []);

    // Auto scroll chat to bottom
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatMessages, isTyping]);

    // Focus input when chat opens
    useEffect(() => {
        if (isChatOpen && chatInputRef.current) {
            setTimeout(() => {
                chatInputRef.current.focus();
            }, 300);
        }
    }, [isChatOpen]);

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.pageYOffset > 80);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animate stats
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const duration = 2000;
                const steps = 60;
                const interval = duration / steps;
                
                let step = 0;
                const timer = setInterval(() => {
                    step++;
                    const progress = step / steps;
                    setAnimatedStats({
                        mitra: Math.floor(142 * progress),
                        mekanik: Math.floor(384 * progress),
                        waktu: Math.floor(45 * progress)
                    });
                    if (step >= steps) clearInterval(timer);
                }, interval);
                
                observer.disconnect();
            }
        });
        
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    // Auto rotate testimonials
    useEffect(() => {
        if (!visibleSections.testimonials) return;
        
        const interval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [visibleSections.testimonials, testimonials.length]);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleClaimVoucher = (code) => {
        if (!claimedVouchers.includes(code)) {
            setClaimedVouchers([...claimedVouchers, code]);
            setIsNotificationOpen(true);
            setTimeout(() => setIsNotificationOpen(false), 3000);
        }
    };

    const handleSendMessage = () => {
        if (!userMessage.trim()) return;
        
        setChatMessages(prev => [...prev, { type: "user", message: userMessage }]);
        setUserMessage("");
        
        setIsTyping(true);
        
        setTimeout(() => {
            setIsTyping(false);
            setChatMessages(prev => [...prev, { 
                type: "bot", 
                message: "Terima kasih! Tim kami akan segera merespon pertanyaan Anda. 😊" 
            }]);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            
            {/* Custom CSS Animations */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes scaleInCenter {
                    0% { opacity: 0; transform: scale(0.7); }
                    70% { transform: scale(1.03); }
                    100% { opacity: 1; transform: scale(1); }
                }
                @keyframes typingDot {
                    0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
                    30% { opacity: 1; transform: translateY(-4px); }
                }
                @keyframes notificationSlide {
                    0% { opacity: 0; transform: translateX(100%) scale(0.9); }
                    30% { opacity: 1; transform: translateX(-10px) scale(1.02); }
                    50% { transform: translateX(5px) scale(0.98); }
                    100% { opacity: 1; transform: translateX(0) scale(1); }
                }
                @keyframes floatUp {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.5s ease-out forwards;
                }
                .animate-fade-in-left {
                    animation: fadeInLeft 0.6s ease-out forwards;
                }
                .animate-fade-in-right {
                    animation: fadeInRight 0.6s ease-out forwards;
                }
                .animate-scale-in {
                    animation: scaleIn 0.5s ease-out forwards;
                }
                .animate-scale-in-center {
                    animation: scaleInCenter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                .animate-notification {
                    animation: notificationSlide 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                }
                .animate-float-up {
                    animation: floatUp 0.3s ease-out forwards;
                }
                
                .typing-dot:nth-child(1) { animation: typingDot 1.4s infinite; }
                .typing-dot:nth-child(2) { animation: typingDot 1.4s infinite 0.2s; }
                .typing-dot:nth-child(3) { animation: typingDot 1.4s infinite 0.4s; }
                
                .scroll-reveal {
                    opacity: 0;
                }
                .scroll-reveal.visible {
                    opacity: 1;
                }
            `}</style>

            {/* ========== NAVBAR ========== */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled ? 'px-4 py-3' : 'px-6 py-5'
            }`}>
                <div className={`transition-all duration-500 ${
                    isScrolled ? 'max-w-4xl mx-auto' : 'max-w-7xl mx-auto'
                }`}>
                    <div className={`transition-all duration-500 ${
                        isScrolled 
                            ? 'bg-white/95 backdrop-blur-xl shadow-xl rounded-full px-6 py-3 border border-gray-100 animate-fade-in-down'
                            : 'bg-transparent'
                    }`}>
                        <div className="flex items-center justify-between">
                            <div 
                                className="flex items-center gap-2 cursor-pointer group" 
                                onClick={() => scrollToSection(heroRef)}
                            >
                                <div className="bg-orange-500 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
                                    <FaWrench className="text-white text-base" />
                                </div>
                                <span className={`text-lg font-bold transition-colors duration-300 ${
                                    isScrolled ? 'text-gray-900' : 'text-white'
                                }`}>
                                    BengkelGo<span className="text-orange-500">Fix</span>
                                </span>
                            </div>

                            <div className="hidden md:flex items-center gap-1">
                                {[
                                    { label: "Beranda", icon: <FaHome />, ref: heroRef },
                                    { label: "Promo", icon: <FaTags />, ref: vouchersRef },
                                    { label: "Produk", icon: <FaBox />, ref: productsRef },
                                    { label: "Kontak", icon: <FaPhoneAlt />, ref: ctaRef }
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToSection(item.ref)}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                                            isScrolled 
                                                ? 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <span className="text-xs">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => navigate("/login")}
                                    className={`text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                                        isScrolled 
                                            ? 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                                            : 'text-white/90 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    Masuk
                                </button>
                                <button 
                                    onClick={() => navigate("/register")}
                                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                                >
                                    Daftar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ========== HERO SECTION ========== */}
            <section ref={heroRef} className="relative min-h-screen flex items-center bg-gray-900">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1920&q=80"
                        alt="Workshop"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-white animate-fade-in-left">
                            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-4 py-2 rounded-full text-orange-300 text-sm mb-6">
                                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                                Platform Bengkel #1 Indonesia
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                                Solusi Servis Motor
                                <span className="block text-orange-400">Modern & Terpercaya</span>
                            </h1>
                            
                            <p className="text-gray-300 text-lg mb-8 max-w-lg">
                                Booking servis online, harga transparan, dan mekanik profesional. 
                                Didukung teknologi modern untuk pengalaman servis tanpa ribet.
                            </p>

                            <div className="flex items-center gap-2 bg-white rounded-xl p-2 max-w-md mb-8 shadow-lg hover:shadow-xl transition-shadow">
                                <FaSearch className="text-gray-400 ml-3" />
                                <input 
                                    type="text"
                                    placeholder="Cari bengkel atau spare part..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 border-none outline-none text-gray-800 text-sm px-2"
                                />
                                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                                    Cari
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                {[
                                    { icon: <FaShieldAlt />, text: "Garansi 30 Hari" },
                                    { icon: <FaUserCheck />, text: "Mekanik Tersertifikasi" },
                                    { icon: <FaWallet />, text: "Harga Transparan" }
                                ].map((badge, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors">
                                        <span className="text-orange-400">{badge.icon}</span>
                                        <span>{badge.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => navigate("/register")}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3.5 rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                                >
                                    Mulai Sekarang
                                </button>
                            </div>
                        </div>

                        <div ref={statsRef} className="hidden md:block animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                                    <div className="bg-orange-500 p-3 rounded-xl">
                                        <FaUsers className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Statistik Platform</h3>
                                        <p className="text-gray-400 text-xs">Update real-time</p>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    {stats.map((stat, idx) => (
                                        <div key={idx} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <span className="text-orange-400 group-hover:scale-110 transition-transform">{stat.icon}</span>
                                                <span className="text-gray-300 text-sm">{stat.label}</span>
                                            </div>
                                            <span className="text-white font-bold text-xl bg-white/5 px-3 py-1 rounded-lg group-hover:bg-orange-500/20 transition-all">
                                                {stat.value}{stat.suffix}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-white/50 rounded-full mt-1.5" />
                    </div>
                </div>
            </section>

            {/* ========== VOUCHERS SECTION ========== */}
            <section ref={vouchersRef} className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-12 scroll-reveal ${visibleSections.vouchers ? 'visible' : ''}`}>
                        <div className={visibleSections.vouchers ? 'animate-fade-in-up' : ''}>
                            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Promo Spesial</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Klaim Voucher Diskon</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                Nikmati berbagai promo menarik untuk pengalaman servis terbaik dan lebih hemat
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {vouchers.map((voucher, idx) => {
                            const isClaimed = claimedVouchers.includes(voucher.id);
                            return (
                                <div
                                    key={voucher.id}
                                    className={`bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-200 transition-all hover:-translate-y-1 scroll-reveal ${
                                        visibleSections.vouchers ? 'visible' : ''
                                    }`}
                                    style={{ 
                                        transitionDelay: `${idx * 0.1}s`,
                                        animationDelay: `${idx * 0.15}s`
                                    }}
                                >
                                    {visibleSections.vouchers && (
                                        <div className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="bg-orange-50 p-3 rounded-lg group-hover:scale-110 transition-transform">
                                                    {voucher.icon}
                                                </div>
                                                <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                    Voucher
                                                </span>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <span className="text-3xl font-bold text-orange-500">Rp {voucher.value}</span>
                                            </div>
                                            
                                            <h3 className="font-semibold text-gray-800 mb-2">{voucher.title}</h3>
                                            <p className="text-gray-500 text-sm mb-6">{voucher.desc}</p>
                                            
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <code className="text-sm text-gray-400 bg-gray-50 px-3 py-1.5 rounded font-mono">
                                                    {voucher.id}
                                                </code>
                                                <button
                                                    onClick={() => handleClaimVoucher(voucher.id)}
                                                    disabled={isClaimed}
                                                    className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                                                        isClaimed 
                                                            ? "bg-green-50 text-green-600 cursor-not-allowed" 
                                                            : "bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95"
                                                    }`}
                                                >
                                                    {isClaimed ? (
                                                        <span className="flex items-center gap-1">
                                                            <FaCheckCircle /> Diklaim
                                                        </span>
                                                    ) : "Klaim"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========== PRODUCTS SECTION ========== */}
            <section ref={productsRef} className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 scroll-reveal ${visibleSections.products ? 'visible' : ''}`}>
                        <div className={visibleSections.products ? 'animate-fade-in-up' : ''}>
                            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Marketplace</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2">Spare Part Terlaris</h2>
                        </div>
                        <button 
                            onClick={() => navigate("/login")}
                            className={`text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center gap-1 transition-colors group ${
                                visibleSections.products ? 'animate-fade-in-up' : ''
                            }`}
                            style={{ animationDelay: '0.1s' }}
                        >
                            Lihat Semua <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {popularProducts.map((product, idx) => (
                            <div 
                                key={product.id} 
                                className={`bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1 group scroll-reveal ${
                                    visibleSections.products ? 'visible' : ''
                                }`}
                                style={{ 
                                    transitionDelay: `${idx * 0.1}s`,
                                    animationDelay: `${idx * 0.15}s`
                                }}
                            >
                                {visibleSections.products && (
                                    <div className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                                        <div className="relative h-48 overflow-hidden bg-gray-100">
                                            <img 
                                                src={product.img} 
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                                -{product.discount}%
                                            </span>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2">{product.name}</h3>
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={`text-xs ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"}`} />
                                                ))}
                                                <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
                                            </div>
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-lg font-bold text-orange-500">{product.price}</span>
                                                <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                                            </div>
                                            <p className="text-xs text-gray-400">{product.sales}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== TESTIMONIALS SECTION ========== */}
            <section ref={testimonialsRef} className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <div className={`scroll-reveal ${visibleSections.testimonials ? 'visible' : ''}`}>
                        <div className={visibleSections.testimonials ? 'animate-fade-in-up' : ''}>
                            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Testimonial</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Apa Kata Pelanggan?</h2>
                            <p className="text-gray-500 mb-12">Pengalaman nyata dari pelanggan setia kami</p>
                        </div>
                    </div>
                    
                    {/* Main Testimonial Card */}
                    <div className={`scroll-reveal ${visibleSections.testimonials ? 'visible' : ''}`}>
                        <div className={visibleSections.testimonials ? 'animate-scale-in-center' : ''}>
                            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
                                {/* Decorative elements */}
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-t-2xl" />
                                <FaQuoteLeft className="absolute top-8 left-8 text-4xl text-orange-100" />
                                
                                {/* Avatar and Rating */}
                                <div className="flex flex-col items-center mb-8 relative z-10">
                                    <div className="relative mb-5">
                                        {/* Avatar glow effect */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full blur-md opacity-20" />
                                        <img 
                                            src={testimonials[activeTestimonial].avatar} 
                                            alt={testimonials[activeTestimonial].name}
                                            className="w-20 h-20 rounded-full border-4 border-white shadow-lg relative z-10 object-cover"
                                        />
                                        {/* Verified badge - Fixed position */}
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-[3px] border-white flex items-center justify-center shadow-md z-20">
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    {/* Star Rating */}
                                    <div className="flex gap-1.5 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar 
                                                key={i} 
                                                className={`text-xl ${
                                                    i < testimonials[activeTestimonial].rating 
                                                        ? "text-amber-400 drop-shadow-sm" 
                                                        : "text-gray-200"
                                                }`} 
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Rating Badge */}
                                    <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-200">
                                        ⭐ {testimonials[activeTestimonial].rating}.0 / 5.0
                                    </span>
                                </div>
                                
                                {/* Testimonial Text */}
                                <blockquote className="relative z-10 mb-8">
                                    <p className="text-gray-700 text-lg leading-relaxed italic max-w-2xl mx-auto">
                                        "{testimonials[activeTestimonial].text}"
                                    </p>
                                </blockquote>
                                
                                {/* Divider */}
                                <div className="flex items-center justify-center mb-6">
                                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                                </div>
                                
                                {/* Customer Info */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <h4 className="font-bold text-gray-800 text-lg mb-1">
                                        {testimonials[activeTestimonial].name}
                                    </h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <FaMapMarkerAlt className="text-orange-400 text-xs" />
                                            <span>{testimonials[activeTestimonial].location}</span>
                                        </div>
                                        <span className="text-gray-300">•</span>
                                        <span className="flex items-center gap-1">
                                            <span>🏍️</span>
                                            <span>{testimonials[activeTestimonial].vehicle}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Thumbnails */}
                    <div className={`flex justify-center gap-3 mt-8 scroll-reveal ${visibleSections.testimonials ? 'visible' : ''}`}>
                        {testimonials.map((testimonial, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTestimonial(idx)}
                                className={`group relative transition-all duration-300 ${
                                    activeTestimonial === idx 
                                        ? "scale-110" 
                                        : "scale-100 hover:scale-105"
                                }`}
                                title={testimonial.name}
                            >
                                {/* Active indicator ring */}
                                {activeTestimonial === idx && (
                                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full opacity-75" />
                                )}
                                
                                <div className="relative">
                                    <img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name}
                                        className={`w-12 h-12 rounded-full object-cover border-2 transition-all ${
                                            activeTestimonial === idx 
                                                ? "border-orange-500 shadow-lg" 
                                                : "border-gray-200 opacity-50 group-hover:opacity-90 group-hover:border-gray-400"
                                        }`}
                                    />
                                    
                                    {/* Mini checkmark for active */}
                                    {activeTestimonial === idx && (
                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CTA SECTION ========== */}
            <section ref={ctaRef} className="py-20 px-6">
                <div className={`max-w-4xl mx-auto bg-gray-900 rounded-2xl p-10 md:p-14 text-center text-white relative overflow-hidden scroll-reveal ${
                    visibleSections.cta ? 'visible' : ''
                }`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                    
                    <div className={visibleSections.cta ? 'animate-scale-in-center' : ''}>
                        <FaRocket className="text-4xl text-orange-400 mx-auto mb-6 relative z-10" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
                            Siap Bergabung dengan Kami?
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto mb-8 relative z-10">
                            Tingkatkan omzet bengkel Anda hingga 3x lipat dengan platform terintegrasi kami. 
                            Sudah 500+ mitra bergabung!
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap relative z-10">
                            <button 
                                onClick={() => navigate("/register")}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-all shadow-lg hover:scale-105 active:scale-95"
                            >
                                Gabung Mitra Sekarang
                            </button>
                            <a 
                                href="https://wa.me/6281234567890"
                                className="border border-gray-600 hover:border-orange-500 text-white font-semibold px-8 py-3.5 rounded-lg transition-all hover:scale-105 active:scale-95"
                            >
                                Konsultasi Gratis
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== FOOTER ========== */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-orange-500 p-2 rounded-lg">
                                <FaWrench className="text-white" />
                            </div>
                            <span className="font-bold text-lg">BengkelGo<span className="text-orange-400">Fix</span></span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Platform servis kendaraan modern dengan teknologi terintegrasi.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-4">Layanan</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-orange-400 cursor-pointer transition-colors">Servis Rutin</li>
                            <li className="hover:text-orange-400 cursor-pointer transition-colors">Perbaikan Mesin</li>
                            <li className="hover:text-orange-400 cursor-pointer transition-colors">Spare Part</li>
                            <li className="hover:text-orange-400 cursor-pointer transition-colors">Emergency 24/7</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-4">Perusahaan</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-orange-400 cursor-pointer transition-colors">Tentang Kami</li>
                            <li className="hover:text-orange-400 cursor-pointer transition-colors">Karir</li>
                            <li className="hover:text-orange-400 cursor-pointer transition-colors">Kebijakan Privasi</li>
                            <li className="hover:text-orange-400 cursor-pointer transition-colors">Syarat & Ketentuan</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-4">Kontak</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>📞 (021) 1234-5678</li>
                            <li>✉️ info@bengkelgofix.com</li>
                            <li>📍 Pekanbaru, Indonesia</li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    © 2024 BengkelGoFix. All rights reserved.
                </div>
            </footer>

            {/* ========== FLOATING BUTTONS ========== */}
            <a 
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 group"
            >
                <FaWhatsapp className="text-xl" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Chat Admin
                </span>
            </a>

            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`fixed bottom-6 left-6 z-50 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 ${
                    isChatOpen ? 'bg-gray-600 rotate-90' : 'bg-orange-500 hover:bg-orange-600'
                }`}
            >
                {isChatOpen ? <FaTimes className="text-xl" /> : <FaCommentDots className="text-xl" />}
            </button>

            <div className={`fixed bottom-24 left-6 z-50 w-80 transition-all duration-300 ${
                isChatOpen 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
            }`}>
                <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in">
                    <div className="bg-orange-500 p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <FaCommentDots className="text-lg" />
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-orange-500" />
                            </div>
                            <div>
                                <span className="font-semibold text-sm block">Live Support</span>
                                <span className="text-xs opacity-90">Online sekarang</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsChatOpen(false)} 
                            className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="h-72 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {chatMessages.map((msg, idx) => (
                            <div 
                                key={idx} 
                                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-float-up`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {msg.type === "bot" && (
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                        <FaCommentDots className="text-orange-500 text-xs" />
                                    </div>
                                )}
                                <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                                    msg.type === "user" 
                                        ? "bg-orange-500 text-white rounded-br-md" 
                                        : "bg-white border border-gray-200 text-gray-700 rounded-bl-md shadow-sm"
                                }`}>
                                    {msg.message}
                                </div>
                                {msg.type === "user" && (
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                                        <FaUserCheck className="text-white text-xs" />
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start animate-float-up">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                    <FaCommentDots className="text-orange-500 text-xs" />
                                </div>
                                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={chatEndRef} />
                    </div>

                    <div className="p-3 border-t border-gray-200 flex gap-2 bg-white">
                        <input
                            ref={chatInputRef}
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Ketik pesan..."
                            className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!userMessage.trim()}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                userMessage.trim()
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105 active:scale-95'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Kirim
                        </button>
                    </div>
                </div>
            </div>

            {isNotificationOpen && (
                <div className="fixed top-24 right-6 z-50">
                    <div className="bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-notification">
                        <FaCheckCircle className="text-lg" />
                        <div>
                            <span className="text-sm font-medium block">Voucher Berhasil Diklaim!</span>
                            <span className="text-xs opacity-90">Diskon siap digunakan 🎉</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}