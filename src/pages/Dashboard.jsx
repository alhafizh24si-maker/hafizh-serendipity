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
    { name: 'Mesin', value: 30, color: '#1A1A1A' }, // Neutral: Deep Onyx
    { name: 'Oli', value: 25, color: '#FF6B2C' },   // Primary: Orange Core
    { name: 'Ban', value: 25, color: '#FFD8C7' },   // Secondary: Soft Orange
    { name: 'Body', value: 20, color: '#F3F4F6' },  // Neutral: Silver Mist
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
        { id: "active_requests", label: "Permintaan Aktif", count: "24", icon: <FaWrench />, color: "text-orange-primary", lightColor: "bg-latar-reztro" },
        { id: "pending", label: "Menunggu Mekanik", count: "12", icon: <FaClock />, color: "text-teks", lightColor: "bg-latar" },
        { id: "completed", label: "Selesai Hari Ini", count: "48", icon: <FaCheckCircle />, color: "text-orange-primary", lightColor: "bg-latar-reztro" },
        { id: "revenue", label: "Pendapatan (Harian)", count: "Rp 4.2M", icon: <FaMoneyBillWave />, color: "text-teks", lightColor: "bg-latar" },
    ];

    return (
        // Container: Menggunakan font-jakarta dan background latar-reztro (Peach Glow)
        <div id="dashboard-container" className="pb-10 bg-latar-reztro min-h-screen font-jakarta selection:bg-orange-soft">
            
            {/* 1. STATS SECTION - Menggunakan Card Anatomy (Rounded 24px) */}
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((item) => (
                    <div key={item.id} className="bg-card rounded-[24px] shadow-sm p-6 flex items-center justify-between border border-garis/30">
                        <div className="flex flex-col">
                            {/* Caption/Overline: text-[10px] uppercase font-medium */}
                            <span className="text-teks-muted font-medium text-[10px] uppercase tracking-widest mb-1">{item.label}</span>
                            {/* Display/Stats: text-2xl font-black (Weight 900) */}
                            <span className="text-2xl font-black text-teks tracking-tight">{item.count}</span>
                        </div>
                        <div className={`${item.lightColor} ${item.color} rounded-[20px] p-4 text-xl`}>
                            {item.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. REVENUE & CATEGORIES - Menggunakan Card Anatomy (Rounded 32px) */}
            <div className="px-8 mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-card p-8 rounded-[32px] shadow-sm border border-garis/30">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <p className="text-xs font-bold text-teks-muted uppercase tracking-widest">Total Revenue</p>
                            <h3 className="text-2xl font-black text-teks mt-1">Rp 184.839.000</h3>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold">
                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-primary"></span> Income</div>
                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teks"></span> Expense</div>
                        </div>
                    </div>
                    {/* Data Visualization: Area Chart dengan Gradient Depth */}
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF6B2C" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#FF6B2C" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#1A1A1A', color: '#fff' }} />
                                <Area type="monotone" dataKey="income" stroke="#FF6B2C" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                                <Area type="monotone" dataKey="expense" stroke="#1A1A1A" strokeWidth={3} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-card p-8 rounded-[32px] shadow-sm border border-garis/30">
                    {/* Sub-judul: font-bold (700) */}
                    <h3 className="font-bold text-teks mb-6">Top Categories</h3>
                    {/* Pie Chart: Donut style dengan cornerRadius 10 */}
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
                                <span className="text-[11px] font-bold text-teks-muted">{item.name} {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. STAFF SECTION - Menggunakan Dashed Button Anatomy */}
            <div className="px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-card p-8 rounded-[32px] shadow-sm border border-garis/30">
                    <h3 className="font-bold text-teks mb-8">Orders Overview</h3>
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

                <div className="bg-card p-8 rounded-[32px] shadow-sm border border-garis/30">
                    <h3 className="font-bold text-teks mb-6">Mekanik Teraktif</h3>
                    <div className="space-y-5">
                        {[
                            { name: "Agus Setiawan", task: "12 Unit", img: "https://randomuser.me/api/portraits/men/1.jpg" },
                            { name: "Budi Santoso", task: "9 Unit", img: "https://randomuser.me/api/portraits/men/2.jpg" }
                        ].map((m, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={m.img} className="w-10 h-10 rounded-2xl object-cover" alt=""/>
                                    <div>
                                        {/* Body/Lead: text-sm font-bold */}
                                        <p className="text-sm font-bold text-teks">{m.name}</p>
                                        <p className="text-[10px] text-teks-muted font-medium">{m.task} Selesai</p>
                                    </div>
                                </div>
                                <FaEllipsisV className="text-garis" size={10} />
                            </div>
                        ))}
                    </div>
                    {/* Button Dashed: border-2 border-dashed */}
                    <button className="mt-8 w-full py-3 border-2 border-dashed border-garis rounded-2xl text-teks-muted text-[10px] font-black uppercase tracking-widest hover:bg-latar transition-all">
                        Lihat Semua Staff
                    </button>
                </div>
            </div>

            {/* 4. RECENT ORDERS - Menggunakan Table Overline & Soft UI Badge */}
            <div className="px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-card p-8 rounded-[32px] shadow-sm border border-garis/30">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-black text-teks tracking-tight">Recent Orders</h3>
                        {/* Button Solid: px-4 py-2 rounded-xl */}
                        <button className="text-[10px] font-black text-orange-primary uppercase tracking-widest bg-latar-reztro px-4 py-2 rounded-xl transition-colors hover:bg-orange-soft">See All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                {/* Table Header Style: Overline (uppercase, tracking-widest, text-[10px]) */}
                                <tr className="text-[10px] font-black text-teks-muted uppercase tracking-widest border-b border-garis/30">
                                    <th className="pb-4">Order ID</th>
                                    <th className="pb-4">Layanan</th>
                                    <th className="pb-4">Biaya</th>
                                    <th className="pb-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { id: "ORD-1025", service: "Tune Up", price: "Rp 150k", status: "On Process", color: "text-orange-primary bg-latar-reztro" },
                                    { id: "ORD-1026", service: "Ganti Oli", price: "Rp 85k", status: "Completed", color: "text-hijau bg-green-50" },
                                ].map((order, i) => (
                                    <tr key={i} className="border-b border-garis/20 last:border-0">
                                        <td className="py-5 font-bold text-teks">{order.id}</td>
                                        <td className="py-5 text-teks-muted">{order.service}</td>
                                        <td className="py-5 font-black text-teks">{order.price}</td>
                                        <td className="py-5">
                                            {/* Badge (Status): Soft UI Style (rounded-lg, font-black) */}
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

                <div className="bg-card p-8 rounded-[32px] shadow-sm border border-garis/30">
                    <h3 className="font-black text-teks tracking-tight mb-8">Customer Reviews</h3>
                    <div className="space-y-6">
                        {[
                            { name: "Sarah Wijaya", comment: "Pelayanannya cepat, mekanik detail. Puas!", rate: 5 },
                            { name: "Doni Pratama", comment: "Tempat nunggu nyaman, motor mantap lagi.", rate: 4 }
                        ].map((rev, i) => (
                            <div key={i} className="p-5 rounded-[24px] bg-latar-reztro/50 border border-orange-soft/30">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-sm font-black text-teks">{rev.name}</p>
                                    <div className="flex text-orange-primary text-xs">{"★".repeat(rev.rate)}</div>
                                </div>
                                <p className="text-xs text-teks-muted italic leading-relaxed">"{rev.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}