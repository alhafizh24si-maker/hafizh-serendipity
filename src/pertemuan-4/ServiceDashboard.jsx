import React, { useState } from "react";
import serviceData from "./services.json";

export default function ServiceDashboard() {
  const [viewMode, setViewMode] = useState("guest");
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    selectedStatus: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const filteredServices = serviceData.filter((item) => {
    const matchesSearch = item.service_name.toLowerCase().includes(dataForm.searchTerm.toLowerCase()) || 
                          item.provider_info.name.toLowerCase().includes(dataForm.searchTerm.toLowerCase());
    const matchesCategory = dataForm.selectedCategory ? item.category === dataForm.selectedCategory : true;
    const matchesStatus = dataForm.selectedStatus ? item.status === dataForm.selectedStatus : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(serviceData.map((s) => s.category))];
  const statuses = [...new Set(serviceData.map((s) => s.status))];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-extrabold tracking-tight text-blue-600">TECH<span className="text-slate-900">FLOW</span></h1>
          <button 
            onClick={() => setViewMode(viewMode === "guest" ? "admin" : "guest")}
            className="group flex items-center gap-2 text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            {viewMode === "guest" ? "Admin Dashboard" : "Switch to Guest View"}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        {/* Controls Section */}
        <section className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </span>
              <input
                type="text"
                name="searchTerm"
                placeholder="Search services or providers..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-3">
              <select
                name="selectedCategory"
                className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm cursor-pointer"
                onChange={handleChange}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select
                name="selectedStatus"
                className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm cursor-pointer"
                onChange={handleChange}
              >
                <option value="">All Status</option>
                {statuses.map((st) => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Dynamic Content */}
        {viewMode === "guest" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices.map((item) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <AdminTable items={filteredServices} />
        )}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-block p-6 bg-slate-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800">No services found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}

/* --- SUB-COMPONENTS (Agar kode utama bersih) --- */

function ServiceCard({ item }) {
  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-blue-200 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/5">
      <div className="relative h-48 overflow-hidden">
        <img src={item.image} alt={item.service_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-700 shadow-sm border border-white/20">
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className={`flex items-center gap-1.5 text-xs font-bold ${item.status === 'Available' ? 'text-emerald-600' : 'text-amber-500'}`}>
            <span className={`w-2 h-2 rounded-full ${item.status === 'Available' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            {item.status}
          </span>
          <span className="text-xs text-slate-400 font-medium italic">ID: #{item.id}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors">{item.service_name}</h3>
        <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-6 font-medium">
          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          {item.provider_info.name}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Starting from</p>
            <p className="text-lg font-black text-slate-900 leading-none">
              <span className="text-sm font-normal text-slate-500 mr-1">{item.pricing_plan.currency}</span>
              {item.pricing_plan.monthly.toLocaleString()}
            </p>
          </div>
          <button className="bg-slate-50 hover:bg-blue-600 hover:text-white p-2.5 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminTable({ items }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden transition-all">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              {["Service", "Provider", "Category", "Revenue (Yearly)", "Specs", "Status"].map((header) => (
                <th key={header} className="p-5 text-xs font-bold uppercase tracking-wider text-slate-500">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="p-5">
                  <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.service_name}</p>
                  <p className="text-xs text-slate-400 font-mono">ID-{item.id}</p>
                </td>
                <td className="p-5">
                  <p className="text-sm font-semibold text-slate-700">{item.provider_info.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-tighter font-bold">{item.provider_info.location}</p>
                </td>
                <td className="p-5">
                  <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600">{item.category}</span>
                </td>
                <td className="p-5">
                  <p className="text-sm font-bold text-slate-900">{item.pricing_plan.currency} {item.pricing_plan.yearly.toLocaleString()}</p>
                </td>
                <td className="p-5 text-sm">
                  <div className="flex gap-2">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">{item.technical_specs.uptime} Uptime</span>
                  </div>
                </td>
                <td className="p-5 text-right">
                  <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${
                    item.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}