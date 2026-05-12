import { 
  FaWrench, 
  FaUsers, 
  FaPlus, 
  FaTools,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaCog,
  FaBox // Icon tambahan untuk Inventaris/Products
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // Styling navigasi mengikuti gaya Reztro: Pill-shaped, Soft Orange Tint
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-2xl p-4 mb-1 space-x-4 transition-all duration-300 group
    ${isActive ? 
        "text-[#FF6B2C] bg-[#FF6B2C]/10 font-bold" : 
        "text-[#666666] hover:text-[#FF6B2C] hover:bg-[#FDF8F4]"
    }`;

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-72 flex-col bg-white p-6 border-r border-gray-100"
    >
      {/* Logo Section - BengkelGoFix */}
      <div id="sidebar-logo" className="flex items-center space-x-3 mb-12 px-2">
        <div className="bg-[#FF6B2C] p-2.5 rounded-xl text-white shadow-lg shadow-orange-100">
          <FaWrench size={20} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-2xl tracking-tighter text-[#1A1A1A]">
            BengkelGo<span className="text-[#FF6B2C]">Fix</span>
          </span>
        </div>
      </div>

      {/* Main Menu Navigation */}
      <div id="sidebar-menu" className="flex-1 overflow-y-auto">
        <ul id="menu-list" className="space-y-1">
          <p className="px-4 text-[11px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-4">
            Menu Utama
          </p>
          
          <li>
            <NavLink to="/" className={menuClass}>
              <MdSpaceDashboard className="text-xl" />
              <span className="text-sm">Dashboard</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/orders" className={menuClass}>
              <FaTools className="text-xl" /> 
              <span className="text-sm">Layanan Aktif</span>
            </NavLink>
          </li>

          {/* MENU BARU: INVENTARIS/PRODUCTS */}
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
        </ul>
      </div>

      {/* Bottom Profile Section */}
      <div id="sidebar-footer" className="mt-auto pt-6 border-t border-gray-50">
        <div
          id="admin-card"
          className="bg-[#FDF8F4] p-4 rounded-[24px] border border-orange-100/50 mb-6"
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

        <button className="w-full flex items-center justify-center space-x-2 py-3 text-gray-400 hover:text-red-500 font-bold text-xs transition-colors group">
          <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" size={14} />
          <span>Keluar Sistem</span>
        </button>

        <div className="mt-4 text-center">
            <p className="text-[10px] text-gray-300 font-medium tracking-tight">
              &copy; 2026 BengkelGo v2.0
            </p>
        </div>
      </div>
    </div>
  );
}