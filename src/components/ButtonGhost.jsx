export default function ButtonGhost({ children, onClick, className = "" }) {
  return (
    <button 
      onClick={onClick}
      className={`mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 text-[10px] font-bold hover:bg-gray-50 transition-colors uppercase tracking-widest ${className}`}
    >
      {children}
    </button>
  );
}