import { 
  FaWrench, 
  FaUsers, 
  FaTools,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaCog,
  FaBox,
  FaThLarge,
  FaChartLine,
  FaUserFriends,
  FaTags,
  FaStar,
  FaCommentDots
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom"; // 🟢 Import useNavigate

export default function Sidebar() {
  const navigate = useNavigate(); // 🟢 Inisialisasi hooks navigate

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-2xl p-4 mb-1 space-x-4 transition-all duration-300 group
    ${isActive ? 
        "text-[#FF6B2C] bg-[#FF6B2C]/10 font-bold" : 
        "text-[#666666] hover:text-[#FF6B2C] hover:bg-[#FDF8F4]"
    }`;

  // 🟢 Fungsi untuk menangani proses Logout
  const handleLogout = () => {
    // 1. Bersihkan token dan data user dari penyimpanan browser
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 2. Arahkan pengguna kembali ke halaman landing (root path)
    navigate("/");
  };

  return (
    <div
      id="sidebar"
      className="sticky top-0 left-0 flex h-screen w-72 shrink-0 flex-col bg-white p-6 border-r border-gray-100"
    >
      {/* Header / Logo Section - BengkelGoFix (Tetap/Static di atas) */}
      <div id="sidebar-header" className="flex shrink-0 items-center space-x-3 mb-10 px-2">
        <div className="bg-[#FF6B2C] p-2.5 rounded-xl text-white shadow-lg shadow-orange-100">
          <FaWrench size={20} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-2xl tracking-tighter text-[#1A1A1A]">
            BengkelGo<span className="text-[#FF6B2C]">Fix</span>
          </span>
        </div>
      </div>

      {/* Main Menu Navigation (Area ini saja yang bisa di-scroll jika menu terlalu banyak) */}
      <div id="sidebar-menu" className="flex-1 overflow-y-auto pr-2 -mr-2">
        <ul id="menu-list" className="space-y-1">
          <p className="px-4 text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-4">
            Menu Utama
          </p>
          
          <li>
            <NavLink to="/dashboard" className={menuClass}>
              <MdSpaceDashboard className="text-xl" />
              <span className="text-sm">Dashboard</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/orders" className={menuClass}>
              <FaTools className="text-xl" /> 
              <span className="text-sm">Pesanan</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className={menuClass}>
              <FaBox className="text-xl" /> 
              <span className="text-sm">Inventaris</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/mechanics" className={menuClass}>
              <FaUsers className="text-xl" /> 
              <span className="text-sm">Mekanik</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/locations" className={menuClass}>
              <FaMapMarkerAlt className="text-xl" /> 
              <span className="text-sm">Area Layanan</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/components" className={menuClass}>
              <FaThLarge className="text-xl" /> 
              <span className="text-sm">Components</span>
            </NavLink>
          </li>

          {/* ========================================================
              CRM & PELANGGAN
              ======================================================== */}
          <div className="pt-6 my-2 border-t border-gray-100">
            <p className="px-4 text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-3">
              CRM & Pelanggan
            </p>
          </div>

          <li>
            <NavLink to="/customers" className={menuClass}>
              <FaUserFriends className="text-xl" /> 
              <span className="text-sm">Data Customer</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/promotions" className={menuClass}>
              <FaTags className="text-xl" /> 
              <span className="text-sm">Promosi & Diskon</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/reviews" className={menuClass}>
              <FaStar className="text-xl" /> 
              <span className="text-sm">Ulasan Pelanggan</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/messages" className={menuClass}>
              <FaCommentDots className="text-xl" /> 
              <span className="text-sm">Pesan Masuk</span>
            </NavLink>
          </li>

          {/* ========================================================
              MANAJEMEN SISTEM
              ======================================================== */}
          <div className="pt-6 my-2 border-t border-gray-100">
            <p className="px-4 text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-3">
              Manajemen Sistem
            </p>
          </div>

          <li>
            <NavLink to="/MechanicCrmStatus" className={menuClass}>
              <FaChartLine className="text-xl" /> 
              <span className="text-sm">CRM Monitor</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer & Bottom Profile Section (Tetap/Static di bawah) */}
      <div id="sidebar-footer" className="mt-auto shrink-0 pt-4 border-t border-gray-50">
        <div
          id="admin-card"
          className="bg-[#FDF8F4] p-4 rounded-[24px] border border-orange-100/50 mb-4"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Admin Profile"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-[#1A1A1A] text-xs font-bold truncate">Orlando L.</span>
              <span className="text-[#666666] text-[10px] font-medium">Super Admin</span>
            </div>
            <button className="p-2 text-gray-400 hover:text-[#FF6B2C] transition-colors">
              <FaCog size={14} />
            </button>
          </div>
        </div>

        {/* 🟢 Menambahkan event onClick ke fungsi handleLogout */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 py-2.5 text-gray-400 hover:text-red-500 font-bold text-xs transition-colors group"
        >
          <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" size={14} />
          <span>Keluar Sistem</span>
        </button>

        <div className="mt-3 text-center">
          <p className="text-[10px] text-gray-300 font-medium tracking-tight">
            &copy; 2026 BengkelGo v2.0
          </p>
        </div>
      </div>
    </div>
  );
}