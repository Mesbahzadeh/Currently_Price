export enum MarketType {
  FIAT = 'FIAT',
  GOLD = 'GOLD',
  CRYPTO = 'CRYPTO'
}

export interface MarketItem {
  id: string;
  title: string;
  price: number;
  changePercent: number;
  type: MarketType;
  updatedAt: string;
  symbol?: string; // e.g., USD, BTC
  icon?: string; // URL or emoji
}

export interface MarketDataState {
  currencies: MarketItem[];
  gold: MarketItem[];
  crypto: MarketItem[];
  loading: boolean;
}