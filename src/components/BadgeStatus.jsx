export default function BadgeStatus({ children, status = "process" }) {
  const styles = {
    process: "bg-orange-100 text-orange-600",
    success: "bg-green-100 text-green-600",
    danger: "bg-red-100 text-red-600"
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${styles[status]}`}>
      {children}
    </span>
  );
}