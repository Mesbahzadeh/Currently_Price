import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MarketSection from './components/MarketSection';
import { fetchMarketData } from './services/marketData';
import { MarketDataState } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<MarketDataState>({
    currencies: [],
    gold: [],
    crypto: [],
    loading: true,
  });

  // Initial Data Fetch
  useEffect(() => {
    const initData = async () => {
      try {
        const marketData = await fetchMarketData();
        setData({ ...marketData, loading: false });
      } catch (error) {
        console.error("Failed to fetch market data", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    initData();
    
    // Refresh interval (e.g. every 30 seconds)
    const interval = setInterval(() => {
        initData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-[Vazirmatn]">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Ticker / Summary Bar */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-6 border border-gray-100 flex items-center overflow-hidden">
           <div className="text-xs font-bold text-[#004e92] pl-4 border-l border-gray-200 ml-4 shrink-0">
             وضعیت بازار:
           </div>
           <div className="whitespace-nowrap overflow-hidden text-xs text-gray-600">
             <span className="inline-block animate-marquee">
               قیمت‌ها به تومان می‌باشد • بروزرسانی خودکار نرخ‌ها هر ۳۰ ثانیه • استفاده از دیتای لحظه‌ای صرافی‌های معتبر
             </span>
           </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Currencies */}
          <MarketSection 
            id="currency"
            title="بازار ارز (آزاد)" 
            items={data.currencies} 
            loading={data.loading}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
              </svg>
            }
          />

          {/* Column 2: Gold */}
          <MarketSection 
            id="gold"
            title="طلا و سکه" 
            items={data.gold} 
            loading={data.loading}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
              </svg>
            }
          />

          {/* Column 3: Crypto */}
          <MarketSection 
            id="crypto"
            title="ارزهای دیجیتال" 
            items={data.crypto} 
            loading={data.loading}
            icon="💳"
          />

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;