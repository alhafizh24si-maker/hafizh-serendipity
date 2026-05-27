import React, { useState } from 'react';
import { FaWrench, FaExclamationTriangle, FaCheckCircle, FaPlus } from 'react-icons/fa';

export default function MechanicCrmDashboard() {
  // 🟢 STATE UTK KOMPONEN 2 (SWITCH) & 3 (ALERT)
  const [emergencyOnlyMode, setEmergencyOnlyMode] = useState(false);
  
  // 🟢 STATE UTK KOMPONEN 1 (PROGRESS)
  const [totalOrderan, setTotalOrderan] = useState(7);
  const batasKapasitasMax = 10;
  const persentaseBeban = (totalOrderan / batasKapasitasMax) * 100;

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
        
        {/* Header Panel */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
            <FaWrench className="text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">GoFix CRM Monitor</h3>
            <p className="text-xs text-gray-500">Tugas Pertemuan 11: Implementasi 3 Komponen UI Lanjutan</p>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* ========================================================
            1️⃣ KOMPONEN UI: PROGRESS (Slot Antrean Mekanik)
           ======================================================== */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              1. Progress Beban Kerja Mekanik
            </span>
            <span className={`text-xs font-bold ${persentaseBeban >= 80 ? 'text-red-500' : 'text-orange-500'}`}>
              {totalOrderan}/{batasKapasitasMax} Slot ({persentaseBeban}%)
            </span>
          </div>
          
          {/* Progress Component Track */}
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200/40">
            {/* Progress Component Fill */}
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                persentaseBeban >= 80 ? 'bg-red-500' : 'bg-[#FF6B2C]'
              }`}
              style={{ width: `${persentaseBeban}%` }}
            />
          </div>

          <div className="flex justify-between items-center pt-0.5">
            <p className="text-[11px] text-gray-400 italic">
              {persentaseBeban >= 80 ? "*Mekanik kewalahan, antrean penuh!" : "*Kapasitas aman untuk menerima kendaraan."}
            </p>
            <button 
              onClick={() => setTotalOrderan(prev => (prev < batasKapasitasMax ? prev + 1 : 0))}
              className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md"
            >
              <FaPlus className="text-[8px]" /> Tambah Orderan
            </button>
          </div>
        </div>


        {/* ========================================================
            2️⃣ KOMPONEN UI: SWITCH / TOGGLE (Mode Layanan)
           ======================================================== */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            2. Switch Mode Sistem CRM
          </span>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="text-xs font-bold text-gray-800">Mode Layanan Darurat</p>
              <p className="text-[11px] text-gray-400">Batasi hanya untuk kendaraan mogok</p>
            </div>
            
            {/* Switch Component Layout */}
            <button
              onClick={() => setEmergencyOnlyMode(!emergencyOnlyMode)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                emergencyOnlyMode ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  emergencyOnlyMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>


        {/* ========================================================
            3️⃣ KOMPONEN UI: ALERT (Notifikasi Status Dinamis)
           ======================================================== */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            3. Alert Status Komponen
          </span>
          
          {emergencyOnlyMode ? (
            /* Alert Variant Destructive / Warning */
            <div className="bg-red-50 border border-red-200 text-red-900 px-4 py-3 rounded-xl flex items-start space-x-3 animate-fade-in">
              <FaExclamationTriangle className="text-red-500 text-lg mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-xs text-red-900">Sistem CRM Dibatasi</h5>
                <p className="text-[11px] text-red-700 mt-0.5 leading-relaxed">
                  Booking servis reguler via aplikasi ditutup sementara. Alokasi mekanik dialihkan penuh ke tim penanganan darurat jalan raya.
                </p>
              </div>
            </div>
          ) : (
            /* Alert Variant Success / Normal */
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-xl flex items-start space-x-3 animate-fade-in">
              <FaCheckCircle className="text-emerald-500 text-lg mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-bold text-xs text-emerald-900">Jalur Antrean Normal</h5>
                <p className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed">
                  Semua kategori servis berjalan lancar. Sistem CRM menyalurkan antrean pekerjaan secara merata ke seluruh mekanik standby.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}