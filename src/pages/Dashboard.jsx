import { useState } from "react";
import { FaWrench, FaClock, FaCheckCircle, FaMoneyBillWave, FaEllipsisV } from "react-icons/fa";
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Cell as BarCell 
} from 'recharts';

// --- DATA SETS ---
const revenueData = [
    { name: 'Mar', income: 10000, expense: 6000 },
    { name: 'Apr', income: 12000, expense: 7000 },
    { name: 'May', income: 11000, expense: 8000 },
    { name: 'Jun', income: 15000, expense: 7500 },
    { name: 'Jul', income: 18439, expense: 9000 },
    { name: 'Aug', income: 13000, expense: 7000 },
    { name: 'Sep', income: 16000, expense: 8500 },
    { name: 'Oct', income: 15500, expense: 8000 },
];

const categoryData = [
    { name: 'Mesin', value: 30, color: '#1A1A1A' },
    { name: 'Oli', value: 25, color: '#FF6B2C' },
    { name: 'Ban', value: 25, color: '#FFD8C7' },
    { name: 'Body', value: 20, color: '#F3F4F6' },
];

const dailyOrderData = [
    { day: 'Mon', orders: 140 },
    { day: 'Tue', orders: 150 },
    { day: 'Wed', orders: 170 },
    { day: 'Thu', orders: 190, highlight: true },
    { day: 'Fri', orders: 160 },
    { day: 'Sat', orders: 155 },
    { day: 'Sun', orders: 145 },
];

export default function DashboardAdmin() {
    const stats = [
        { id: "active_requests", label: "Permintaan Aktif", count: "24", icon: <FaWrench />, color: "text-orange-600", lightColor: "bg-orange-50" },
        { id: "pending", label: "Menunggu Mekanik", count: "12", icon: <FaClock />, color: "text-gray-700", lightColor: "bg-gray-100" },
        { id: "completed", label: "Selesai Hari Ini", count: "48", icon: <FaCheckCircle />, color: "text-orange-600", lightColor: "bg-orange-50" },
        { id: "revenue", label: "Pendapatan (Harian)", count: "Rp 4.2M", icon: <FaMoneyBillWave />, color: "text-gray-700", lightColor: "bg-gray-100" },
    ];

    return (
        /* Container: Menggunakan bg-[#FCF8F3] (warna krem pucat) */
        <div id="dashboard-container" className="pb-10 bg-[#FCF8F3] min-h-screen font-jakarta selection:bg-orange-200">
            
            {/* 1. STATS SECTION */}
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((item) => (
                    <div key={item.id} className="bg-white rounded-[24px] shadow-md hover:shadow-lg transition-shadow p-6 flex items-center justify-between border border-gray-100/50">
                        <div className="flex flex-col">
                            <span className="text-gray-400 font-medium text-[10px] uppercase tracking-widest mb-1">{item.label}</span>
                            <span className="text-2xl font-black text-gray-800 tracking-tight">{item.count}</span>
                        </div>
                        <div className={`${item.lightColor} ${item.color} rounded-[20px] p-4 text-xl`}>
                            {item.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. REVENUE & CATEGORIES */}
            <div className="px-8 mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-md border border-gray-100/50">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Revenue</p>
                            <h3 className="text-2xl font-black text-gray-800 mt-1">Rp 184.839.000</h3>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold">
                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#FF6B2C]"></span> Income</div>
                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-800"></span> Expense</div>
                        </div>
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF6B2C" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#FF6B2C" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#1A1A1A', color: '#fff' }} />
                                <Area type="monotone" dataKey="income" stroke="#FF6B2C" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                                <Area type="monotone" dataKey="expense" stroke="#1A1A1A" strokeWidth={3} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] shadow-md border border-gray-100/50">
                    <h3 className="font-bold text-gray-800 mb-6">Top Categories</h3>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {categoryData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                                <span className="text-[11px] font-bold text-gray-500">{item.name} {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. STAFF & ORDERS OVERVIEW */}
            <div className="px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-md border border-gray-100/50">
                    <h3 className="font-bold text-gray-800 mb-8">Orders Overview</h3>
                    <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyOrderData}>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="orders" radius={[10, 10, 10, 10]} barSize={40}>
                                    {dailyOrderData.map((entry, index) => (
                                        <BarCell key={`cell-${index}`} fill={entry.highlight ? '#FF6B2C' : '#FFD8C7'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] shadow-md border border-gray-100/50">
                    <h3 className="font-bold text-gray-800 mb-6">Mekanik Teraktif</h3>
                    <div className="space-y-5">
                        {[
                            { name: "Agus Setiawan", task: "12 Unit", img: "https://randomuser.me/api/portraits/men/1.jpg" },
                            { name: "Budi Santoso", task: "9 Unit", img: "https://randomuser.me/api/portraits/men/2.jpg" }
                        ].map((m, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={m.img} className="w-10 h-10 rounded-2xl object-cover shadow-sm" alt=""/>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{m.name}</p>
                                        <p className="text-[10px] text-gray-400 font-medium">{m.task} Selesai</p>
                                    </div>
                                </div>
                                <FaEllipsisV className="text-gray-300" size={10} />
                            </div>
                        ))}
                    </div>
                    <button className="mt-8 w-full py-3 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                        Lihat Semua Staff
                    </button>
                </div>
            </div>

            {/* 4. RECENT ORDERS & REVIEWS */}
            <div className="px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-md border border-gray-100/50">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-black text-gray-800 tracking-tight">Recent Orders</h3>
                        <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors">See All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                    <th className="pb-4">Order ID</th>
                                    <th className="pb-4">Layanan</th>
                                    <th className="pb-4">Biaya</th>
                                    <th className="pb-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { id: "ORD-1025", service: "Tune Up", price: "Rp 150k", status: "On Process", color: "text-orange-600 bg-orange-50" },
                                    { id: "ORD-1026", service: "Ganti Oli", price: "Rp 85k", status: "Completed", color: "text-green-600 bg-green-50" },
                                ].map((order, i) => (
                                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-5 font-bold text-gray-800">{order.id}</td>
                                        <td className="py-5 text-gray-500">{order.service}</td>
                                        <td className="py-5 font-black text-gray-800">{order.price}</td>
                                        <td className="py-5">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${order.color}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] shadow-md border border-gray-100/50">
                    <h3 className="font-black text-gray-800 tracking-tight mb-8">Customer Reviews</h3>
                    <div className="space-y-6">
                        {[
                            { name: "Sarah Wijaya", comment: "Pelayanannya cepat, mekanik detail. Puas!", rate: 5 },
                            { name: "Doni Pratama", comment: "Tempat nunggu nyaman, motor mantap lagi.", rate: 4 }
                        ].map((rev, i) => (
                            <div key={i} className="p-5 rounded-[24px] bg-gray-50 border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm font-black text-gray-800">{rev.name}</p>
                                    <div className="flex text-orange-500 text-xs">{"★".repeat(rev.rate)}</div>
                                </div>
                                <p className="text-xs text-gray-500 italic leading-relaxed">"{rev.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}