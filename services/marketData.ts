import { MarketItem, MarketType } from '../types';

// Helper to format time
const getTime = () => new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

// API Key
const API_KEY = 'FreeheGepIWzyj5iptdqvbEkyzAsBiT5';

// Base URLs
const GOLD_CURRENCY_API = 'https://BrsApi.ir/Api/Market/Gold_Currency.php';

// Fetch all market data from BrsApi
export const fetchMarketData = async (): Promise<{ currencies: MarketItem[], gold: MarketItem[], crypto: MarketItem[] }> => {
  try {
    console.log('Fetching data from BrsApi...');
    
    // Fetch all market data from single API
    const response = await fetch(`${GOLD_CURRENCY_API}?key=${API_KEY}`);
    const responseText = await response.text();
    console.log('API Response:', responseText);
    
    let apiData;
    try {
      apiData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      apiData = { gold: [], currency: [], cryptocurrency: [] };
    }

    // Initialize arrays
    const currencies: MarketItem[] = [];
    const gold: MarketItem[] = [];
    const crypto: MarketItem[] = [];

    // Process currency data
    if (apiData.currency && Array.isArray(apiData.currency)) {
      console.log('Processing currency data...', apiData.currency.length, 'items');
      
      apiData.currency.forEach((item: any) => {
        let icon = '💵'; // default icon
        
        // Set appropriate icon based on symbol
        switch(item.symbol) {
          case 'USD': icon = '💵'; break;
          case 'EUR': icon = '💶'; break;
          case 'GBP': icon = '💷'; break;
          case 'AED': icon = '🇦🇪'; break;
          case 'TRY': icon = '🇹🇷'; break;
          case 'JPY': icon = '🇯🇵'; break;
          case 'KWD': icon = '🇰🇼'; break;
          case 'AUD': icon = '🇦🇺'; break;
          case 'CAD': icon = '🇨🇦'; break;
          case 'CNY': icon = '🇨🇳'; break;
          case 'SAR': icon = '🇸🇦'; break;
          case 'CHF': icon = '🇨🇭'; break;
          case 'INR': icon = '🇮🇳'; break;
          case 'PKR': icon = '🇵🇰'; break;
          case 'IQD': icon = '🇮🇶'; break;
          case 'RUB': icon = '🇷🇺'; break;
          case 'AZN': icon = '🇦🇿'; break;
          case 'GEL': icon = '🇬🇪'; break;
          default: icon = '💵';
        }
        
        // Skip USDT_IRT as it's a crypto
        if (item.symbol === 'USDT_IRT') return;
        
        currencies.push({
          id: item.symbol.toLowerCase(),
          title: item.name,
          symbol: item.symbol,
          price: item.price,
          changePercent: item.change_percent,
          type: MarketType.FIAT,
          updatedAt: item.time,
          icon: icon
        });
      });
    }

    // Process gold data
    if (apiData.gold && Array.isArray(apiData.gold)) {
      console.log('Processing gold data...', apiData.gold.length, 'items');
      
      apiData.gold.forEach((item: any) => {
        let icon = '🪙'; // default icon
        
        // Set appropriate icon based on symbol
        if (item.symbol.includes('COIN')) {
          if (item.symbol.includes('QUARTER')) icon = '¼🪙';
          else if (item.symbol.includes('HALF')) icon = '½🪙';
          else if (item.symbol.includes('1G')) icon = '🪙';
          else icon = '🪙';
        } else if (item.symbol.includes('GOLD')) {
          icon = '🥇';
        } else if (item.symbol === 'XAUUSD') {
          icon = '🥇';
        }
        
        gold.push({
          id: item.symbol.toLowerCase(),
          title: item.name,
          symbol: item.symbol,
          price: item.price,
          changePercent: item.change_percent,
          type: MarketType.GOLD,
          updatedAt: item.time,
          icon: icon
        });
      });
    }

    // Process cryptocurrency data
    if (apiData.cryptocurrency && Array.isArray(apiData.cryptocurrency)) {
      console.log('Processing cryptocurrency data...', apiData.cryptocurrency.length, 'items');
      
      const cryptoIcons: {[key: string]: string} = {
        'BTC': 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
        'ETH': 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
        'USDT': 'https://coin-images.coingecko.com/coins/images/325/large/tether.png',
        'XRP': 'https://coin-images.coingecko.com/coins/images/44/large/xrp.png',
        'BNB': 'https://coin-images.coingecko.com/coins/images/825/large/bnb.png',
        'SOL': 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
        'USDC': 'https://coin-images.coingecko.com/coins/images/6319/large/usdc.png',
        'TRX': 'https://coin-images.coingecko.com/coins/images/1094/large/tron.png',
        'DOGE': 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png',
        'ADA': 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png',
        'LINK': 'https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
        'XLM': 'https://coin-images.coingecko.com/coins/images/100/large/stellar.png',
        'AVAX': 'https://coin-images.coingecko.com/coins/images/12559/large/avax.png',
        'SHIB': 'https://coin-images.coingecko.com/coins/images/11939/large/shiba.png',
        'LTC': 'https://coin-images.coingecko.com/coins/images/2/large/litecoin.png',
        'DOT': 'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png',
        'UNI': 'https://coin-images.coingecko.com/coins/images/12504/large/uniswap.png',
        'ATOM': 'https://coin-images.coingecko.com/coins/images/1481/large/cosmos_hub.png',
        'FIL': 'https://coin-images.coingecko.com/coins/images/12817/large/filecoin.png'
      };
      
      apiData.cryptocurrency.forEach((item: any) => {
        const icon = cryptoIcons[item.symbol] || 'https://assets.coingecko.com/coins/images/1/thumb.png';
        
        crypto.push({
          id: item.symbol.toLowerCase(),
          title: item.name,
          symbol: item.symbol,
          price: parseFloat(item.price),
          changePercent: item.change_percent,
          type: MarketType.CRYPTO,
          updatedAt: item.time,
          icon: icon
        });
      });
    }

    // Add USDT_IRT to currencies if exists
    const usdtIrt = apiData.currency?.find((item: any) => item.symbol === 'USDT_IRT');
    if (usdtIrt) {
      currencies.push({
        id: 'usdt_irt',
        title: 'تتر (تومان)',
        symbol: 'USDT',
        price: usdtIrt.price,
        changePercent: usdtIrt.change_percent,
        type: MarketType.CRYPTO,
        updatedAt: usdtIrt.time,
        icon: 'https://assets.coingecko.com/coins/images/325/thumb.png'
      });
    }

    // If no data was fetched from API, use fallback
    if (currencies.length === 0) {
      console.log('Using fallback for currencies...');
      currencies.push(
        { id: 'usd', title: 'دلار آمریکا', symbol: 'USD', price: 130360, changePercent: 0.52, type: MarketType.FIAT, updatedAt: getTime(), icon: '💵' },
        { id: 'eur', title: 'یورو اروپا', symbol: 'EUR', price: 153380, changePercent: 0.72, type: MarketType.FIAT, updatedAt: getTime(), icon: '💶' },
        { id: 'gbp', title: 'پوند انگلیس', symbol: 'GBP', price: 174600, changePercent: 0.7, type: MarketType.FIAT, updatedAt: getTime(), icon: '💷' },
        { id: 'aed', title: 'درهم امارات', symbol: 'AED', price: 35507, changePercent: 0.54, type: MarketType.FIAT, updatedAt: getTime(), icon: '🇦🇪' },
        { id: 'try', title: 'لیر ترکیه', symbol: 'TRY', price: 3050, changePercent: 0.33, type: MarketType.FIAT, updatedAt: getTime(), icon: '🇹🇷' }
      );
    }

    if (gold.length === 0) {
      console.log('Using fallback for gold...');
      gold.push(
        { id: 'ir_coin_emami', title: 'سکه امامی', symbol: 'Coin', price: 141795000, changePercent: 0.56, type: MarketType.GOLD, updatedAt: getTime(), icon: '🪙' },
        { id: 'ir_coin_bahar', title: 'سکه بهار آزادی', symbol: 'Coin', price: 136570000, changePercent: 1.93, type: MarketType.GOLD, updatedAt: getTime(), icon: '🪙' },
        { id: 'ir_coin_half', title: 'نیم سکه', symbol: 'Half', price: 76820000, changePercent: 1.29, type: MarketType.GOLD, updatedAt: getTime(), icon: '½🪙' },
        { id: 'ir_coin_quarter', title: 'ربع سکه', symbol: 'Quarter', price: 43770000, changePercent: 0.37, type: MarketType.GOLD, updatedAt: getTime(), icon: '¼🪙' },
        { id: 'ir_gold_18k', title: 'طلای ۱۸ عیار', symbol: 'Gold', price: 13600100, changePercent: 0.55, type: MarketType.GOLD, updatedAt: getTime(), icon: '🥇' }
      );
    }

    if (crypto.length === 0) {
      console.log('Using fallback for crypto...');
      crypto.push(
        { id: 'btc', title: 'بیت‌کوین', symbol: 'BTC', price: 86403.05, changePercent: -3.48, type: MarketType.CRYPTO, updatedAt: getTime(), icon: 'https://assets.coingecko.com/coins/images/1/thumb.png' },
        { id: 'eth', title: 'اتریوم', symbol: 'ETH', price: 2945.36, changePercent: -5.69, type: MarketType.CRYPTO, updatedAt: getTime(), icon: 'https://assets.coingecko.com/coins/images/279/thumb.png' },
        { id: 'usdt', title: 'تتر', symbol: 'USDT', price: 0.9998, changePercent: -0.02, type: MarketType.CRYPTO, updatedAt: getTime(), icon: 'https://assets.coingecko.com/coins/images/325/thumb.png' }
      );
    }

    // Log final counts
    console.log(`Final data - Currencies: ${currencies.length}, Gold: ${gold.length}, Crypto: ${crypto.length}`);
    
    // Log a few items for debugging
    if (currencies.length > 0) console.log('Sample currency:', currencies[0]);
    if (gold.length > 0) console.log('Sample gold:', gold[0]);
    if (crypto.length > 0) console.log('Sample crypto:', crypto[0]);
    
    return { currencies, gold, crypto };
    
  } catch (error) {
    console.error("Market API Error:", error);
    
    // Return fallback data in case of error
    const getTime = () => new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    
    return {
      currencies: [
        { id: 'usd', title: 'دلار آمریکا', symbol: 'USD', price: 130360, changePercent: 0.52, type: MarketType.FIAT, updatedAt: getTime(), icon: '💵' },
        { id: 'eur', title: 'یورو اروپا', symbol: 'EUR', price: 153380, changePercent: 0.72, type: MarketType.FIAT, updatedAt: getTime(), icon: '💶' },
        { id: 'gbp', title: 'پوند انگلیس', symbol: 'GBP', price: 174600, changePercent: 0.7, type: MarketType.FIAT, updatedAt: getTime(), icon: '💷' },
        { id: 'aed', title: 'درهم امارات', symbol: 'AED', price: 35507, changePercent: 0.54, type: MarketType.FIAT, updatedAt: getTime(), icon: '🇦🇪' },
        { id: 'try', title: 'لیر ترکیه', symbol: 'TRY', price: 3050, changePercent: 0.33, type: MarketType.FIAT, updatedAt: getTime(), icon: '🇹🇷' }
      ],
      gold: [
        { id: 'ir_coin_emami', title: 'سکه امامی', symbol: 'Coin', price: 141795000, changePercent: 0.56, type: MarketType.GOLD, updatedAt: getTime(), icon: '🪙' },
        { id: 'ir_coin_bahar', title: 'سکه بهار آزادی', symbol: 'Coin', price: 136570000, changePercent: 1.93, type: MarketType.GOLD, updatedAt: getTime(), icon: '🪙' },
        { id: 'ir_coin_half', title: 'نیم سکه', symbol: 'Half', price: 76820000, changePercent: 1.29, type: MarketType.GOLD, updatedAt: getTime(), icon: '½🪙' },
        { id: 'ir_coin_quarter', title: 'ربع سکه', symbol: 'Quarter', price: 43770000, changePercent: 0.37, type: MarketType.GOLD, updatedAt: getTime(), icon: '¼🪙' },
        { id: 'ir_gold_18k', title: 'طلای ۱۸ عیار', symbol: 'Gold', price: 13600100, changePercent: 0.55, type: MarketType.GOLD, updatedAt: getTime(), icon: '🥇' }
      ],
      crypto: [
        { id: 'btc', title: 'بیت‌کوین', symbol: 'BTC', price: 86403.05, changePercent: -3.48, type: MarketType.CRYPTO, updatedAt: getTime(), icon: 'https://assets.coingecko.com/coins/images/1/thumb.png' },
        { id: 'eth', title: 'اتریوم', symbol: 'ETH', price: 2945.36, changePercent: -5.69, type: MarketType.CRYPTO, updatedAt: getTime(), icon: 'https://assets.coingecko.com/coins/images/279/thumb.png' },
        { id: 'usdt', title: 'تتر', symbol: 'USDT', price: 0.9998, changePercent: -0.02, type: MarketType.CRYPTO, updatedAt: getTime(), icon: 'https://assets.coingecko.com/coins/images/325/thumb.png' }
      ]
    };
  }
};