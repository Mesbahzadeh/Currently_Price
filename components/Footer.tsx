import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1e293b] text-gray-300 py-10 mt-12 border-t-4 border-[#004e92]">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 border-r-4 border-[#004e92] pr-3">درباره نرخ روز</h3>
            <p className="text-sm leading-7 text-gray-400 text-justify">
              نرخ روز، با بهره‌گیری از هوش مصنوعی و داده‌های لحظه‌ای، دقیق‌ترین ابزار رصد بازار سرمایه ایران است. ما تلاش می‌کنیم شفافیت را به بازار برگردانیم تا شما بهترین تصمیمات مالی را بگیرید.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 border-r-4 border-[#004e92] pr-3">لینک‌های مفید</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="https://mesbahzadeh.github.io/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="text-blue-500">›</span> وب‌سایت شخصی مهندس مصباح‌زاده
                </a>
              </li>
              <li>
                <a href="https://mesbahzadeh.pythonanywhere.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="text-blue-500">›</span> وب‌سایت موسسه آموزشی
                </a>
              </li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-blue-500">›</span> قوانین و مقررات</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 border-r-4 border-[#004e92] pr-3">عضویت در خبرنامه</h3>
            <div className="flex gap-2">
              <input type="email" placeholder="ایمیل خود را وارد کنید..." className="bg-gray-700/50 border border-gray-600 text-white px-3 py-2 rounded text-sm w-full focus:outline-none focus:border-blue-500 transition-colors" />
              <button className="bg-[#004e92] hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors shadow-lg shadow-blue-900/50">
                ثبت
              </button>
            </div>
          </div>
        </div>
        
        {/* Developer Credit Section */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 order-2 md:order-1">
             © ۱۴۰۳ تمامی حقوق مادی و معنوی برای وب‌سایت نرخ روز محفوظ است.
          </p>
          
          {/* Profile Card */}
          <div className="flex items-center gap-3 order-1 md:order-2 bg-gray-800/50 p-2 pr-3 rounded-xl border border-white/5 hover:bg-gray-800 transition-colors group shadow-md">
             <img 
               src="https://mesbahzadeh.pythonanywhere.com/staticfiles/media/teachers/profile/mehran.jpg" 
               alt="Mehran Mesbah Zadeh" 
               className="w-12 h-12 rounded-full border-2 border-[#004e92] group-hover:scale-105 transition-transform object-cover shadow-sm"
               onError={(e) => {
                 // Fallback if image fails
                 (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Mehran+Mesbah&background=004e92&color=fff';
               }}
             />
             <div className="flex flex-col">
               <span className="text-[10px] text-gray-400 mb-0.5">طراحی و توسعه توسط برنامه نویس:</span>
               <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                 <a href="https://mesbahzadeh.github.io/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-blue-400 transition-colors">
                   مهران مصباح زاده
                 </a>
                 <span className="hidden sm:inline text-gray-600 text-xs">|</span>
                 <a href="https://mesbahzadeh.pythonanywhere.com/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-300 hover:text-blue-100 transition-colors bg-blue-900/30 px-2 py-0.5 rounded-md">
                   مشاهده موسسه
                 </a>
               </div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;