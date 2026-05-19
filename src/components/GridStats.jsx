export default function GridStats({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 pt-6">
      {children}
    </div>
  );
}