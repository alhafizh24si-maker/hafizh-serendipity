import CRMCard from "./CRMCard";

export default function TopCategoriesSection({ children }) {
  return (
    <CRMCard>
      <h3 className="font-black text-gray-800 text-sm tracking-tight mb-4">Top Categories</h3>
      <div className="w-full h-52 flex items-center justify-center">
        {children} {/* Tempat meletakkan <PieChart> Donut */}
      </div>
    </CRMCard>
  );
}