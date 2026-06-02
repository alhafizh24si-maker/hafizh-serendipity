import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react"; // HOOK: Mengimport useState dan useRef
import products from "../data/products.json";
import { FaArrowLeft, FaTools, FaFolderPlus } from "react-icons/fa";

export default function ProductsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // HOOK: useState untuk menyimpan catatan lokasi rak sparepart
  const [rackLocation, setRackLocation] = useState("");
  
  // HOOK: useRef untuk memegang kendali atas DOM input lokasi rak
  const noteInputRef = useRef(null);

  const product = products.find((p) => p.id === parseInt(id));

  // Fungsi memindahkan fokus kursor secara paksa ke input text menggunakan ref
  const handleManageStockClick = () => {
    noteInputRef.current.focus();
    // Efek visual tambahan: memberikan style border highlight saat difokuskan
    noteInputRef.current.classList.add("border-[#FF6B2C]");
  };

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FCF8F3]">
      <p className="text-gray-400 font-bold mb-4 font-jakarta">Item tidak ditemukan</p>
      <button onClick={() => navigate(-1)} className="text-[#FF6B2C] font-black uppercase text-xs tracking-widest">Kembali</button>
    </div>
  );

  return (
    <div className="bg-[#FCF8F3] min-h-screen p-10 font-jakarta">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B2C] mb-8 transition-all group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
        <span className="text-xs font-black uppercase tracking-widest">Kembali ke Inventaris</span>
      </button>

      <div className="max-w-5xl bg-white rounded-[3rem] border border-orange-100/30 shadow-2xl shadow-orange-900/5 overflow-hidden flex flex-col md:flex-row mx-auto">
        
        <div className="md:w-1/2 bg-gradient-to-br from-[#FFF9F3] to-white p-8 flex items-center justify-center border-r border-orange-50/50">
          <div className="relative w-full aspect-square bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-orange-50 group">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-50">
              <FaTools size={80} className="text-orange-100" />
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-orange-50 text-[#FF6B2C] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
              {product.category}
            </span>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{product.code}</span>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            {product.title}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#FAF7F2] p-5 rounded-3xl border border-orange-50/50">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Brand</p>
              <p className="font-bold text-gray-900">{product.brand}</p>
            </div>
            <div className="bg-[#FAF7F2] p-5 rounded-3xl border border-orange-50/50">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Stok Gudang</p>
              <p className="font-bold text-gray-900">
                {product.stock} <span className="text-[10px] font-medium text-gray-400 ml-1">Unit</span>
              </p>
            </div>
          </div>

          {/* FITUR BARU: Form Lokasi Rak Inventaris yang dikontrol oleh useRef */}
          <div className="mb-6 bg-orange-50/30 p-4 rounded-2xl border border-orange-100/40">
            <label className="text-[9px] font-black text-[#FF6B2C] uppercase tracking-widest block mb-1.5">
              Lokasi Penyimpanan Rak (Catatan CRM)
            </label>
            <input 
              ref={noteInputRef} // HOOK: Mengunci elemen DOM input ini
              type="text"
              placeholder="Belum diatur (Klik Kelola Stok di bawah)"
              value={rackLocation}
              onChange={(e) => setRackLocation(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-gray-800 focus:outline-none transition-all"
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Harga Estimasi</p>
              <p className="text-3xl font-black text-[#FF6B2C]">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
            </div>
            
            {/* Pemicu useRef saat diklik */}
            <button 
              onClick={handleManageStockClick}
              className="bg-[#FF6B2C] text-white px-8 py-4 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-orange-200 hover:bg-[#e85a1f] active:scale-95 transition-all flex items-center gap-2"
            >
              <FaFolderPlus /> Kelola Stok
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}