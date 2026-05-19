export default function CRMCard({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}