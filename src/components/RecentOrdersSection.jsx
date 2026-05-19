import CRMCard from "./CRMCard";
import ButtonSolid from "./ButtonSolid";

export default function RecentOrdersSection({ children, onSeeAll }) {
  return (
    <CRMCard className="lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-gray-900 tracking-tight text-base">Recent Orders</h3>
        <ButtonSolid onClick={onSeeAll}>See All</ButtonSolid>
      </div>
      {children} {/* Tempat meletakkan <CRMTable> */}
    </CRMCard>
  );
}