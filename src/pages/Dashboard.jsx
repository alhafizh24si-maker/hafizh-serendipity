import { FaWrench, FaClock, FaCheckCircle, FaMoneyBillWave, FaEllipsisV, FaSearch } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function DashboardAdmin() {
    // Statistik disesuaikan untuk operasional Bengkel
    const stats = [
        { id: "active_requests", label: "Permintaan Aktif", count: "24", icon: <FaWrench />, color: "bg-blue-600" },
        { id: "pending", label: "Menunggu Mekanik", count: "12", icon: <FaClock />, color: "bg-yellow-500" },
        { id: "completed", label: "Selesai Hari Ini", count: "48", icon: <FaCheckCircle />, color: "bg-emerald-500" },
        { id: "revenue", label: "Pendapatan (Harian)", count: "Rp 4.2M", icon: <FaMoneyBillWave />, color: "bg-blue-900" },
    ];

    // Data Tabel disesuaikan dengan konteks perbaikan kendaraan
    const recentServiceOrders = [
        { id: "BG-9921", customer: "Muhammad Anugrah", vehicle: "Honda Vario 150", service: "Ganti Oli & Rem", status: "Selesai", amount: "Rp 250.000" },
        { id: "BG-9922", customer: "Kadek Satria", vehicle: "Toyota Avanza", service: "Tune Up", status: "Proses", amount: "Rp 850.000" },
        { id: "BG-9923", customer: "Rafif Zidane", vehicle: "Yamaha NMAX", service: "Ban Bocor", status: "Batal", amount: "Rp 50.000" },
        { id: "BG-9924", customer: "Nabila Ahlam", vehicle: "Honda HR-V", service: "Service Berkala", status: "Selesai", amount: "Rp 1.200.000" },
    ];

    return (
        <div id="dashboard-container" className="pb-10 bg-gray-50 min-h-screen">
            <PageHeader 
                title="Admin Dashboard" 
                breadcrumb="Selamat Datang di Panel Kendali BengkelGo" 
            />

            {/* Grid Statistik */}
            <div id="dashboard-grid" className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((item) => (
                    <div key={item.id} className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition border-l-4 border-transparent hover:border-emerald-500">
                        <div className={`${item.color} rounded-xl p-4 text-2xl text-white`}>
                            {item.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-gray-800">{item.count}</span>
                            <span className="text-gray-400 font-medium text-sm">{item.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Section */}
            <div className="px-6 mt-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Daftar Perbaikan Terbaru</h2>
                            <p className="text-sm text-gray-500">Pantau semua status servis secara real-time</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                             <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition">
                                + Tambah Order
                            </button>
                            <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-semibold text-sm hover:bg-gray-50">
                                Export PDF
                            </button>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
                                    <th className="pb-4 font-bold">ID Order</th>
                                    <th className="pb-4 font-bold">Pelanggan</th>
                                    <th className="pb-4 font-bold">Kendaraan</th>
                                    <th className="pb-4 font-bold">Jenis Layanan</th>
                                    <th className="pb-4 font-bold">Biaya</th>
                                    <th className="pb-4 font-bold">Status</th>
                                    <th className="pb-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentServiceOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-5 font-bold text-blue-900">{order.id}</td>
                                        <td className="py-5 text-gray-700 font-medium">{order.customer}</td>
                                        <td className="py-5 text-gray-500">
                                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{order.vehicle}</span>
                                        </td>
                                        <td className="py-5 text-gray-600">{order.service}</td>
                                        <td className="py-5 font-bold text-gray-800">{order.amount}</td>
                                        <td className="py-5">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                                order.status === 'Selesai' ? 'bg-emerald-100 text-emerald-600' : 
                                                order.status === 'Batal' ? 'bg-red-100 text-red-600' : 
                                                'bg-blue-100 text-blue-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-5 text-center">
                                            <button className="p-2 hover:bg-gray-200 rounded-full transition text-gray-400">
                                                <FaEllipsisV />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}