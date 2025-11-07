'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface PortfolioChartProps {
  data: Array<{ time: string; value: number }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl shadow-xl border-2 border-purple-100">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-lg font-bold text-purple-700">
          ${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
};

export function PortfolioChart({ data }: PortfolioChartProps) {
  const minValue = Math.min(...data.map(d => d.value));
  const maxValue = Math.max(...data.map(d => d.value));
  const change = data.length > 1 ? ((data[data.length - 1].value - data[0].value) / data[0].value) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Portfolio Performance</h2>
            <p className="text-sm text-gray-500">Last 24 hours</p>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          isPositive ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <TrendingUp className={`w-4 h-4 ${
            isPositive ? 'text-green-600' : 'text-red-600 rotate-180'
          }`} />
          <span className={`font-bold text-sm ${
            isPositive ? 'text-green-700' : 'text-red-700'
          }`}>
            {isPositive ? '+' : ''}{change.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Current</p>
            <p className="text-sm font-bold text-gray-900">
              ${data[data.length - 1]?.value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">24h High</p>
            <p className="text-sm font-bold text-green-700">
              ${maxValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">24h Low</p>
            <p className="text-sm font-bold text-orange-700">
              ${minValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '5 5' }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{
                r: 6,
                fill: '#8b5cf6',
                stroke: 'white',
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Time range selector (visual only) */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {['24H', '7D', '30D', '1Y', 'ALL'].map((range, idx) => (
            <button
              key={range}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                idx === 0
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
