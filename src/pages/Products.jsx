import { useState, useEffect } from 'react'; // HOOK: Import hooks yang dibutuhkan
import { Link } from 'react-router-dom';
import productsData from '../data/products.json'; // Mengubah nama import agar tidak bentrok dengan state
import PageHeader from "../components/PageHeader";
import { FaSearch } from "react-icons/fa";

export default function Products() {
  // HOOK: useState untuk menyimpan data produk dari database/JSON
  const [products, setProducts] = useState([]);
  
  // HOOK: useState untuk memegang query pencarian sparepart
  const [searchQuery, setSearchQuery] = useState("");
  
  // HOOK: useState untuk indikator loading data
  const [isLoading, setIsLoading] = useState(true);

  // HOOK: useEffect untuk mensimulasikan fetching data inventaris CRM BengkelGo
  useEffect(() => {
    const fetchInventory = () => {
      setTimeout(() => {
        setProducts(productsData);
        setIsLoading(false);
      }, 800); // Simulasi delay loading server selama 0.8 detik
    };

    fetchInventory();
  }, []); // [] Menjamin pengambilan data hanya dipicu 1x di awal

  // Filter produk berdasarkan apa yang diketik admin di search bar
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#FDF8F4] min-h-screen">
      <PageHeader title="Inventaris Sparepart" breadcrumb={["Dashboard", "Inventory"]} />
      
      <div className="px-10 py-4">
        {/* FITUR BARU: Search Bar memanfaatkan useState */}
        <div className="max-w-md mb-6 relative flex items-center">
          <input 
            type="text"
            placeholder="Cari sparepart atau kode item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Mengubah state query setiap ada ketikan
            className="w-full bg-white border border-orange-100 rounded-2xl px-5 py-3 pl-12 text-sm focus:outline-none focus:border-[#FF6B2C] shadow-sm font-medium text-gray-800"
          />
          <FaSearch className="absolute left-5 text-gray-300" size={14} />
        </div>

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
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-8 py-10 text-center text-sm text-gray-400 italic">
                    Menghubungkan ke gudang database BengkelGo...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-10 text-center text-sm text-gray-400 italic">
                    Sparepart tidak ditemukan atau belum terdaftar.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-orange-50/20 transition-all duration-300 group">
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

                    <td className="px-8 py-5 text-center">
                      <span className={`text-xs font-bold ${item.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                        {item.stock} <span className="text-[10px] font-medium text-gray-400">Pcs</span>
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <span className="bg-orange-50 text-[#FF6B2C] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border border-orange-100">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-8 py-5 text-right font-black text-gray-900">
                      <div className="flex flex-col items-end">
                        <span>Rp {item.price.toLocaleString('id-ID')}</span>
                        <span className="text-[8px] text-gray-400 font-medium">Inc. PPN 11%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}