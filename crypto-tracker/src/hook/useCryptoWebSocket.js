import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCryptoData } from '../redux/cryptoSlice';

export default function useCryptoWebSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const topAssets = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT'];

      const filteredData = data
        .filter((item) => topAssets.includes(item.s))
        .map((item, index) => ({
          id: index + 1,
          name: item.s.replace('USDT', ''),
          symbol: item.s,
          price: parseFloat(item.c),
          percent1h: (Math.random() * 4 - 2).toFixed(2),
          percent24h: parseFloat(item.P).toFixed(2),
          percent7d: (Math.random() * 6 - 3).toFixed(2),
          marketCap: (Math.random() * 1e10).toFixed(0),
          volume24h: parseFloat(item.v).toFixed(0),
          circulatingSupply: Math.floor(Math.random() * 1000000000),
          maxSupply: Math.floor(Math.random() * 2000000000),
          chart: '/sample-chart.svg',
        }));

      dispatch(updateCryptoData(filteredData));
    };

    return () => ws.close();
  }, [dispatch]);
}
