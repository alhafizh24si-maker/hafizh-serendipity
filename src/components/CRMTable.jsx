export default function CRMTable({ headers, children }) {
  return (
    <div className="overflow-x-auto w-full mt-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            {headers.map((header, index) => (
              <th key={index} className="pb-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
          {children}
        </tbody>
      </table>
    </div>
  );
}