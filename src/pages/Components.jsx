import React from "react";
import { FaWrench, FaTools, FaUsers, FaBox } from "react-icons/fa";
// Import komponen grafik dari Recharts
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from "recharts";

// Import Komponen-Komponen Reusable hasil Breakdown
import ButtonSolid from "../components/ButtonSolid";
import ButtonGhost from "../components/ButtonGhost";
import BadgeStatus from "../components/BadgeStatus";
import CRMContainer from "../components/CRMContainer";
import GridStats from "../components/GridStats";
import SectionLayout from "../components/SectionLayout";
import CRMCard from "../components/CRMCard";
import StatCard from "../components/StatCard";
import CRMTable from "../components/CRMTable";
import ReviewCard from "../components/ReviewCard";
import MechanicListCard from "../components/MechanicListCard";
import RevenueChartSection from "../components/RevenueChartSection";
import TopCategoriesSection from "../components/TopCategoriesSection";
import RecentOrdersSection from "../components/RecentOrdersSection";

export default function Components() {
  const tableHeaders = ["No", "Pelanggan", "Layanan / Suku Cadang", "Status", "Total Biaya"];

  const dummyOrders = [
    { id: 1, customer: "Ahmad Subarjo", service: "Service Besar + Ganti Oli Shell Helix", status: "process", cost: "Rp 450.000" },
    { id: 2, customer: "Siti Rahma", service: "Ganti Kampas Rem Depan Vario", status: "success", cost: "Rp 125.000" },
    { id: 3, customer: "Budi Setiawan", service: "Overhaul Mesin Honda Jazz", status: "danger", cost: "Rp 3.500.000" },
  ];

  // ==========================================
  // DATA DUMMY UNTUK GRAFIK PENDAPATAN BENGKEL
  // ==========================================
  const revenueData = [
    { name: "Jan", Income: 35000000, Expense: 18000000 },
    { name: "Feb", Income: 42000000, Expense: 21000000 },
    { name: "Mar", Income: 58000000, Expense: 25000000 },
    { name: "Apr", Income: 50000000, Expense: 22000000 },
    { name: "Mei", Income: 65000000, Expense: 28000000 },
    { name: "Jun", Income: 75000000, Expense: 30000000 },
  ];

  // ==========================================
  // DATA DUMMY UNTUK DONUT CHART KATEGORI KERUSAKAN
  // ==========================================
  const categoryData = [
    { name: "Oli & Servis Rutin", value: 50, color: "#FF6B2C" }, // Primary Orange
    { name: "Perbaikan Mesin", value: 30, color: "#1A1A1A" },   // Dark/Black
    { name: "Kelistrikan & ECU", value: 20, color: "#9CA3AF" }, // Gray
  ];

  // Format angka ke Rupiah ringkas untuk Sumbu Y Grafik
  const formatYAxis = (tickItem) => {
    return `Rp ${tickItem / 1000000}jt`;
  };

  return (
    <CRMContainer>
      {/* HEADER HALAMAN PLAYGROUND */}
      <div className="px-8 pt-8 pb-4 border-b border-gray-100 bg-white rounded-b-[32px] shadow-sm">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">CRM Components Playground</h1>
        <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wider">
          BengkelGoFix Modern Architectural Design Verification
        </p>
      </div>

      {/* STATS CARDS & GRID LAYOUT */}
      <GridStats>
        <StatCard title="Permintaan Aktif" value="24 Order" icon={FaTools} />
        <StatCard title="Total Pendapatan" value="Rp 18.4k" icon={FaWrench} />
        <StatCard title="Mekanik Standby" value="8 Orang" icon={FaUsers} />
        <StatCard title="Stok Sparepart" value="312 Item" icon={FaBox} />
      </GridStats>

      {/* COMPLEX SECTIONS WITH REAL CHARTS */}
      <SectionLayout>
        
        {/* 1. REVENUE AREA CHART (SUDAH AKTIF) */}
        <RevenueChartSection totalRevenue="Rp 184.839.000">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                {/* Efek Gradasi warna Oranye untuk Income */}
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B2C" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#FF6B2C" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderRadius: '12px', border: 'none', color: '#FFF', fontSize: '12px' }} />
              
              {/* Garis Grafik Income */}
              <Area type="monotone" dataKey="Income" stroke="#FF6B2C" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
              {/* Garis Grafik Expense */}
              <Area type="monotone" dataKey="Expense" stroke="#1A1A1A" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </RevenueChartSection>

        {/* 2. TOP CATEGORIES DONUT CHART (SUDAH AKTIF) */}
        <TopCategoriesSection>
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="w-full h-44 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={50} // Membuat efek Donut (Bolong Tengah)
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    cornerRadius={8}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Teks di tengah-tengah lingkaran Donut */}
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-gray-800">100%</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
              </div>
            </div>

            {/* Legend / Keterangan Warna Kategori */}
            <div className="w-full grid grid-cols-3 gap-2 mt-2 text-center">
              {categoryData.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-gray-800">{item.value}%</span>
                  <span className="text-[9px] font-bold text-gray-400 truncate w-full px-1">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </TopCategoriesSection>

        {/* RECENT ORDERS TABLE */}
        <RecentOrdersSection onSeeAll={() => alert("Membuka rute Layanan Aktif...")}>
          <CRMTable headers={tableHeaders}>
            {dummyOrders.map((order, idx) => (
              <tr key={order.id} className="hover:bg-gray-50/80 transition-colors border-b border-gray-50 last:border-0">
                <td className="py-4 font-bold text-xs text-gray-400">{idx + 1}</td>
                <td className="py-4 font-bold text-gray-900 text-sm">{order.customer}</td>
                <td className="py-4 text-xs text-gray-600 font-medium">{order.service}</td>
                <td className="py-4">
                  <BadgeStatus status={order.status}>
                    {order.status === "process" ? "On Process" : order.status === "success" ? "Completed" : "Canceled"}
                  </BadgeStatus>
                </td>
                <td className="py-4 font-extrabold text-sm text-[#FF6B2C]">{order.cost}</td>
              </tr>
            ))}
          </CRMTable>
        </RecentOrdersSection>

        {/* TIM & FEEDBACK */}
        <div className="flex flex-col space-y-6">
          <CRMCard>
            <h3 className="font-black text-gray-900 text-sm tracking-tight mb-4 uppercase tracking-wider text-[11px] text-gray-400">
              Tim Mekanik Aktif
            </h3>
            <MechanicListCard name="Joko Suprianto" status="Spesialis Transmisi Matic" avatar="https://randomuser.me/api/portraits/men/41.jpg" />
            <MechanicListCard name="Hendra Wijaya" status="Teknisi Kelistrikan & ECU" avatar="https://randomuser.me/api/portraits/men/75.jpg" />
            <ButtonGhost onClick={() => alert("Membuka seluruh profil staff...")}>
              Lihat Semua Staff
            </ButtonGhost>
          </CRMCard>

          <CRMCard>
            <h3 className="font-black text-gray-900 text-sm tracking-tight mb-4 uppercase tracking-wider text-[11px] text-gray-400">
              Ulasan Pelanggan Terbaru
            </h3>
            <ReviewCard name="Rian Hidayat" rating="5.0" comment="Pengerjaan super cepat, ganti oli dan kampas rem ga pake antre lama!" />
          </CRMCard>
        </div>

      </SectionLayout>
    </CRMContainer>
  );
}