import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FaWrench, FaSearch, FaStar, FaDatabase, FaCogs, FaUsers, FaArrowRight, 
    FaTicketAlt, FaWhatsapp, FaShoppingCart, FaCheckCircle, FaShieldAlt, FaClock,
    FaMicrophone, FaTimes, FaBell, FaGift, FaRocket, FaCar, FaTachometerAlt,
    FaUserCheck, FaPercentage, FaThumbsUp, FaTools, FaMapMarkerAlt, FaCalendarCheck,
    FaChevronRight, FaCommentDots, FaChartLine, FaAward, FaShieldVirus, FaWallet,
    FaHome, FaTags, FaBox, FaPhoneAlt, FaPlay, FaMotorcycle, FaCog, FaOilCan,
    FaToolbox
} from "react-icons/fa";

export default function GuestLanding() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [claimedVouchers, setClaimedVouchers] = useState([]);
    const [activeTab, setActiveTab] = useState("vouchers");
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [countdown, setCountdown] = useState({ hours: 23, minutes: 59, seconds: 59 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Pekanbaru");
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { type: "bot", message: "Halo! 👋 Ada yang bisa kami bantu? Tanyakan soal servis atau promo!" }
    ]);
    const [userMessage, setUserMessage] = useState("");
    const [animatedNumbers, setAnimatedNumbers] = useState({ mitra: 0, mekanik: 0, waktu: 0 });
    const [activeNav, setActiveNav] = useState("home");
    const [heroImageLoaded, setHeroImageLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    // Refs for sections
    const homeRef = useRef(null);
    const heroRef = useRef(null);
    const statsRef = useRef(null);
    const vouchersRef = useRef(null);
    const productsRef = useRef(null);
    const ctaRef = useRef(null);

    // Data vouchers
    const vouchers = [
        { 
            id: "FIXNEW20", 
            title: "Diskon Member Baru", 
            desc: "Potongan Rp 20.000 untuk servis pertama + Gratis Cuci Motor", 
            value: "Rp 20K", 
            badge: "Klaim Pertama", 
            color: "from-blue-500 to-cyan-500", 
            icon: <FaGift />,
            bgLight: "bg-blue-50",
            textColor: "text-blue-600",
            borderColor: "border-blue-200"
        },
        { 
            id: "OLIMAX", 
            title: "Bundling Ganti Oli", 
            desc: "Diskon 10% + Gratis Cek Kelistrikan Mesin + Filter Udara", 
            value: "10% OFF", 
            badge: "Paket Hemat", 
            color: "from-green-500 to-emerald-500", 
            icon: <FaRocket />,
            bgLight: "bg-green-50",
            textColor: "text-green-600",
            borderColor: "border-green-200"
        },
        { 
            id: "DEAL24H", 
            title: "Layanan Darurat 24 Jam", 
            desc: "Potongan biaya panggil mekanik khusus malam + Prioritas Service", 
            value: "Rp 50K", 
            badge: "Emergency Only", 
            color: "from-red-500 to-orange-500", 
            icon: <FaShieldVirus />,
            bgLight: "bg-red-50",
            textColor: "text-red-600",
            borderColor: "border-red-200"
        },
    ];

    // Products data
    const popularProducts = [
        { 
            id: 101, 
            name: "Oli Mesin Shell Advance AX7 10W-40 Matik 1L", 
            price: "Rp 65.000", 
            originalPrice: "Rp 78.000",
            rating: 4.9, 
            sales: "1.2k+ terjual", 
            discount: 17,
            img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&q=80",
            badge: "Best Seller"
        },
        { 
            id: 102, 
            name: "Kampas Rem Depan Cakram High Performance Honda/Yamaha", 
            price: "Rp 45.000", 
            originalPrice: "Rp 55.000",
            rating: 4.8, 
            sales: "850+ terjual",
            discount: 18,
            img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
            badge: "Hot Deal"
        },
        { 
            id: 103, 
            name: "Aki Kering GS Astra MF GTZ-5S Original Premium", 
            price: "Rp 210.000", 
            originalPrice: "Rp 250.000",
            rating: 5.0, 
            sales: "500+ terjual",
            discount: 16,
            img: "https://images.unsplash.com/photo-1617469167446-80e3a446755e?auto=format&fit=crop&w=400&q=80",
            badge: "Premium"
        },
    ];

    // Testimonials
    const testimonials = [
        { name: "Budi Santoso", location: "Rumbai", rating: 5, text: "Servis cepat dan harga transparan! Motor saya langsung beres dalam 30 menit.", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
        { name: "Siti Rahayu", location: "Panam", rating: 5, text: "Mekaniknya ramah dan profesional. Voucher diskonnya beneran berlaku!", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
        { name: "Andi Wijaya", location: "Diponegoro", rating: 4, text: "Aplikasi mudah digunakan, part ori semua. Rekomended banget!", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    ];

    // Hero background images
    const heroBgImages = [
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1920&q=80"
    ];

    // Smooth scroll function
    const scrollToSection = (sectionRef, sectionName) => {
        setActiveNav(sectionName);
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Track scroll position for parallax effects and header state
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Preload hero image
    useEffect(() => {
        const img = new Image();
        img.src = heroBgImages[0];
        img.onload = () => setHeroImageLoaded(true);
    }, []);

    // Countdown effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Mouse parallax
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Auto rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Animate numbers on scroll
    useEffect(() => {
        const animateValue = (start, end, duration, setter) => {
            const step = (end - start) / (duration / 16);
            let current = start;
            const timer = setInterval(() => {
                current += step;
                if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
                    setter(end);
                    clearInterval(timer);
                } else {
                    setter(Math.round(current));
                }
            }, 16);
            return timer;
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(0, 142, 2000, (val) => setAnimatedNumbers(prev => ({ ...prev, mitra: val })));
                    animateValue(0, 384, 2000, (val) => setAnimatedNumbers(prev => ({ ...prev, mekanik: val })));
                    animateValue(0, 45, 2000, (val) => setAnimatedNumbers(prev => ({ ...prev, waktu: val })));
                    observer.disconnect();
                }
            });
        });
        
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    // Scroll spy
    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { ref: heroRef, name: "home" },
                { ref: vouchersRef, name: "promo" },
                { ref: productsRef, name: "products" },
                { ref: ctaRef, name: "contact" }
            ];
            
            for (const section of sections) {
                if (section.ref.current) {
                    const rect = section.ref.current.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveNav(section.name);
                        break;
                    }
                }
            }
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        setTimeout(() => {
            setChatMessages(prev => [...prev, { type: "bot", message: "Terima kasih! Tim kami akan segera merespon pertanyaan Anda. 🚀" }]);
        }, 1000);
        setUserMessage("");
    };

    const handleVoiceSearch = () => {
        setIsVoiceSearchActive(true);
        setTimeout(() => {
            setSearchQuery("Oli Mesin Matic");
            setIsVoiceSearchActive(false);
        }, 2000);
    };

    // Navigation items
    const navItems = [
        { id: "home", label: "Beranda", icon: <FaHome />, ref: heroRef },
        { id: "promo", label: "Promo", icon: <FaTags />, ref: vouchersRef },
        { id: "products", label: "Produk", icon: <FaBox />, ref: productsRef },
        { id: "contact", label: "Kontak", icon: <FaPhoneAlt />, ref: ctaRef },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-jakarta text-gray-800 relative selection:bg-orange-500 selection:text-white overflow-x-hidden">
            
            {/* CSS Animations */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulseRing {
                    0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
                    70% { box-shadow: 0 0 0 20px rgba(37, 211, 102, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-15px) rotate(1deg); }
                    66% { transform: translateY(-7px) rotate(-1deg); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes rotateSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes particleMove {
                    0% { transform: translate(0, 0) scale(1); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
                }
                @keyframes bubbleIn {
                    from { 
                        opacity: 0; 
                        transform: translateY(-20px) scale(0.9); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
                .animate-fade-in-right { animation: fadeInRight 0.8s ease-out forwards; }
                .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
                .animate-slide-down { animation: slideDown 0.4s ease-out forwards; }
                .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-shimmer {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradientMove 5s ease infinite;
                }
                .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
                .animate-rotate-slow { animation: rotateSlow 20s linear infinite; }
                .animate-bubble-in { animation: bubbleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                .glass-effect {
                    backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .hover-lift {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .hover-lift:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                }
                .hero-gradient-overlay {
                    background: linear-gradient(
                        135deg,
                        rgba(0, 0, 0, 0.9) 0%,
                        rgba(0, 0, 0, 0.75) 25%,
                        rgba(0, 0, 0, 0.55) 50%,
                        rgba(0, 0, 0, 0.7) 75%,
                        rgba(0, 0, 0, 0.85) 100%
                    );
                }
                .particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: white;
                    border-radius: 50%;
                    animation: particleMove 3s ease-out infinite;
                }
                .bubble-nav {
                    backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.85);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                }
            `}</style>

            {/* ==================== TRANSPARENT HEADER (ALWAYS ON TOP) ==================== */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'px-4 py-3' 
                    : 'px-4 md:px-8 py-4'
            }`}>
                {/* Bubble Navigation (when scrolled) */}
                <div className={`transition-all duration-500 ${
                    isScrolled 
                        ? 'max-w-4xl mx-auto' 
                        : 'max-w-7xl mx-auto'
                }`}>
                    <div className={`transition-all duration-500 ${
                        isScrolled 
                            ? 'bubble-nav rounded-full px-6 py-2.5 animate-bubble-in' 
                            : 'bg-transparent rounded-none px-0 py-0'
                    }`}>
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection(heroRef, "home")}>
                                <div className="relative">
                                    <div className={`absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur-md group-hover:blur-lg transition-all ${
                                        isScrolled ? 'opacity-0 group-hover:opacity-100' : ''
                                    }`} />
                                    <div className="relative bg-gradient-to-br from-orange-500 to-amber-500 p-2.5 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110">
                                        <FaWrench className="text-white text-base" />
                                    </div>
                                </div>
                                <div className={`transition-all duration-300 ${isScrolled ? 'hidden md:block' : ''}`}>
                                    <span className="text-xl font-black tracking-tighter text-white">
                                        BengkelGo<span className="text-orange-400">Fix</span>
                                    </span>
                                </div>
                            </div>
                            
                            {/* Desktop Navigation */}
                            <div className={`hidden md:flex items-center gap-1 transition-all duration-300 ${
                                isScrolled 
                                    ? 'bg-transparent' 
                                    : 'bg-white/10 backdrop-blur-sm rounded-full p-1'
                            }`}>
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.ref, item.id)}
                                        className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                                            activeNav === item.id 
                                                ? "text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg" 
                                                : isScrolled
                                                    ? "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                                                    : "text-white/80 hover:text-white hover:bg-white/10"
                                        }`}
                                    >
                                        <span className="text-sm">{item.icon}</span>
                                        <span className={`transition-all duration-300 ${isScrolled ? 'text-xs' : ''}`}>{item.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => navigate("/login")}
                                    className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 px-3 py-2 rounded-lg ${
                                        isScrolled 
                                            ? 'text-gray-600 hover:text-orange-500 hover:bg-orange-50' 
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    Masuk
                                </button>
                                <button 
                                    onClick={() => navigate("/register")}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur-md group-hover:blur-lg transition-all opacity-0 group-hover:opacity-100" />
                                    <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 active:scale-95">
                                        Mitra Bengkel
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ==================== HERO SECTION ==================== */}
            <header ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
                
                {/* Hero Background Images with Overlay */}
                <div className="absolute inset-0 z-0">
                    {/* Main background image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                        style={{
                            backgroundImage: `url('${heroBgImages[0]}')`,
                            transform: `scale(${1 + scrollY * 0.0005})`,
                            filter: `brightness(${0.7 - scrollY * 0.001})`,
                            opacity: heroImageLoaded ? 1 : 0,
                            transition: 'opacity 1s ease-in-out'
                        }}
                    />
                    
                    {/* Gradient overlays - DIPERKUAT UNTUK EFEEK GELAP */}
                    <div className="absolute inset-0 hero-gradient-overlay" />
                    
                    {/* Additional dark overlay untuk mempergelap gambar */}
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Animated pattern overlay */}
                    <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            transform: `translateY(${scrollY * 0.3}px)`
                        }}
                    />
                    
                    {/* Floating particles */}
                    <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="particle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${2 + Math.random() * 4}s`,
                                    '--tx': `${(Math.random() - 0.5) * 200}px`,
                                    '--ty': `${(Math.random() - 0.5) * 200}px`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Animated background shapes */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div 
                        className="absolute top-20 left-10 w-64 h-64 border border-white/5 rounded-full animate-float"
                        style={{ animationDuration: '8s' }}
                    />
                    <div 
                        className="absolute bottom-20 right-10 w-48 h-48 border border-white/5 rounded-lg rotate-45 animate-float"
                        style={{ animationDuration: '10s', animationDelay: '2s' }}
                    />
                    <div 
                        className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full animate-float"
                        style={{ animationDuration: '12s', animationDelay: '4s' }}
                    />
                </div>

                {/* Main Hero Content */}
                <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        
                        {/* Left Content */}
                        <div className="space-y-8 text-white animate-fade-in-right">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full">
                                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                                    Platform Bengkel #1 Indonesia
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                                <span className="block">Solusi Servis</span>
                                <span className="block mt-2 bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                                    Modern & Terpercaya
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                                Temukan bengkel terbaik, booking servis online, dan dapatkan harga transparan. 
                                Didukung teknologi CRM terkini untuk pengalaman servis tanpa ribet.
                            </p>

                            {/* Enhanced Search Bar */}
                            <div className="pt-4 max-w-xl">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300" />
                                    <div className="relative bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 flex items-center gap-2">
                                        <div className="pl-4 text-white/60">
                                            <FaSearch className="text-lg" />
                                        </div>
                                        <input 
                                            type="text"
                                            placeholder="Cari suku cadang atau bengkel terdekat..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/40 text-sm"
                                        />
                                        <button 
                                            onClick={handleVoiceSearch}
                                            className={`p-3 rounded-xl transition-all ${
                                                isVoiceSearchActive 
                                                    ? "bg-orange-500 text-white animate-pulse" 
                                                    : "text-white/60 hover:bg-white/10"
                                            }`}
                                        >
                                            <FaMicrophone />
                                        </button>
                                        <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
                                            Cari Sekarang
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-6 pt-4 flex-wrap">
                                {[
                                    { icon: <FaShieldAlt />, text: "Garansi 30 Hari" },
                                    { icon: <FaUserCheck />, text: "Mekanik Tersertifikasi" },
                                    { icon: <FaWallet />, text: "Harga Transparan" }
                                ].map((badge, idx) => (
                                    <div key={idx} className="flex items-center gap-2 group cursor-pointer">
                                        <div className="bg-white/10 backdrop-blur-sm p-2.5 rounded-xl group-hover:bg-orange-500/30 transition-all">
                                            <span className="text-orange-400 text-sm">{badge.icon}</span>
                                        </div>
                                        <span className="text-sm font-bold text-white/80">{badge.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex items-center gap-4 pt-2">
                                <button 
                                    onClick={() => navigate("/register")}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-70" />
                                    <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-sm px-8 py-4 rounded-2xl transition-all group-hover:scale-105 active:scale-95 shadow-2xl border border-white/20">
                                        Mulai Sekarang
                                    </div>
                                </button>
                                <button className="flex items-center gap-2 text-white font-bold text-sm group hover:text-orange-400 transition-colors">
                                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full group-hover:bg-orange-500/30 transition-all">
                                        <FaPlay className="text-xs" />
                                    </div>
                                    Lihat Demo
                                </button>
                            </div>
                        </div>

                        {/* Right Content - Stats Panel with 3D Effect */}
                        <div className="relative animate-fade-in-left hidden md:block">
                            <div 
                                className="relative"
                                style={{
                                    transform: `perspective(1000px) rotateY(${mousePosition.x * 5 - 2.5}deg) rotateX(${-(mousePosition.y * 5 - 2.5)}deg)`,
                                    transition: 'transform 0.1s ease-out'
                                }}
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[40px] blur-3xl animate-pulse" />
                                
                                {/* Stats Card */}
                                <div 
                                    ref={statsRef}
                                    className="relative bg-white/5 backdrop-blur-2xl p-10 rounded-[40px] border border-white/20 shadow-2xl"
                                >
                                    {/* Header */}
                                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                                        <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-3.5 rounded-2xl shadow-xl">
                                            <FaChartLine className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white">Live Monitor</h4>
                                            <p className="text-xs text-gray-400">Update real-time setiap detik</p>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="space-y-5">
                                        {[
                                            { label: "Mitra Bengkel", value: animatedNumbers.mitra, unit: "Outlet", color: "text-orange-400", bg: "bg-orange-500/10" },
                                            { label: "Mekanik Aktif", value: animatedNumbers.mekanik, unit: "Mekanik", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                                            { label: "Response Time", value: `< ${animatedNumbers.waktu}`, unit: "Menit", color: "text-blue-400", bg: "bg-blue-500/10" },
                                            { label: "Customer Happy", value: "98", unit: "%", color: "text-purple-400", bg: "bg-purple-500/10" }
                                        ].map((stat, idx) => (
                                            <div key={idx} className="flex justify-between items-center group">
                                                <span className="text-sm text-gray-300">{stat.label}</span>
                                                <span className={`font-black px-4 py-2 rounded-xl text-sm ${stat.bg} ${stat.color} border border-white/10 group-hover:scale-105 transition-transform`}>
                                                    {stat.value} {stat.unit}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Countdown Timer */}
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <p className="text-xs font-bold text-gray-400 mb-4 flex items-center gap-2">
                                            <span className="text-red-400">🔥</span> FLASH SALE BERAKHIR DALAM
                                        </p>
                                        <div className="flex gap-3 justify-center">
                                            {[
                                                { value: countdown.hours, label: "Jam" },
                                                { value: countdown.minutes, label: "Menit" },
                                                { value: countdown.seconds, label: "Detik" }
                                            ].map((time, idx) => (
                                                <div key={idx} className="relative group">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur-md group-hover:blur-lg transition-all opacity-50" />
                                                    <div className="relative bg-gray-900/80 backdrop-blur-sm text-white p-4 rounded-xl text-center min-w-[70px] border border-white/10">
                                                        <span className="text-3xl font-black">{String(time.value).padStart(2, '0')}</span>
                                                        <span className="text-[10px] block mt-1 opacity-70 uppercase">{time.label}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Floating service icons */}
                                    <div className="absolute -top-5 -right-5 text-orange-400/30 animate-float" style={{ animationDuration: '7s' }}>
                                        <FaTools className="text-4xl" />
                                    </div>
                                    <div className="absolute -bottom-5 -left-5 text-amber-400/30 animate-float" style={{ animationDuration: '9s', animationDelay: '1s' }}>
                                        <FaCog className="text-4xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
                    </div>
                </div>
            </header>

            {/* Floating WhatsApp Button */}
            <a 
                href="https://wa.me/6281234567890?text=Halo%20Admin%20BengkelGoFix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="fixed bottom-24 md:bottom-6 right-6 z-50 group"
                style={{ animation: 'pulseRing 1.5s infinite' }}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 text-white px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 group-hover:scale-110 active:scale-95">
                        <FaWhatsapp className="text-xl" />
                        <span className="font-bold text-sm hidden md:inline">Chat Admin</span>
                    </div>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                </div>
            </a>

            {/* Live Chat Button */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-24 md:bottom-6 left-6 z-50 group"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110 active:scale-95">
                        <FaCommentDots className="text-xl" />
                    </div>
                </div>
            </button>

            {/* Chat Panel */}
            {isChatOpen && (
                <div className="fixed bottom-36 md:bottom-28 left-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-up">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <FaCommentDots />
                            </div>
                            <div>
                                <span className="font-bold text-sm block">Live Support</span>
                                <span className="text-xs opacity-90">Online sekarang</span>
                            </div>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition">
                            <FaTimes />
                        </button>
                    </div>
                    <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${
                                    msg.type === "user" 
                                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white" 
                                        : "bg-white border border-gray-200 text-gray-700 shadow-sm"
                                } text-sm`}>
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-gray-100 flex gap-2 bg-white">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            placeholder="Ketik pesan..."
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400"
                        />
                        <button onClick={handleSendMessage} className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-all active:scale-95">
                            Kirim
                        </button>
                    </div>
                </div>
            )}

            {/* Notification Toast */}
            {isNotificationOpen && (
                <div className="fixed top-24 right-6 z-50 animate-slide-down">
                    <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20">
                        <FaCheckCircle className="text-xl" />
                        <div>
                            <span className="text-sm font-bold block">Voucher Berhasil Diklaim!</span>
                            <span className="text-xs opacity-90">Diskon siap digunakan 🎉</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 z-40 md:hidden py-2 px-4">
                <div className="flex justify-around items-center">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.ref, item.id)}
                            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-full transition-all ${
                                activeNav === item.id 
                                    ? "text-orange-500 bg-orange-50" 
                                    : "text-gray-400"
                            }`}
                        >
                            <span className="text-base">{item.icon}</span>
                            <span className="text-[10px] font-bold">{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Vouchers Section */}
            <section ref={vouchersRef} className="relative z-10 max-w-7xl mx-auto px-6 py-20 scroll-mt-20">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full border border-orange-200 mb-4">
                        <FaGift className="text-sm" />
                        Customer Incentives
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Klaim <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Voucher Diskon</span> Spesial
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Nikmati berbagai promo menarik untuk pengalaman servis terbaik dan lebih hemat
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {vouchers.map((voucher, idx) => {
                        const isClaimed = claimedVouchers.includes(voucher.id);
                        return (
                            <div
                                key={voucher.id}
                                className={`group bg-white rounded-3xl p-8 flex flex-col justify-between shadow-lg border border-gray-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl`}
                                style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` }}
                            >
                                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${voucher.color} opacity-5 rounded-bl-full group-hover:opacity-15 transition-opacity`} />
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-4 rounded-2xl ${voucher.bgLight} bg-opacity-50`}>
                                            <span className="text-3xl">{voucher.icon}</span>
                                        </div>
                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${voucher.textColor} ${voucher.bgLight} border ${voucher.borderColor}`}>
                                            {voucher.badge}
                                        </span>
                                    </div>
                                    <h3 className={`text-4xl font-black bg-gradient-to-r ${voucher.color} bg-clip-text text-transparent mb-4`}>
                                        {voucher.value}
                                    </h3>
                                    <p className="text-lg font-bold text-gray-800 mb-2">{voucher.title}</p>
                                    <p className="text-sm text-gray-500 leading-relaxed">{voucher.desc}</p>
                                </div>
                                <div className="relative z-10 pt-6 mt-6 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <code className="text-sm font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-lg">{voucher.id}</code>
                                        <button
                                            onClick={() => handleClaimVoucher(voucher.id)}
                                            disabled={isClaimed}
                                            className={`text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                                                isClaimed 
                                                ? "bg-emerald-50 text-emerald-600 cursor-not-allowed" 
                                                : `bg-gradient-to-r ${voucher.color} text-white shadow-lg hover:scale-105 active:scale-95`
                                            }`}
                                        >
                                            {isClaimed ? (
                                                <>
                                                    <FaCheckCircle /> Tersimpan
                                                </>
                                            ) : "Klaim"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Products Section */}
            <section ref={productsRef} className="relative z-10 bg-white py-20 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full border border-orange-200 mb-4">
                                <FaShoppingCart className="text-sm" />
                                Marketplace Parts
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                                Suku Cadang <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Terlaris</span>
                            </h2>
                            <p className="text-gray-500 mt-2">Diskon hingga 20% untuk pembelian pertama</p>
                        </div>
                        <button 
                            onClick={() => navigate("/login")}
                            className="text-sm font-bold text-orange-500 hover:text-gray-800 flex items-center gap-2 transition-colors group"
                        >
                            Lihat Semua <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {popularProducts.map((produk, idx) => (
                            <div
                                key={produk.id}
                                className="group relative"
                                style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` }}
                                onMouseEnter={() => setHoveredProduct(produk.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                    <div className="relative h-52 overflow-hidden bg-gray-50">
                                        <img 
                                            src={produk.img} 
                                            alt={produk.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                                            -{produk.discount}%
                                        </div>
                                        <span className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                                            <FaStar className="text-amber-400" /> {produk.rating}
                                        </span>
                                        {hoveredProduct === produk.id && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center animate-fade-in-up">
                                                <button className="bg-white text-gray-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-orange-500 hover:text-white transition-all">
                                                    Lihat Detail
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-3">{produk.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-2xl font-black text-orange-500">{produk.price}</span>
                                            <span className="text-sm text-gray-400 line-through">{produk.originalPrice}</span>
                                        </div>
                                        <p className="text-xs text-emerald-600 font-medium mb-4">✅ {produk.sales}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={`text-xs ${i < Math.floor(produk.rating) ? "text-amber-400" : "text-gray-200"}`} />
                                                ))}
                                            </div>
                                            <button 
                                                onClick={() => navigate("/login")}
                                                className="bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white p-3 rounded-xl transition-all hover:scale-110 active:scale-95"
                                            >
                                                <FaShoppingCart className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative z-10 py-20 bg-gradient-to-r from-orange-50 via-white to-amber-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full border border-orange-200 mb-4">
                            <FaStar className="text-sm" />
                            Testimonials
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black">Apa Kata <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Pelanggan</span>?</h2>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-3xl p-10 shadow-xl text-center transition-all duration-300">
                            <img src={testimonials[activeTestimonial].avatar} className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-orange-500 shadow-lg" alt="avatar" />
                            <div className="flex justify-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < testimonials[activeTestimonial].rating ? "text-amber-400" : "text-gray-200"} />
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-6 text-lg leading-relaxed">"{testimonials[activeTestimonial].text}"</p>
                            <h4 className="font-black text-lg">{testimonials[activeTestimonial].name}</h4>
                            <p className="text-sm text-gray-400 flex items-center justify-center gap-1 mt-1">
                                <FaMapMarkerAlt className="text-orange-400 text-xs" />
                                {testimonials[activeTestimonial].location}
                            </p>
                        </div>
                        <div className="flex justify-center gap-3 mt-6">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTestimonial(idx)}
                                    className={`transition-all rounded-full ${
                                        activeTestimonial === idx ? "w-8 h-3 bg-orange-500" : "w-3 h-3 bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section ref={ctaRef} className="relative z-10 px-6 pb-20 scroll-mt-20">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-12 md:p-16 rounded-[40px] text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
                    <FaRocket className="text-5xl mx-auto text-orange-400 mb-6" />
                    <h2 className="text-3xl md:text-5xl font-black mb-4">Siap Scale Up Bisnis Bengkelmu?</h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
                        Bergabung dengan 500+ mitra bengkel yang sudah meningkatkan omzet hingga 3x lipat dengan platform terintegrasi kami.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button 
                            onClick={() => navigate("/register")}
                            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-sm px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            Gabung Mitra Sekarang
                        </button>
                        <button 
                            onClick={() => window.location.href = "https://wa.me/6281234567890"}
                            className="border-2 border-white/30 hover:border-orange-400 text-white font-black text-sm px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all"
                        >
                            Konsultasi Gratis
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2.5 rounded-xl">
                                <FaWrench className="text-white" />
                            </div>
                            <span className="font-black text-xl">BengkelGo<span className="text-orange-400">Fix</span></span>
                        </div>
                        <p className="text-sm text-gray-400">Platform servis kendaraan modern dengan teknologi CRM terintegrasi.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Layanan</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-orange-400 cursor-pointer">Servis Rutin</li>
                            <li className="hover:text-orange-400 cursor-pointer">Perbaikan Mesin</li>
                            <li className="hover:text-orange-400 cursor-pointer">Spare Part</li>
                            <li className="hover:text-orange-400 cursor-pointer">Emergency 24/7</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Perusahaan</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-orange-400 cursor-pointer">Tentang Kami</li>
                            <li className="hover:text-orange-400 cursor-pointer">Karir</li>
                            <li className="hover:text-orange-400 cursor-pointer">Kebijakan Privasi</li>
                            <li className="hover:text-orange-400 cursor-pointer">Syarat & Ketentuan</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Kontak</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>📞 (021) 1234-5678</li>
                            <li>✉️ info@bengkelgofix.com</li>
                            <li>📍 Pekanbaru, Indonesia</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-500 mt-8 pt-8 border-t border-gray-800">
                    © 2024 BengkelGoFix. All rights reserved.
                </div>
            </footer>
        </div>
    );
}