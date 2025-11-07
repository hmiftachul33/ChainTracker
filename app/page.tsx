'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { PortfolioCard } from '@/components/PortfolioCard';
import { TokenList } from '@/components/TokenList';
import { ProtocolStats } from '@/components/ProtocolStats';
import { PortfolioChart } from '@/components/PortfolioChart';
import { PortfolioData } from '@/lib/defiService';
import { SkeletonCard, SkeletonTokenList, SkeletonProtocolStats, SkeletonChart } from '@/components/SkeletonLoader';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate mock chart data
  const generateChartData = (baseValue: number) => {
    const data = [];
    for (let i = 23; i >= 0; i--) {
      const variance = (Math.random() - 0.5) * 0.1 * baseValue;
      data.push({
        time: `${i}h ago`,
        value: baseValue + variance,
      });
    }
    return data;
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchPortfolioData(address);
    }
  }, [address, isConnected]);

  const fetchPortfolioData = async (walletAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/portfolio?address=${walletAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio data');
      }
      const data = await response.json();
      setPortfolioData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <nav className="relative bg-white/80 backdrop-blur-lg shadow-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ChainTracker
              </h1>
            </div>
            <ConnectButton />
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl mb-6 shadow-xl animate-bounce-slow">
              <svg
                className="w-10 h-10 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Connect Your Wallet
            </h2>
            <p className="text-lg text-gray-600 mb-2 max-w-md mx-auto">
              Track Your Crypto Wealth Across Every Chain
            </p>
            <p className="text-sm text-gray-500 mb-8 max-w-lg mx-auto">
              Monitor your DeFi portfolio, tokens, and protocol positions in real-time
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Multi-chain</span>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="space-y-6 animate-fade-in">
            <SkeletonCard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkeletonTokenList />
              <SkeletonProtocolStats />
            </div>
            <SkeletonChart />
          </div>
        ) : error ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md mx-auto shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-900 mb-2">Error Loading Data</h3>
              <p className="text-red-700 mb-6">{error}</p>
              <button
                onClick={() => address && fetchPortfolioData(address)}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95 shadow-lg font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : portfolioData ? (
          <div className="space-y-6 animate-fade-in">
            <PortfolioCard
              totalBalance={portfolioData.totalBalance}
              change24h={Math.random() * 10 - 5}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TokenList tokens={portfolioData.tokens} />
              <ProtocolStats protocols={portfolioData.protocols} />
            </div>

            <PortfolioChart
              data={generateChartData(portfolioData.totalBalance)}
            />
          </div>
        ) : null}
      </main>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
