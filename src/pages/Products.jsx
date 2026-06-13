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
    /* 🟢 REVISI LATAR BELAKANG UTAMA: Diubah menjadi bg-white bersih sesuai permintaan */
    <div className="bg-white min-h-screen font-jakarta selection:bg-orange-200">
      <PageHeader title="Inventaris Sparepart" breadcrumb={["Dashboard", "Inventory"]} />
      
      <div className="px-10 py-6">
        {/* FITUR SEARCH BAR: Tetap interaktif memicu re-render pengetikan */}
        <div className="max-w-md mb-6 relative flex items-center">
          <input 
            type="text"
            placeholder="Cari sparepart atau kode item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Mengubah state query setiap ada ketikan
            className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-5 py-3 pl-12 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] shadow-sm font-medium text-gray-800 transition-all"
          />
          <FaSearch className="absolute left-5 text-gray-400" size={14} />
        </div>

        {/* 🟢 KONTAINER DATA TABEL: Dibuat kontras bersih dengan border halus abu-abu modern */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            {/* Header tabel disesuaikan dengan skema warna netral */}
            <thead className="bg-[#F8FAFC] border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Item Bengkel</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-wider text-center">Stok</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Kategori</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-wider text-right">Harga Satuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-8 py-12 text-center text-sm text-gray-400 italic bg-white">
                    Menghubungkan ke gudang database BengkelGo...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-12 text-center text-sm text-gray-400 italic bg-white">
                    Sparepart tidak ditemukan atau belum terdaftar.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F8FAFC]/60 transition group bg-white">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        {/* Frame thumbnail gambar produk */}
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-100 bg-[#F8FAFC] flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                          />
                        </div>
                        <div className="flex flex-col">
                          {/* Komponen Link Router internal */}
                          <Link to={`/products/${item.id}`} className="font-bold text-gray-800 group-hover:text-[#FF6B2C] transition-colors line-clamp-1 text-sm">
                            {item.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider">{item.code}</span>
                            <span className="text-[9px] font-bold text-gray-300">•</span>
                            <span className="text-[10px] text-gray-400 italic font-medium line-clamp-1">{item.brand}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5 text-center">
                      <span className={`text-xs font-bold ${item.stock < 10 ? 'text-rose-500 font-black' : 'text-gray-600'}`}>
                        {item.stock} <span className="text-[10px] font-medium text-gray-400">Pcs</span>
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <span className="bg-orange-50 text-[#FF6B2C] text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider border border-orange-200/30">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-8 py-5 text-right font-black text-gray-800 text-sm">
                      <div className="flex flex-col items-end">
                        <span>Rp {item.price.toLocaleString('id-ID')}</span>
                        <span className="text-[8px] text-gray-400 font-medium tracking-wide mt-0.5">Inc. PPN 11%</span>
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