export default function ButtonSolid({ children, onClick, className = "" }) {
  return (
    <button 
      onClick={onClick}
      className={`text-[10px] font-black text-orange-600 bg-orange-100 hover:bg-orange-200 uppercase tracking-widest px-4 py-2 rounded-xl transition-colors ${className}`}
    >
      {children}
    </button>
  );
}