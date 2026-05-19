import CRMCard from "./CRMCard";

export default function ReviewCard({ name, rating, comment }) {
  return (
    <CRMCard className="mb-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-gray-800 text-sm">{name}</h4>
        <span className="text-yellow-500 font-bold text-xs">⭐ {rating}</span>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{comment}</p>
    </CRMCard>
  );
}