import { useState, useEffect } from 'react'; // HOOK: Import hooks yang dibutuhkan
import { Link } from 'react-router-dom';
import productsData from '../data/products.json'; // Mengubah nama import agar tidak bentrok dengan state
import PageHeader from "../components/PageHeader";
import { FaSearch, FaPlus, FaTimes } from "react-icons/fa";

export default function Products() {
  // HOOK: useState untuk menyimpan data produk dari database/JSON
  const [products, setProducts] = useState([]);
  
  // HOOK: useState untuk memegang query pencarian sparepart
  const [searchQuery, setSearchQuery] = useState("");
  
  // HOOK: useState untuk indikator loading data
  const [isLoading, setIsLoading] = useState(true);

  // FITUR BARU: State untuk membuka/tutup modal tambah produk
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FITUR BARU: State untuk menampung input produk baru
  const [newProduct, setNewProduct] = useState({
    title: "",
    code: "",
    brand: "",
    stock: "",
    category: "",
    price: "",
    image: ""
  });

  // HOOK: useEffect untuk mensimulasikan fetching data inventaris CRM BengkelGo
  useEffect(() => {
    const fetchInventory = () => {
      setTimeout(() => {
        // Mengambil dari localStorage jika ada, jika tidak pakai json data bawaan
        const savedInventory = localStorage.getItem("bengkelgo_inventory");
        if (savedInventory) {
          setProducts(JSON.parse(savedInventory));
        } else {
          setProducts(productsData);
          localStorage.setItem("bengkelgo_inventory", JSON.stringify(productsData));
        }
        setIsLoading(false);
      }, 800); // Simulasi delay loading server selama 0.8 detik
    };

    fetchInventory();
  }, []);

  // Filter produk berdasarkan apa yang diketik admin di search bar
  const filteredProducts = products.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // FITUR BARU: Handler untuk memproses submit produk baru
  const handleAddProductSubmit = (e) => {
    e.preventDefault();

    // Validasi data input sederhana
    if (!newProduct.title || !newProduct.code || !newProduct.price) {
      return alert("Mohon lengkapi Nama, Kode Item, dan Harga!");
    }

    // Buat objek produk baru terformat
    const productToAdd = {
      id: Date.now().toString(), // Generate id unik berbasis timestamp
      title: newProduct.title,
      code: newProduct.code.toUpperCase(),
      brand: newProduct.brand || "Generic",
      stock: parseInt(newProduct.stock) || 0,
      category: newProduct.category || "Lain-lain",
      price: parseFloat(newProduct.price) || 0,
      image: newProduct.image || "https://via.placeholder.com/150?text=Sparepart"
    };

    // Gabungkan ke state utama & simpan ke localStorage agar tidak hilang saat refresh
    const updatedProducts = [productToAdd, ...products];
    setProducts(updatedProducts);
    localStorage.setItem("bengkelgo_inventory", JSON.stringify(updatedProducts));

    // Reset Form Input & Tutup Modal
    setNewProduct({
      title: "",
      code: "",
      brand: "",
      stock: "",
      category: "",
      price: "",
      image: ""
    });
    setIsModalOpen(false);
    alert(`Sukses menambahkan produk baru: ${productToAdd.title}`);
  };

  return (
    <div className="bg-white min-h-screen font-jakarta selection:bg-orange-200 relative">
      <PageHeader title="Inventaris Sparepart" breadcrumb={["Dashboard", "Inventory"]} />
      
      <div className="px-10 py-6">
        
        {/* BARIS TOP CONTROL: Gabungan Search Bar dan Tombol Tambah Produk */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="max-w-md w-full relative flex items-center">
            <input 
              type="text"
              placeholder="Cari sparepart atau kode item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-5 py-3 pl-12 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/20 focus:border-[#FF6B2C] shadow-sm font-medium text-gray-800 transition-all"
            />
            <FaSearch className="absolute left-5 text-gray-400" size={14} />
          </div>

          {/* BUTTON TRIGGER MODAL TAMBAH PRODUK */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FF6B2C] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider px-5 py-3.5 rounded-2xl flex items-center gap-2 shadow-md shadow-orange-500/10 transition-all active:scale-95"
          >
            <FaPlus size={12} /> Tambah Item Baru
          </button>
        </div>

        {/* KONTAINER DATA TABEL */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse whitespace-nowrap">
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
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-100 bg-[#F8FAFC] flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                          />
                        </div>
                        <div className="flex flex-col">
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
                        <span>Rp {item.price?.toLocaleString('id-ID')}</span>
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

      {/* ==================== MODAL FORM POPUP TAMBAH PRODUK ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animated fadeIn animate-duration-200">
          <div className="bg-white w-full max-w-xl rounded-[28px] border border-gray-100 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Header Modal */}
            <div className="px-8 py-5 bg-[#F8FAFC] border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Tambah Item Sparepart Baru</h3>
                <p className="text-[11px] text-gray-400 font-medium">Masukkan spesifikasi komparasi inventaris BengkelGo CRM.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-700 p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Form Konten */}
            <form onSubmit={handleAddProductSubmit} className="p-8 space-y-4 overflow-y-auto max-h-[75vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Nama Produk */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Nama Sparepart *</label>
                  <input 
                    type="text" required
                    placeholder="Contoh: Kampas Rem Depan Vario 150"
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C]"
                  />
                </div>

                {/* Kode Item */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Kode Item *</label>
                  <input 
                    type="text" required
                    placeholder="Contoh: KMP-VR150"
                    value={newProduct.code}
                    onChange={(e) => setNewProduct({...newProduct, code: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs uppercase focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C]"
                  />
                </div>

                {/* Merk/Brand */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Merk / Pabrikan</label>
                  <input 
                    type="text"
                    placeholder="Contoh: Honda Genuine Parts"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C]"
                  />
                </div>

                {/* Kategori Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Kategori</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C]"
                  >
                    <option value="">-- Pilih Kategori --</option>
                    <option value="Oli & Pelumas">Oli & Pelumas</option>
                    <option value="Sistem Pengereman">Sistem Pengereman</option>
                    <option value="Mesin & Transmisi">Mesin & Transmisi</option>
                    <option value="Kelistrikan & Aki">Kelistrikan & Aki</option>
                    <option value="Aksesoris & Ban">Aksesoris & Ban</option>
                    <option value="Lain-lain">Lain-lain</option>
                  </select>
                </div>

                {/* Stok Kuantitas */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Jumlah Stok awal</label>
                  <input 
                    type="number" min="0"
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C]"
                  />
                </div>

                {/* Harga Satuan */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">Harga Jual Satuan (Rp) *</label>
                  <input 
                    type="number" min="0" required
                    placeholder="Contoh: 65000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C]"
                  />
                </div>

                {/* URL Link Gambar */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">URL Link Gambar Thumbnail</label>
                  <input 
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl font-bold text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6B2C]/10 focus:border-[#FF6B2C]"
                  />
                </div>

              </div>

              {/* Baris Tombol Aksi */}
              <div className="pt-4 flex gap-3 border-t border-gray-50">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-[#FF6B2C] hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md shadow-orange-500/10 transition-colors"
                >
                  Simpan ke Gudang
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}