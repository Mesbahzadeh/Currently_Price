import React from 'react';
import { MarketItem, MarketType } from '../types';

interface MarketSectionProps {
  title: string;
  items: MarketItem[];
  icon: React.ReactNode;
  id?: string;
  loading?: boolean;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('fa-IR');
};

const MarketSection: React.FC<MarketSectionProps> = ({ title, items, icon, id, loading }) => {
  return (
    <div id={id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-800 font-bold">
          <span className="text-[#004e92]">{icon}</span>
          <h2>{title}</h2>
        </div>
        <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500">بروزرسانی لحظه‌ای</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 font-medium">عنوان</th>
              <th className="px-4 py-3 font-medium text-left">قیمت (تومان)</th>
              <th className="px-4 py-3 font-medium text-center">تغییر (۲۴س)</th>
              <th className="px-4 py-3 font-medium text-left hidden sm:table-cell">زمان</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
               [1,2,3,4,5].map(i => (
                 <tr key={i} className="animate-pulse">
                   <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                   <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-16 mr-auto"></div></td>
                   <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div></td>
                   <td className="px-4 py-3 hidden sm:table-cell"><div className="h-4 bg-gray-200 rounded w-10 mr-auto"></div></td>
                 </tr>
               ))
            ) : (
              items.map((item) => {
                const isPositive = item.changePercent >= 0;
                // Check if icon is emoji or URL
                const isEmoji = item.icon && !item.icon.startsWith('http');
                
                return (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                         {item.icon && (
                           isEmoji ? (
                             <span className="text-xl">{item.icon}</span>
                           ) : (
                             <img src={item.icon} alt={item.symbol} className="w-5 h-5 rounded-full" onError={(e) => {
                               (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDE4LjVDMTQuNjQyMiAxOC41IDE4LjUgMTQuNjQyMiAxOC41IDEwQzE4LjUgNS4zNTc4NiAxNC42NDIyIDEuNSAxMCAxLjVDNS4zNTc4NiAxLjUgMS41IDUuMzU3ODYgMS41IDEwQzEuNSAxNC42NDIyIDUuMzU3ODYgMTguNSAxMCAxOC41WiIgc3Ryb2tlPSIjMDA0ZTkyIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNNy4yNSA3LjVMMTIuNzUgMTIuNSIgc3Ryb2tlPSIjMDA0ZTkyIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNMTIuNzUgNy41TDcuMjUgMTIuNSIgc3Ryb2tlPSIjMDA0ZTkyIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8L3N2Zz4K';
                             }} />
                           )
                         )}
                         <div className="flex flex-col">
                           <span className="text-sm font-bold text-gray-700 group-hover:text-[#004e92]">{item.title}</span>
                           <span className="text-[10px] text-gray-400 font-sans">{item.symbol}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-left">
                      <span className="text-sm font-bold text-gray-800 tracking-tight">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-[10px] text-gray-400 mr-1">تومان</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium dir-ltr ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        <span dir="ltr">{Math.abs(item.changePercent).toFixed(2)}%</span>
                        <span className="text-[10px]">{isPositive ? '▲' : '▼'}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-left hidden sm:table-cell">
                      <span className="text-xs text-gray-400">{item.updatedAt}</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketSection;