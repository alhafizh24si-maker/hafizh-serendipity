import React, { useState, useEffect } from 'react';
import { 
  FaWrench, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaPlus, 
  FaTrashAlt, 
  FaMotorcycle, 
  FaUserTie, 
  FaCheckDouble, 
  FaUserCheck, 
  FaTimes 
} from 'react-icons/fa';

// Asumsi import Shadcn UI tersedia di project Anda
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function MechanicCrmDashboard() {
  // 1. Sinkronisasi State Antrian dengan LocalStorage (Key: 'gofix_queue')
  const [queue, setQueue] = useState(() => {
    const savedQueue = localStorage.getItem('gofix_queue');
    if (savedQueue) {
      try {
        return JSON.parse(savedQueue);
      } catch (e) {
        console.error("Gagal parse data gofix_queue", e);
      }
    }
    // Default data jika localStorage masih kosong
    const defaultData = [
      { id: 'Q-001', plat: 'B 1234 XY', owner: 'Budi S. (Member)', issue: 'Ganti Oli & Tune Up', status: 'Pending Konfirmasi', mechanicId: null, date: '2026-07-07' },
      { id: 'Q-002', plat: 'D 5678 AB', owner: 'Siti R.', issue: 'Starter Mati', status: 'Dikerjakan', mechanicId: 'm1', date: '2026-07-07' },
      { id: 'Q-003', plat: 'P 9012 CD', owner: 'Andi W.', issue: 'Kampas Rem Bunyi', status: 'Menunggu', mechanicId: null, date: '2026-07-07' },
    ];
    localStorage.setItem('gofix_queue', JSON.stringify(defaultData));
    return defaultData;
  });

  // 2. State untuk Mekanik
  const [mechanics, setMechanics] = useState([
    { id: 'm1', name: 'Pak Joko', specialty: 'Mesin', status: 'Sibuk', capacity: 2, currentJobs: 1 },
    { id: 'm2', name: 'Andi', specialty: 'Kelistrikan', status: 'Tersedia', capacity: 2, currentJobs: 0 },
    { id: 'm3', name: 'Budi', specialty: 'Oli & Ban', status: 'Tersedia', capacity: 3, currentJobs: 0 },
  ]);

  // 3. State Form Admin, Form Member, & Alert
  const [newPlat, setNewPlat] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newIssue, setNewIssue] = useState('');
  
  // State Khusus Simulasi Member
  const [memberPlat, setMemberPlat] = useState('');
  const [memberOwner, setMemberOwner] = useState('');
  const [memberIssue, setMemberIssue] = useState('');

  const [crmAlert, setCrmAlert] = useState({ show: false, type: 'success', title: '', msg: '' });

  // EFFECT A: Simpan data ke localStorage setiap kali ada perubahan data 'queue' di Admin
  useEffect(() => {
    localStorage.setItem('gofix_queue', JSON.stringify(queue));
  }, [queue]);

  // EFFECT B: Listen perubahan dari tab/jendela lain (Real-time listener saat member input)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'gofix_queue' && e.newValue) {
        setQueue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Fungsi Tambah Antrian Langsung oleh Admin (Langsung berstatus 'Menunggu')
  const handleAddQueue = (e) => {
    e.preventDefault();
    if (!newPlat || !newOwner || !newIssue) return;
    const newItem = {
      id: `ADM-${Date.now().toString().slice(-4)}`,
      plat: newPlat.toUpperCase(),
      owner: newOwner,
      issue: newIssue,
      status: 'Menunggu',
      mechanicId: null,
      date: new Date().toISOString().split('T')[0]
    };
    setQueue([newItem, ...queue]);
    setNewPlat('');
    setNewOwner('');
    setNewIssue('');
    triggerAlert('success', 'Antrian Ditambahkan!', `Kendaraan ${newItem.plat} langsung masuk antrian.`);
  };

  // Simulasi Pemesanan oleh Member (Masuk sebagai 'Pending Konfirmasi')
  const handleMemberOrder = (e) => {
    e.preventDefault();
    if (!memberPlat || !memberOwner || !memberIssue) return;
    const newOrder = {
      id: `MBR-${Date.now().toString().slice(-4)}`,
      plat: memberPlat.toUpperCase(),
      owner: `${memberOwner} (Member)`,
      issue: memberIssue,
      status: 'Pending Konfirmasi',
      mechanicId: null,
      date: new Date().toISOString().split('T')[0]
    };
    setQueue([newOrder, ...queue]);
    setMemberPlat('');
    setMemberOwner('');
    setMemberIssue('');
    triggerAlert('success', 'Pesanan Member Terkirim!', `Menunggu konfirmasi admin untuk plat ${newOrder.plat}.`);
  };

  // Konfirmasi Pesanan Member oleh Admin
  const confirmMemberOrder = (queueId) => {
    setQueue(queue.map(q => q.id === queueId ? { ...q, status: 'Menunggu' } : q));
    triggerAlert('success', 'Pesanan Dikonfirmasi!', 'Pesanan disetujui dan masuk daftar antrian utama.');
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

  // Fungsi Hapus Antrian / Tolak Pesanan
  const deleteQueue = (id, isReject = false) => {
    setQueue(queue.filter(q => q.id !== id));
    triggerAlert('destructive', isReject ? 'Pesanan Ditolak' : 'Antrian Dihapus', 'Data telah diperbarui.');
  };

  const triggerAlert = (type, title, msg) => {
    setCrmAlert({ show: true, type, title, msg });
    setTimeout(() => setCrmAlert(prev => ({ ...prev, show: false })), 4000);
  };

  // Helper styling status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending Konfirmasi': return "bg-purple-50 text-purple-700 border border-purple-200";
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
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100/70 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider mb-1">Butuh Konfirmasi</p>
            <h3 className="text-2xl font-black text-purple-600">{queue.filter(q => q.status === 'Pending Konfirmasi').length} <span className="text-xs font-medium text-gray-400">Request</span></h3>
          </div>
          <div className="p-4 rounded-xl bg-purple-50 text-purple-600 text-lg"><FaUserCheck /></div>
        </div>
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
              <h2 className="text-lg font-black text-gray-800">Antrian Servis & Booking</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Kelola job masuk & penugasan</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Form Tambah Antrian Cepat oleh Admin */}
            <form onSubmit={handleAddQueue} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-gray-100/70">
              <input 
                type="text" placeholder="Plat Nomor (Admin)" value={newPlat} onChange={e => setNewPlat(e.target.value)}
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
                <FaPlus /> Offline Input
              </button>
            </form>

            {/* List Antrian */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {queue.map((item) => {
                const assignedMechanic = mechanics.find(m => m.id === item.mechanicId);
                const availableMechanics = mechanics.filter(m => m.status === 'Tersedia');
                
                return (
                  <div key={item.id} className={`p-5 rounded-xl border transition-all duration-300 ${item.status === 'Selesai' ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-100 hover:border-[#FF6B2C]/30 shadow-sm'}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl text-lg border ${item.status === 'Selesai' ? 'bg-gray-100 text-gray-400 border-gray-200' : item.status === 'Pending Konfirmasi' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-orange-50 text-[#FF6B2C] border-orange-100'}`}>
                          <FaMotorcycle />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-800">{item.plat} <span className="text-gray-400 font-medium text-xs ml-1">• {item.owner}</span></h4>
                          <p className="text-xs text-gray-500 mt-0.5">{item.issue}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusBadge(item.status)}`}>
                          {item.status === 'Dikerjakan' ? '🔧 ' : item.status === 'Selesai' ? '✅ ' : item.status === 'Pending Konfirmasi' ? '⏳ ' : '🕒 '}{item.status}
                        </span>
                        
                        {item.status !== 'Selesai' && item.status !== 'Pending Konfirmasi' && (
                          <button onClick={() => deleteQueue(item.id)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Batalkan">
                            <FaTrashAlt size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* AKSI BARU: Untuk status Pending Konfirmasi */}
                    {item.status === 'Pending Konfirmasi' && (
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-2 bg-purple-50/50 p-2 rounded-lg">
                        <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider mr-auto">Pesanan Masuk:</span>
                        <button 
                          onClick={() => deleteQueue(item.id, true)} 
                          className="bg-rose-100 text-rose-700 hover:bg-rose-200 font-bold px-3 py-1.5 rounded-lg transition text-xs flex items-center gap-1"
                        >
                          <FaTimes /> Tolak
                        </button>
                        <button 
                          onClick={() => confirmMemberOrder(item.id)} 
                          className="bg-purple-600 text-white hover:bg-purple-700 font-bold px-4 py-1.5 rounded-lg transition text-xs flex items-center gap-1 shadow-sm"
                        >
                          <FaCheckCircle /> Terima & Masuk Antrian
                        </button>
                      </div>
                    )}

                    {/* Aksi Penugasan Mekanik */}
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
              {queue.length === 0 && (
                <div className="text-center py-8 text-gray-400 font-medium text-sm">Tidak ada antrian saat ini.</div>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Status Mekanik & Simulasi Aplikasi Member */}
        <div className="space-y-8">
          
          {/* SIMULASI PANEL MEMBER */}
          <div className="bg-purple-900 text-white rounded-[24px] shadow-lg p-6 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-purple-800 text-9xl font-black opacity-20 pointer-events-none">M</div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-purple-800 text-purple-300 rounded-xl"><FaMotorcycle className="text-lg" /></div>
              <div>
                <h2 className="text-base font-black">Simulasi Aplikasi Member</h2>
                <p className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">Uji Coba Member Memesan Mandiri</p>
              </div>
            </div>

            <form onSubmit={handleMemberOrder} className="space-y-3 relative z-10">
              <input 
                type="text" placeholder="Plat No (e.g. B 9999 AA)" value={memberPlat} onChange={e => setMemberPlat(e.target.value)}
                className="w-full bg-purple-800/60 border border-purple-700 rounded-xl px-4 py-2 text-xs font-bold text-white uppercase placeholder-purple-300 outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              />
              <input 
                type="text" placeholder="Nama Anda (Member)" value={memberOwner} onChange={e => setMemberOwner(e.target.value)}
                className="w-full bg-purple-800/60 border border-purple-700 rounded-xl px-4 py-2 text-xs text-white placeholder-purple-300 outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              />
              <textarea 
                placeholder="Keluhan Motor Anda..." value={memberIssue} onChange={e => setMemberIssue(e.target.value)} rows={2}
                className="w-full bg-purple-800/60 border border-purple-700 rounded-xl px-4 py-2 text-xs text-white placeholder-purple-300 outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
              />
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2.5 rounded-xl transition text-xs shadow-md uppercase tracking-wider">
                🚀 Kirim Order ke Bengkel
              </button>
            </form>
          </div>

          {/* Status Mekanik */}
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