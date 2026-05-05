import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

export default function PageHeader({ title, breadcrumb, children }) {
  // Fungsi untuk menangani breadcrumb dengan gaya BengkelGo
  const renderBreadcrumb = () => {
    if (Array.isArray(breadcrumb)) {
      return breadcrumb.map((item, index) => (
        <React.Fragment key={index}>
          <span 
            className={`transition-colors duration-200 ${
              index === breadcrumb.length - 1 
                ? 'text-gray-400 font-normal' 
                : 'text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer'
            }`}
          >
            {item}
          </span>
          {index < breadcrumb.length - 1 && (
            <FaChevronRight className="text-[10px] text-gray-300 mx-2" />
          )}
        </React.Fragment>
      ));
    }
    // Jika breadcrumb hanya string (misal: "Welcome back, Admin")
    return <span className="text-gray-400 font-medium tracking-wide">{breadcrumb}</span>;
  };

  return (
    <div 
      id="pageheader-container" 
      className="flex flex-col md:flex-row items-start md:items-center justify-between p-8 bg-transparent gap-4"
    >
      <div id="pageheader-left" className="flex flex-col">
        {/* Title Dinamis dengan aksen Border Kiri untuk kesan tegas */}
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-8 bg-blue-900 rounded-full"></div>
          <h1 id="page-title" className="text-3xl font-extrabold text-blue-900 tracking-tight">
            {title}
          </h1>
        </div>

        {/* Breadcrumb Dinamis */}
        <div id="breadcrumb-links" className="flex items-center text-sm mt-2 ml-4">
          {renderBreadcrumb()}
        </div>
      </div>

      {/* Action Buttons (Tempat Tombol Add Order / Filter) */}
      <div 
        id="pageheader-actions" 
        className="flex items-center space-x-3 w-full md:w-auto"
      >
        {children}
      </div>
    </div>
  );
}