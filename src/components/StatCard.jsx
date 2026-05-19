import CRMCard from "./CRMCard";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <CRMCard className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</span>
        <span className="text-2xl font-black text-gray-900 tracking-tight">{value}</span>
      </div>
      {Icon && (
        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
          <Icon className="text-orange-500 text-lg" />
        </div>
      )}
    </CRMCard>
  );
}