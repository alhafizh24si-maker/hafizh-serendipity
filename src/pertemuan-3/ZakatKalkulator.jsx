import { useState, useEffect } from "react";

// --- 1. REUSABLE COMPONENT (Taruh di dalam file yang sama agar tidak error) ---
const InputGroup = ({ label, error, type = "text", options = [], ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-bold text-gray-700 ml-1">
        {label}
      </label>
      
      {type === "select" ? (
        <select
          {...props}
          className={`w-full p-3 bg-white border rounded-2xl text-sm transition-all outline-none focus:ring-2 focus:ring-gray-900 ${
            error ? "border-red-500 ring-1 ring-red-500" : "border-gray-200 shadow-sm"
          }`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...props}
          className={`w-full p-3 bg-white border rounded-2xl text-sm transition-all outline-none focus:ring-2 focus:ring-gray-900 ${
            error ? "border-red-500 ring-1 ring-red-500" : "border-gray-200 shadow-sm"
          }`}
        />
      )}

      {error && (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 rounded-xl text-[10px] font-bold text-red-600">
          <span>⚠️</span> {error}
        </div>
      )}
    </div>
  );
};

// --- 2. KOMPONEN UTAMA ---
export default function ZakatKalkulator() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    totalHarta: "",
    jenisHarta: "",
    periode: "",
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const validate = () => {
    let err = {};
    if (!formData.nama) err.nama = "Nama wajib diisi";
    else if (formData.nama.length < 3) err.nama = "Nama terlalu pendek";
    else if (/\d/.test(formData.nama)) err.nama = "Nama tidak boleh mengandung angka";

    if (!formData.email) err.email = "Email wajib diisi";
    else if (!formData.email.includes("@")) err.email = "Format email salah";

    if (!formData.totalHarta) err.totalHarta = "Masukkan nominal harta";
    else if (formData.totalHarta < 100000) err.totalHarta = "Minimal Rp 100.000";

    if (!formData.jenisHarta) err.jenisHarta = "Pilih jenis harta";
    if (!formData.periode) err.periode = "Pilih periode";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  useEffect(() => {
    validate();
    setResult(null);
  }, [formData]);

  const isValid = Object.keys(errors).length === 0 && Object.values(formData).every(v => v !== "");

  const handleCalculate = () => {
    const zakatValue = formData.totalHarta * 0.025;
    setResult({
      zakat: zakatValue,
      nama: formData.nama,
      harta: formData.totalHarta
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 font-sans bg-gray-50 min-h-screen text-left">
      {/* Header */}
      <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl">
        <h1 className="text-2xl font-black">ZakatYuk!</h1>
        <p className="text-gray-400 text-xs">Hitung zakat 2.5% kamu secara instan.</p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
        <InputGroup
          label="Nama Lengkap"
          placeholder="Masukkan nama..."
          value={formData.nama}
          error={errors.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
        />

        <InputGroup
          label="Email"
          type="email"
          placeholder="user@mail.com"
          value={formData.email}
          error={errors.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <InputGroup
          label="Nominal Harta (Rp)"
          type="number"
          placeholder="Contoh: 10000000"
          value={formData.totalHarta}
          error={errors.totalHarta}
          onChange={(e) => setFormData({ ...formData, totalHarta: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="Jenis"
            type="select"
            value={formData.jenisHarta}
            error={errors.jenisHarta}
            options={[
              { label: "Pilih...", value: "" },
              { label: "Tabungan", value: "tabungan" },
              { label: "Emas", value: "emas" },
            ]}
            onChange={(e) => setFormData({ ...formData, jenisHarta: e.target.value })}
          />
          <InputGroup
            label="Periode"
            type="select"
            value={formData.periode}
            error={errors.periode}
            options={[
              { label: "Pilih...", value: "" },
              { label: "Bulanan", value: "bulan" },
              { label: "Tahunan", value: "tahun" },
            ]}
            onChange={(e) => setFormData({ ...formData, periode: e.target.value })}
          />
        </div>

        {/* Tombol Submit (Conditional Rendering) */}
        {isValid && (
          <button
            onClick={handleCalculate}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-gray-800 transition-all shadow-lg"
          >
            HITUNG ZAKAT
          </button>
        )}
      </div>

      {/* Hasil (Conditional Rendering) */}
      {result && (
        <div className="bg-emerald-50 border border-green-200 rounded-3xl p-6 animate-pulse">
          <h3 className="font-bold text-gray-800">Hasil untuk {result.nama}:</h3>
          <p className="text-3xl font-black text-emerald-600 mt-1">
            Rp {result.zakat.toLocaleString('id-ID')}
          </p>
          <p className="text-[10px] text-gray-500 mt-2">Berdasarkan harta Rp {Number(result.harta).toLocaleString('id-ID')}</p>
        </div>
      )}
    </div>
  );
}