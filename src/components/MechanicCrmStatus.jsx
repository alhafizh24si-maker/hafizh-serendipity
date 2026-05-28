import React, { useState } from 'react';
import { FaWrench, FaExclamationTriangle, FaCheckCircle, FaPlus } from 'react-icons/fa';

import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function MechanicCrmDashboard() {
  const [emergencyOnlyMode, setEmergencyOnlyMode] = useState(false);
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
            <p className="text-xs text-gray-500">Tugas Pertemuan 11: Real Shadcn UI Implementation</p>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* ========================================================
            1️⃣ IMPLEMENTASI SHADCN UI: PROGRESS
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
          
          {/* Komponen Asli Shadcn UI dengan kustomisasi warna bg fill oranye GoFix */}
          <Progress 
            value={persentaseBeban} 
            className={`w-full h-3 bg-gray-100 border border-gray-200/40 [&>div]:transition-all [&>div]:duration-500 ${
              persentaseBeban >= 80 ? '[&>div]:bg-red-500' : '[&>div]:bg-[#FF6B2C]'
            }`} 
          />

          <div className="flex justify-between items-center pt-1">
            <p className="text-[11px] text-gray-400 italic">
              {persentaseBeban >= 80 ? "*Mekanik kewalahan, antrean penuh!" : "*Kapasitas aman untuk menerima kendaraan."}
            </p>
            <button 
              onClick={() => setTotalOrderan(prev => (prev < batasKapasitasMax ? prev + 1 : 0))}
              className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md transition-colors"
            >
              <FaPlus className="text-[8px]" /> Tambah Orderan
            </button>
          </div>
        </div>

        {/* ========================================================
            2️⃣ IMPLEMENTASI SHADCN UI: SWITCH
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
            
            {/* Komponen Asli Shadcn UI */}
            <Switch 
              id="emergency-mode"
              checked={emergencyOnlyMode}
              onCheckedChange={setEmergencyOnlyMode}
              className={`${emergencyOnlyMode ? 'data-[state=checked]:bg-red-500' : 'data-[state=unchecked]:bg-gray-300'}`}
            />
          </div>
        </div>

        {/* ========================================================
            3️⃣ IMPLEMENTASI SHADCN UI: ALERT
           ======================================================== */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            3. Alert Status Komponen
          </span>
          
          {emergencyOnlyMode ? (
            /* Alert Shadcn - Variant Destructive / Warning */
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900 rounded-xl flex items-start space-x-3">
              <FaExclamationTriangle className="text-red-500 text-lg mt-0.5 flex-shrink-0" />
              <div>
                <AlertTitle className="font-bold text-xs text-red-900">Sistem CRM Dibatasi</AlertTitle>
                <AlertDescription className="text-[11px] text-red-700 mt-0.5 leading-relaxed">
                  Booking servis reguler via aplikasi ditutup sementara. Alokasi mekanik dialihkan penuh ke tim penanganan darurat jalan raya.
                </AlertDescription>
              </div>
            </Alert>
          ) : (
            /* Alert Shadcn - Variant Success / Normal */
            <Alert className="bg-emerald-50 border-emerald-200 text-emerald-900 rounded-xl flex items-start space-x-3">
              <FaCheckCircle className="text-emerald-500 text-lg mt-0.5 flex-shrink-0" />
              <div>
                <AlertTitle className="font-bold text-xs text-emerald-900">Jalur Antrean Normal</AlertTitle>
                <AlertDescription className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed">
                  Semua kategori servis berjalan lancar. Sistem CRM menyalurkan antrean pekerjaan secara merata ke seluruh mekanik standby.
                </AlertDescription>
              </div>
            </Alert>
          )}
        </div>

      </div>
    </div>
  );
}