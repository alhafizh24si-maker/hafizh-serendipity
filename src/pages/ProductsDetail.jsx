import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";
import { FaArrowLeft, FaBox, FaTag, FaTools } from "react-icons/fa";

export default function ProductsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mencari data dari file lokal agar tidak undefined
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF8F4]">
      <p className="text-gray-400 font-bold mb-4">Item tidak ditemukan</p>
      <button onClick={() => navigate(-1)} className="text-[#FF6B2C] font-black uppercase text-xs tracking-widest">Kembali</button>
    </div>
  );

  return (
    <div className="bg-[#FDF8F4] min-h-screen p-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B2C] mb-8 transition-all group">
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
        <span className="text-xs font-black uppercase tracking-widest">Kembali ke Inventaris</span>
      </button>

      <div className="max-w-4xl bg-white rounded-[3rem] border border-orange-100/50 shadow-xl shadow-orange-100/20 overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-2/5 bg-gradient-to-br from-orange-50 to-white p-12 flex items-center justify-center">
          <div className="w-full aspect-square bg-white rounded-[2rem] shadow-inner flex items-center justify-center">
            <FaTools size={60} className="text-orange-100" />
          </div>
        </div>

        <div className="md:w-3/5 p-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-orange-50 text-[#FF6B2C] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
              {product.category}
            </span>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{product.code}</span>
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">{product.title}</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">{product.description}</p>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-[#FDF8F4] p-5 rounded-2xl border border-orange-50">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Brand</p>
              <p className="font-bold text-gray-900">{product.brand}</p>
            </div>
            <div className="bg-[#FDF8F4] p-5 rounded-2xl border border-orange-50">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Stok Gudang</p>
              <p className="font-bold text-gray-900">{product.stock} <span className="text-[10px] font-medium text-gray-400">Unit</span></p>
            </div>
          </div>

          <div className="pt-8 border-t border-orange-50 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Harga Estimasi</p>
              <p className="text-3xl font-black text-[#FF6B2C]">Rp {product.price.toLocaleString('id-ID')}</p>
            </div>
            <button className="bg-[#FF6B2C] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-orange-200 active:scale-95 transition-all">
              Kelola Stok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}