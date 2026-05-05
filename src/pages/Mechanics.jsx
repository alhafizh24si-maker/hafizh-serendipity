import { FaPlus, FaPhone, FaTools, FaStar } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Mechanics() {
  const mechanics = [
    { id: 1, name: "Agus Setiawan", skill: "Mesin Mobil", status: "Tersedia", rating: 4.9, jobs: 124 },
    { id: 2, name: "Budi Santoso", skill: "Kelistrikan", status: "Sibuk", rating: 4.8, jobs: 89 },
    { id: 3, name: "Heri Cahyono", skill: "Body Repair", status: "Tersedia", rating: 4.7, jobs: 210 },
  ];

  return (
    <div className="pb-10 bg-gray-50 min-h-screen">
      <PageHeader title="Mekanik" breadcrumb={["Dashboard", "Mechanics"]}>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition">
          <FaPlus size={14} /> Tambah Mekanik
        </button>
      </PageHeader>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mechanics.map((m) => (
          <div key={m.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{m.name}</h3>
                  <p className="text-xs text-gray-400 font-medium">{m.skill}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${m.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                {m.status}
              </span>
            </div>
            <div className="flex justify-between border-t pt-4 border-gray-50 text-sm">
              <div className="flex items-center gap-1 text-yellow-500"><FaStar /> <span>{m.rating}</span></div>
              <div className="text-gray-400"><b>{m.jobs}</b> Selesai</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}