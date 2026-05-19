import CRMCard from "./CRMCard";

export default function RevenueChartSection({ children, totalRevenue }) {
  return (
    <CRMCard className="lg:col-span-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TOTAL REVENUE</span>
          <h3 className="text-2xl font-black text-gray-900 mt-1">{totalRevenue}</h3>
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0 text-xs text-gray-500 font-medium">
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>Income</span>
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-black mr-2"></span>Expense</span>
        </div>
      </div>
      <div className="w-full h-64">
        {children} {/* Tempat meletakkan <ResponsiveContainer> & <AreaChart> */}
      </div>
    </CRMCard>
  );
}