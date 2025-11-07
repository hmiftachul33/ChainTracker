'use client';

import { TokenBalance } from '@/lib/defiService';
import { Coins, TrendingUp } from 'lucide-react';

interface TokenListProps {
  tokens: TokenBalance[];
}

const TOKEN_COLORS: Record<string, { from: string; to: string }> = {
  ETH: { from: 'from-blue-400', to: 'to-blue-600' },
  USDC: { from: 'from-blue-500', to: 'to-cyan-600' },
  USDT: { from: 'from-green-400', to: 'to-emerald-600' },
  DAI: { from: 'from-yellow-400', to: 'to-orange-500' },
  default: { from: 'from-purple-400', to: 'to-pink-600' },
};

export function TokenList({ tokens }: TokenListProps) {
  const getTokenColor = (symbol: string) => {
    return TOKEN_COLORS[symbol] || TOKEN_COLORS.default;
  };

  const totalValue = tokens.reduce((sum, token) => sum + token.valueUSD, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
            <Coins className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Token Holdings</h2>
        </div>
        <div className="px-3 py-1 bg-purple-50 rounded-full">
          <span className="text-sm font-medium text-purple-700">{tokens.length} assets</span>
        </div>
      </div>

      <div className="space-y-2">
        {tokens.map((token, index) => {
          const colors = getTokenColor(token.symbol);
          const percentage = totalValue > 0 ? (token.valueUSD / totalValue) * 100 : 0;

          return (
            <div
              key={index}
              className="group relative flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-xl hover:from-purple-50 hover:to-blue-50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-md"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideIn 0.5s ease-out forwards',
              }}
            >
              {/* Progress bar background */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-100/30 to-blue-100/30 rounded-xl transition-all duration-500 origin-left"
                style={{
                  width: `${percentage}%`,
                  opacity: 0.5,
                }}
              />

              <div className="relative flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 bg-gradient-to-br ${colors.from} ${colors.to} rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {token.symbol.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {token.symbol}
                    </div>
                    <div className="px-2 py-0.5 bg-gray-200 group-hover:bg-purple-200 rounded text-xs font-medium text-gray-600 group-hover:text-purple-700 transition-colors">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 font-medium mt-0.5">
                    {parseFloat(token.balance).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 4
                    })} {token.symbol}
                  </div>
                </div>
              </div>

              <div className="relative text-right">
                <div className="font-bold text-lg text-gray-900 group-hover:text-purple-700 transition-colors">
                  ${token.valueUSD.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
                <div className="flex items-center justify-end gap-1 text-xs text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TrendingUp className="w-3 h-3" />
                  <span>View details</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {tokens.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Coins className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No tokens found</p>
          <p className="text-gray-400 text-sm mt-1">Connect a wallet with assets to see your holdings</p>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
