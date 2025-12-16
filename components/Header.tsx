import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#004e92] to-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">نرخ روز</h1>
            <p className="text-[10px] text-gray-500 hidden sm:block">مرجع قیمت‌های لحظه‌ای بازار</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-[#004e92] transition-colors py-2 border-b-2 border-transparent hover:border-[#004e92]">خانه</a>
          <a href="#currency" className="hover:text-[#004e92] transition-colors py-2 border-b-2 border-transparent hover:border-[#004e92]">ارز</a>
          <a href="#gold" className="hover:text-[#004e92] transition-colors py-2 border-b-2 border-transparent hover:border-[#004e92]">طلا و سکه</a>
          <a href="#crypto" className="hover:text-[#004e92] transition-colors py-2 border-b-2 border-transparent hover:border-[#004e92]">ارز دیجیتال</a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
           <button className="bg-[#f0f4f8] text-[#004e92] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#e1e8f0] transition-colors">
             ورود / عضویت
           </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="منو"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4 shadow-lg absolute w-full left-0">
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            <a href="#" className="py-2 border-b border-gray-50">خانه</a>
            <a href="#currency" className="py-2 border-b border-gray-50">ارز</a>
            <a href="#gold" className="py-2 border-b border-gray-50">طلا و سکه</a>
            <a href="#crypto" className="py-2 border-b border-gray-50">ارز دیجیتال</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;