export default function CRMContainer({ children, className = "" }) {
  return (
    <div id="dashboard-container" className={`pb-10 bg-[#FDF8F4] min-h-screen font-sans selection:bg-orange-200 ${className}`}>
      {children}
    </div>
  );
}