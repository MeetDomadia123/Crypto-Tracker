import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp, DollarSign, Repeat } from 'lucide-react';
import { updatePrices } from '../redux/cryptoSlice';

export default function CryptoTable() {
  const assets = useSelector((state) => state.crypto.assets);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');

 
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePrices());
    }, 2000); 
    
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSort = (category) => {
    if (sortBy === category) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(category);
      setSortDirection('desc');
    }
  };

  const sortedAssets = [...assets].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'gainers':
        comparison = b.percent24h - a.percent24h;
        break;
      case 'price':
        comparison = b.price - a.price;
        break;
      case 'marketCap':
        comparison = b.marketCap - a.marketCap;
        break;
      case 'volume':
        comparison = b.volume24h - a.volume24h;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      default:
        return 0;
    }
    
    return sortDirection === 'asc' ? comparison * -1 : comparison;
  });

  // Process chart data for Recharts
  const processChartData = (dataPoints) => {
    if (!dataPoints || !Array.isArray(dataPoints)) {
      return Array(7).fill().map((_, i) => ({ value: Math.random() * 100 }));
    }
    return dataPoints.map((point) => ({ value: point }));
  };

  return (
    <div className="overflow-x-auto p-4 bg-gray-50 rounded-lg shadow">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Cryptocurrency Market</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleSort('gainers')} 
            className={`px-3 py-1 rounded flex items-center gap-1 ${sortBy === 'gainers' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'}`}
          >
            <TrendingUp size={16} />
            Top Gainers
            {sortBy === 'gainers' && (
              sortDirection === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />
            )}
          </button>
          <button 
            onClick={() => handleSort('price')} 
            className={`px-3 py-1 rounded flex items-center gap-1 ${sortBy === 'price' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'}`}
          >
            <DollarSign size={16} />
            By Price
            {sortBy === 'price' && (
              sortDirection === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />
            )}
          </button>
          <button 
            onClick={() => handleSort('marketCap')} 
            className={`px-3 py-1 rounded flex items-center gap-1 ${sortBy === 'marketCap' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-800'}`}
          >
            Market Cap
            {sortBy === 'marketCap' && (
              sortDirection === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />
            )}
          </button>
          <button 
            onClick={() => handleSort('name')} 
            className={`px-3 py-1 rounded flex items-center gap-1 ${sortBy === 'name' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Name
            {sortBy === 'name' && (
              sortDirection === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />
            )}
          </button>
          <button 
            onClick={() => setSortBy('')} 
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 flex items-center gap-1"
          >
            <Repeat size={16} />
            Reset
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow flex justify-center">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 font-medium text-gray-600">#</th>
              <th className="p-3 font-medium text-gray-600">Name</th>
              <th className="p-3 font-medium text-gray-600">Price</th>
              <th className="p-3 font-medium text-gray-600">1h %</th>
              <th className="p-3 font-medium text-gray-600">24h %</th>
              <th className="p-3 font-medium text-gray-600">7d %</th>
              <th className="p-3 font-medium text-gray-600">Market Cap</th>
              <th className="p-3 font-medium text-gray-600">Volume (24h)</th>
              <th className="p-3 font-medium text-gray-600">Circulating Supply</th>
              <th className="p-3 font-medium text-gray-600">7D Chart</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssets.map((asset, index) => (
              <tr key={asset.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-gray-800">{index + 1}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {asset.icon && (
                      <img src='https://static-00.iconduck.com/assets.00/generic-cryptocurrency-icon-2048x2048-8uz1hlry.png' alt={asset.symbol} className="w-6 h-6 rounded-full" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{asset.name}</div>
                      <div className="text-gray-500 text-xs">{asset.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3 font-medium">${asset.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                <td className={`p-3 ${asset.percent1h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <div className="flex items-center">
                    {asset.percent1h >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    {Math.abs(asset.percent1h).toFixed(2)}%
                  </div>
                </td>
                <td className={`p-3 ${asset.percent24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <div className="flex items-center">
                    {asset.percent24h >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    {Math.abs(asset.percent24h).toFixed(2)}%
                  </div>
                </td>
                <td className={`p-3 ${asset.percent7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <div className="flex items-center">
                    {asset.percent7d >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    {Math.abs(asset.percent7d).toFixed(2)}%
                  </div>
                </td>
                <td className="p-3">${asset.marketCap.toLocaleString()}</td>
                <td className="p-3">${Math.round(asset.volume24h).toLocaleString()}</td>
                <td className="p-3">
                  {asset.circulatingSupply.toLocaleString()} 
                  <span className="text-gray-500 ml-1">{asset.symbol}</span>
                </td>
                <td className="p-3">
                  <div className="w-24 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={processChartData(asset.chartData)}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={asset.percent7d >= 0 ? "#10B981" : "#EF4444"} 
                          strokeWidth={2} 
                          dot={false}
                        />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
