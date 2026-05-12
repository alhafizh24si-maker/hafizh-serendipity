import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json'; 
import PageHeader from "../components/PageHeader";

export default function Products() {
  return (
    <div className="bg-[#FDF8F4] min-h-screen">
      <PageHeader title="Inventaris Sparepart" breadcrumb={["Dashboard", "Inventory"]} />
      
      <div className="px-10 py-4">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-orange-100/50 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FDF8F4]/50 border-b border-orange-50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Bengkel</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Stok</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kategori</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Harga Satuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50/50">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-orange-50/20 transition-all duration-300 group">
                  {/* Kolom Produk & Gambar */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-orange-100 bg-gray-50 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <Link to={`/products/${item.id}`} className="font-bold text-gray-900 group-hover:text-[#FF6B2C] transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-black text-gray-300 uppercase">{item.code}</span>
                          <span className="text-[9px] font-bold text-gray-400">•</span>
                          <span className="text-[10px] text-gray-500 italic font-medium line-clamp-1">{item.brand}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Kolom Stok */}
                  <td className="px-8 py-5 text-center">
                    <span className={`text-xs font-bold ${item.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                      {item.stock} <span className="text-[10px] font-medium text-gray-400">Pcs</span>
                    </span>
                  </td>

                  {/* Kolom Kategori */}
                  <td className="px-8 py-5">
                    <span className="bg-orange-50 text-[#FF6B2C] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border border-orange-100">
                      {item.category}
                    </span>
                  </td>

                  {/* Kolom Harga */}
                  <td className="px-8 py-5 text-right font-black text-gray-900">
                    <div className="flex flex-col items-end">
                      <span>Rp {item.price.toLocaleString('id-ID')}</span>
                      <span className="text-[8px] text-gray-400 font-medium">Inc. PPN 11%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}