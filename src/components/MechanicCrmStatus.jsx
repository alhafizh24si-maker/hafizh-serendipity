import React, { useState } from 'react';
import { FaWrench, FaExclamationTriangle, FaCheckCircle, FaPlus, FaTrashAlt, FaMotorcycle, FaUserTie, FaPlayCircle, FaCheckDouble } from 'react-icons/fa';

// Asumsi import Shadcn UI tersedia di project Anda
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function MechanicCrmDashboard() {
  // 1. State untuk Antrian Kendaraan
  const [queue, setQueue] = useState([
    { id: 'Q001', plat: 'B 1234 XY', owner: 'Budi S.', issue: 'Ganti Oli & Tune Up', status: 'Menunggu', mechanicId: null },
    { id: 'Q002', plat: 'D 5678 AB', owner: 'Siti R.', issue: 'Starter Mati', status: 'Dikerjakan', mechanicId: 'm1' },
    { id: 'Q003', plat: 'P 9012 CD', owner: 'Andi W.', issue: 'Kampas Rem Bunyi', status: 'Menunggu', mechanicId: null },
  ]);

  // 2. State untuk Mekanik
  const [mechanics, setMechanics] = useState([
    { id: 'm1', name: 'Pak Joko', specialty: 'Mesin', status: 'Sibuk', capacity: 2, currentJobs: 1 },
    { id: 'm2', name: 'Andi', specialty: 'Kelistrikan', status: 'Tersedia', capacity: 2, currentJobs: 0 },
    { id: 'm3', name: 'Budi', specialty: 'Oli & Ban', status: 'Tersedia', capacity: 3, currentJobs: 0 },
  ]);

  // 3. State Form & Alert
  const [newPlat, setNewPlat] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newIssue, setNewIssue] = useState('');
  const [crmAlert, setCrmAlert] = useState({ show: false, type: 'success', title: '', msg: '' });

  // Fungsi Tambah Antrian
  const handleAddQueue = (e) => {
    e.preventDefault();
    if (!newPlat || !newOwner || !newIssue) return;
    const newItem = {
      id: `Q${Date.now()}`,
      plat: newPlat.toUpperCase(),
      owner: newOwner,
      issue: newIssue,
      status: 'Menunggu',
      mechanicId: null
    };
    setQueue([newItem, ...queue]);
    setNewPlat('');
    setNewOwner('');
    setNewIssue('');
    triggerAlert('success', 'Antrian Ditambahkan!', `Kendaraan ${newItem.plat} masuk ke antrian.`);
  };

  // Fungsi Assign Mekanik
  const assignMechanic = (queueId, mechanicId) => {
    if (!mechanicId) return;
    
    setQueue(queue.map(q => q.id === queueId ? { ...q, status: 'Dikerjakan', mechanicId } : q));
    setMechanics(mechanics.map(m => m.id === mechanicId ? { ...m, status: 'Sibuk', currentJobs: m.currentJobs + 1 } : m));
    triggerAlert('success', 'Mekanik Ditugaskan!', `Job sedang dikerjakan.`);
  };

  // Fungsi Selesaikan Pekerjaan
  const completeJob = (queueId, mechanicId) => {
    setQueue(queue.map(q => q.id === queueId ? { ...q, status: 'Selesai' } : q));
    setMechanics(mechanics.map(m => {
      if (m.id === mechanicId) {
        const newJobCount = m.currentJobs - 1;
        return { ...m, currentJobs: newJobCount, status: newJobCount === 0 ? 'Tersedia' : 'Sibuk' };
      }
      return m;
    }));
    triggerAlert('success', 'Pekerjaan Selesai!', `Kendaraan siap diambil pelanggan.`);
  };

  // Fungsi Hapus Antrian
  const deleteQueue = (id) => {
    setQueue(queue.filter(q => q.id !== id));
    triggerAlert('destructive', 'Antrian Dihapus', 'Data antrian telah dihapus.');
  };

  const triggerAlert = (type, title, msg) => {
    setCrmAlert({ show: true, type, title, msg });
    setTimeout(() => setCrmAlert(prev => ({ ...prev, show: false })), 4000);
  };

  // Helper styling status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Dikerjakan': return "bg-blue-50 text-blue-700 border border-blue-200";
      case 'Selesai': return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      default: return "bg-amber-50 text-amber-700 border border-amber-200"; // Menunggu
    }
  };

  const getMechanicStatus = (status) => {
    return status === 'Tersedia' 
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
      : "bg-rose-50 text-rose-700 border border-rose-200";
  };

  return (
    <div className="p-8 pb-10 bg-[#F8FAFC] min-h-screen font-jakarta selection:bg-orange-200">
      
      {/* Header & Alert Notif */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-800">
            GoFix <span className="text-[#FF6B2C]">CRM</span> Center
          </h1>
          <p className="text-gray-400 text-sm font-bold mt-1 uppercase tracking-wider">Manajemen Antrian & Mekanik</p>
        </div>
        
        {crmAlert.show && (
          <Alert 
            variant={crmAlert.type === 'destructive' ? 'destructive' : 'default'} 
            className={`w-full md:w-auto transition-all duration-500 rounded-xl border ${
              crmAlert.type === 'destructive' 
                ? 'bg-rose-50 border-rose-200 text-rose-700' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            {crmAlert.type === 'destructive' ? <FaExclamationTriangle className="mt-0.5 text-rose-500" /> : <FaCheckCircle className="mt-0.5 text-emerald-500" />}
            <AlertTitle className="font-black text-sm ml-2">{crmAlert.title}</AlertTitle>
            <AlertDescription className="text-xs font-medium ml-2">{crmAlert.msg}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider mb-1">Antrian Menunggu</p>
            <h3 className="text-2xl font-black text-amber-600">{queue.filter(q => q.status === 'Menunggu').length} <span className="text-xs font-medium text-gray-400">Kendaraan</span></h3>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 text-amber-600 text-lg"><FaMotorcycle /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider mb-1">Sedang Dikerjakan</p>
            <h3 className="text-2xl font-black text-blue-600">{queue.filter(q => q.status === 'Dikerjakan').length} <span className="text-xs font-medium text-gray-400">Kendaraan</span></h3>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 text-blue-600 text-lg"><FaWrench /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider mb-1">Mekanik Tersedia</p>
            <h3 className="text-2xl font-black text-emerald-600">{mechanics.filter(m => m.status === 'Tersedia').length} <span className="text-xs font-medium text-gray-400">Orang</span></h3>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-600 text-lg"><FaUserTie /></div>
        </div>
      </div>

      {/* Main Grid: Antrian List & Mekanik Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Manajemen Antrian Kendaraan */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-gray-100/70 shadow-sm overflow-hidden">
          
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="p-2.5 bg-orange-50 text-[#FF6B2C] rounded-xl">
              <FaMotorcycle className="text-lg" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-800">Antrian Servis</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Kelola job masuk & penugasan</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Form Tambah Antrian Cepat */}
            <form onSubmit={handleAddQueue} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-gray-100/70">
              <input 
                type="text" placeholder="Plat Nomor (B 1234 XY)" value={newPlat} onChange={e => setNewPlat(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 font-bold uppercase placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all"
              />
              <input 
                type="text" placeholder="Nama Pemilik" value={newOwner} onChange={e => setNewOwner(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 font-medium placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all"
              />
              <input 
                type="text" placeholder="Keluhan / Job" value={newIssue} onChange={e => setNewIssue(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 font-medium placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all"
              />
              <button type="submit" className="bg-[#FF6B2C] hover:bg-[#e85a1b] text-white font-bold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-100 text-sm">
                <FaPlus /> Masuk Antrian
              </button>
            </form>

            {/* List Antrian */}
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {queue.map((item) => {
                const assignedMechanic = mechanics.find(m => m.id === item.mechanicId);
                const availableMechanics = mechanics.filter(m => m.status === 'Tersedia');
                
                return (
                  <div key={item.id} className={`p-5 rounded-xl border transition-all duration-300 ${item.status === 'Selesai' ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-100 hover:border-[#FF6B2C]/30 shadow-sm'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl text-lg border ${item.status === 'Selesai' ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-orange-50 text-[#FF6B2C] border-orange-100'}`}>
                          <FaMotorcycle />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-800">{item.plat} <span className="text-gray-400 font-medium text-xs ml-1">• {item.owner}</span></h4>
                          <p className="text-xs text-gray-500 mt-0.5">{item.issue}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusBadge(item.status)}`}>
                          {item.status === 'Dikerjakan' ? '🔧 ' : item.status === 'Selesai' ? '✅ ' : '⏳ '}{item.status}
                        </span>
                        
                        {item.status !== 'Selesai' && (
                          <button onClick={() => deleteQueue(item.id)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Batalkan">
                            <FaTrashAlt size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Aksi Penugasan / Selesaikan */}
                    {item.status === 'Menunggu' && (
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tugaskan:</span>
                        <select 
                          onChange={(e) => assignMechanic(item.id, e.target.value)} 
                          className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 font-bold outline-none focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] transition-all appearance-none"
                          defaultValue=""
                        >
                          <option value="" disabled>Pilih Mekanik...</option>
                          {availableMechanics.map(m => <option key={m.id} value={m.id}>{m.name} ({m.specialty})</option>)}
                          {availableMechanics.length === 0 && <option disabled>Mekanik Penuh</option>}
                        </select>
                      </div>
                    )}

                    {item.status === 'Dikerjakan' && (
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                        <span className="text-[10px] text-blue-600 font-bold">👷 Mekanik: {assignedMechanic?.name || 'Unknown'}</span>
                        <button 
                          onClick={() => completeJob(item.id, item.mechanicId)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm text-xs"
                        >
                          <FaCheckDouble /> Selesai
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Status Mekanik */}
        <div className="space-y-8">
          <div className="bg-white rounded-[24px] border border-gray-100/70 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><FaUserTie className="text-lg" /></div>
              <div>
                <h2 className="text-lg font-black text-gray-800">Status Mekanik</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Beban kerja tim</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {mechanics.map((mech) => {
                const workload = (mech.currentJobs / mech.capacity) * 100;
                return (
                  <div key={mech.id} className="p-4 rounded-xl border border-gray-100/70 bg-[#F8FAFC]">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-black text-gray-800 text-sm">{mech.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold">{mech.specialty}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${getMechanicStatus(mech.status)}`}>
                        {mech.status === 'Tersedia' ? '✅ Tersedia' : '🔥 Sibuk'}
                      </span>
                    </div>
                    <div className="space-y-1.5 mt-3">
                      <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                        <span>Kapasitas: {mech.currentJobs}/{mech.capacity} Job</span>
                        <span>{workload}%</span>
                      </div>
                      <Progress 
                        value={workload} 
                        className={`h-1.5 bg-gray-200 ${workload >= 100 ? '[&>div]:bg-rose-500' : workload > 0 ? '[&>div]:bg-[#FF6B2C]' : '[&>div]:bg-gray-300'}`} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}