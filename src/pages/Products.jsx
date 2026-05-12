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
          <table className="w-full text-left">
            <thead className="bg-[#FDF8F4]/50 border-b border-orange-50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Bengkel</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kategori</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Harga Satuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50/50">
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-orange-50/20 transition-colors group">
                  <td className="px-8 py-5">
                    <Link to={`/products/${item.id}`} className="font-bold text-gray-900 group-hover:text-[#FF6B2C] transition-colors">
                      {item.title}
                    </Link>
                    <p className="text-[9px] font-black text-gray-300 uppercase mt-1">{item.code}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-orange-50 text-[#FF6B2C] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-gray-900">
                    Rp {item.price.toLocaleString('id-ID')}
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