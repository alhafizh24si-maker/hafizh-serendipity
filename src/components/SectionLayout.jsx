export default function SectionLayout({ children }) {
  return (
    <div className="px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {children}
    </div>
  );
}