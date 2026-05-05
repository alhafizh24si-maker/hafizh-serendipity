import { 
  FaWrench, 
  FaUsers, 
  FaPlus, 
  FaHistory, 
  FaExclamationTriangle, 
  FaTools,
  FaMapMarkerAlt,
  FaSignOutAlt
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // Styling navigasi yang disesuaikan dengan warna BengkelGo (Emerald & Blue)
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all duration-300
    ${isActive ? 
        "text-emerald-600 bg-emerald-50 font-bold shadow-sm border-r-4 border-emerald-500 rounded-r-none" : 
        "text-gray-500 hover:text-emerald-500 hover:bg-gray-50"
    }`;

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-72 flex-col bg-white p-6 shadow-xl border-r border-gray-100"
    >
      {/* Logo Section */}
      <div id="sidebar-logo" className="flex items-center space-x-3 mb-10 px-2">
        <div className="bg-blue-900 p-2 rounded-lg text-white">
          <FaWrench size={24} />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-2xl tracking-tight text-blue-900">
            BENGKEL<span className="text-emerald-500">GO</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Main Menu Navigation */}
      <div id="sidebar-menu" className="flex-1 overflow-y-auto">
        <ul id="menu-list" className="space-y-2">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Main Menu</p>
          
          <li>
            <NavLink to="/" className={menuClass}>
              <MdSpaceDashboard className="text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/orders" className={menuClass}>
              <FaTools className="text-xl" /> 
              <span>Active Services</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/mechanics" className={menuClass}>
              <FaUsers className="text-xl" /> 
              <span>Mechanics</span>
            </NavLink>
          </li>


          {/* System Management Section */}
          <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            System
          </div>
          
          <li>
            <NavLink to="/locations" className={menuClass}>
              <FaMapMarkerAlt className="text-xl" /> 
              <span>Coverage Area</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Bottom Profile / Footer Card */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="admin-card"
          className="bg-blue-900 p-4 rounded-2xl shadow-lg relative overflow-hidden group"
        >
          {/* Subtle background decoration */}
          <div className="absolute -right-4 -top-4 text-white/10 group-hover:scale-110 transition-transform">
             <FaWrench size={80} />
          </div>

          <div className="flex items-center space-x-3 relative z-10">
            <img
              className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Admin Profile"
            />
            <div className="flex flex-col">
              <span className="text-white text-xs font-bold">Admin Bengkel</span>
              <span className="text-emerald-400 text-[10px]">Super Admin</span>
            </div>
            <button className="ml-auto text-white/50 hover:text-white transition">
               <FaSignOutAlt size={14} />
            </button>
          </div>

          <button className="w-full mt-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-colors">
            <FaPlus size={10} />
            <span>New Order</span>
          </button>
        </div>

        <div className="mt-4 text-center">
            <p className="text-[10px] text-gray-400 font-medium">
              &copy; 2026 BengkelGo System v2.0
            </p>
        </div>
      </div>
    </div>
  );
}