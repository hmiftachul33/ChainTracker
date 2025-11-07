'use client';

import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PortfolioCardProps {
  totalBalance: number;
  change24h?: number;
}

export function PortfolioCard({ totalBalance, change24h = 0 }: PortfolioCardProps) {
  const isPositive = change24h >= 0;
  const [displayValue, setDisplayValue] = useState(0);

  // Animated counter effect
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = totalBalance / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= totalBalance) {
        setDisplayValue(totalBalance);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalBalance]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] group">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Floating particles effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-colors">
              <Wallet className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold tracking-wide">Total Portfolio Value</h2>
          </div>
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg group-hover:rotate-12 transition-transform">
            {isPositive ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-5xl font-bold tracking-tight">
            ${displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${
              isPositive
                ? 'bg-green-500/30 text-green-100'
                : 'bg-red-500/30 text-red-100'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{isPositive ? '+' : ''}{Math.abs(change24h).toFixed(2)}%</span>
            </div>
            <span className="text-white/70 text-sm">Last 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}
