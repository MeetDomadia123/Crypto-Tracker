
import { createSlice } from '@reduxjs/toolkit';

// Initial mock data
const initialState = {
  assets: [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      icon: "/api/placeholder/24/24",
      price: 64253.12,
      percent1h: 0.56,
      percent24h: 2.34,
      percent7d: -1.45,
      marketCap: 1258962354102,
      volume24h: 25648723954,
      circulatingSupply: 19452680,
      maxSupply: 21000000,
      chartData: [61000, 62500, 63200, 62800, 63500, 64100, 64253]
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      icon: "/api/placeholder/24/24",
      price: 3428.76,
      percent1h: -0.23,
      percent24h: 1.56,
      percent7d: 3.78,
      marketCap: 412569873025,
      volume24h: 15789632541,
      circulatingSupply: 120356789,
      maxSupply: null,
      chartData: [3200, 3250, 3300, 3280, 3350, 3400, 3428]
    },
    {
      id: 3,
      name: "Tether",
      symbol: "USDT",
      icon: "/api/placeholder/24/24",
      price: 1.00,
      percent1h: 0.01,
      percent24h: -0.02,
      percent7d: 0.03,
      marketCap: 98765432100,
      volume24h: 65432789012,
      circulatingSupply: 98765432100,
      maxSupply: null,
      chartData: [1.00, 1.00, 1.00, 0.99, 1.00, 1.00, 1.00]
    },
    {
      id: 4,
      name: "Solana",
      symbol: "SOL",
      icon: "/api/placeholder/24/24",
      price: 128.35,
      percent1h: 0.89,
      percent24h: 5.62,
      percent7d: 12.45,
      marketCap: 56324789123,
      volume24h: 4562378910,
      circulatingSupply: 439765123,
      maxSupply: 500000000,
      chartData: [110, 115, 122, 121, 126, 127, 128.35]
    },
    {
      id: 5,
      name: "Binance Coin",
      symbol: "BNB",
      icon: "/api/placeholder/24/24",
      price: 567.82,
      percent1h: -1.34,
      percent24h: -0.78,
      percent7d: -2.56,
      marketCap: 87659432156,
      volume24h: 2345678901,
      circulatingSupply: 154326789,
      maxSupply: 200000000,
      chartData: [580, 575, 570, 565, 568, 566, 567.82]
    }
  ]
};
const getRandomChange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state) => {
      state.assets = state.assets.map(asset => {

        const priceChangePercent = getRandomChange(-2, 2) / 100;
        const newPrice = asset.price * (1 + priceChangePercent);
        

        const newChartData = [...asset.chartData.slice(1), newPrice];
        

        const new1hChange = asset.percent1h + getRandomChange(-0.5, 0.5);
        const new24hChange = asset.percent24h + getRandomChange(-0.3, 0.3);
        

        const volumeChangePercent = getRandomChange(-3, 3) / 100;
        const newVolume = asset.volume24h * (1 + volumeChangePercent);
        
        return {
          ...asset,
          price: newPrice,
          percent1h: new1hChange,
          percent24h: new24hChange,
          volume24h: newVolume,
          chartData: newChartData
        };
      });
    }
  }
});

export const { updatePrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;
