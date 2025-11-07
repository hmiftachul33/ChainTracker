'use client';

import { PortfolioData } from '@/lib/defiService';
import { DollarSign, TrendingDown, Shield, Activity, AlertCircle, CheckCircle } from 'lucide-react';

interface ProtocolStatsProps {
  protocols: PortfolioData['protocols'];
}

export function ProtocolStats({ protocols }: ProtocolStatsProps) {
  const hasProtocols = protocols.aave || protocols.compound;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg">
          <Activity className="w-5 h-5 text-pink-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">DeFi Protocols</h2>
      </div>

      <div className="space-y-4">
        {protocols.aave && (
          <div className="group relative overflow-hidden border-2 border-pink-100 hover:border-pink-300 rounded-xl p-5 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white to-pink-50/30">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Aave Protocol</h3>
                    <p className="text-xs text-gray-500">Lending & Borrowing</p>
                  </div>
                </div>

                {/* Health factor badge */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                  protocols.aave.healthFactor > 2
                    ? 'bg-green-100 text-green-700'
                    : protocols.aave.healthFactor > 1.5
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {protocols.aave.healthFactor > 2 ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {protocols.aave.healthFactor > 2 ? 'Healthy' : protocols.aave.healthFactor > 1.5 ? 'Caution' : 'At Risk'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-lg group-hover:bg-white transition-colors">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">Total Deposited</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    ${protocols.aave.totalDeposited.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-lg group-hover:bg-white transition-colors">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="p-1.5 bg-orange-100 rounded-lg">
                      <TrendingDown className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium">Total Borrowed</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    ${protocols.aave.totalBorrowed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-lg group-hover:bg-white transition-colors">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className={`p-1.5 rounded-lg ${
                      protocols.aave.healthFactor > 2 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Shield className={`w-4 h-4 ${
                        protocols.aave.healthFactor > 2 ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <span className="text-sm font-medium">Health Factor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-lg ${
                      protocols.aave.healthFactor > 2 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {protocols.aave.healthFactor.toFixed(2)}
                    </span>
                    <div className="relative w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                          protocols.aave.healthFactor > 2
                            ? 'bg-green-500'
                            : protocols.aave.healthFactor > 1.5
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{
                          width: `${Math.min((protocols.aave.healthFactor / 3) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {protocols.compound && (
          <div className="group relative overflow-hidden border-2 border-green-100 hover:border-green-300 rounded-xl p-5 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-white to-green-50/30">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">C</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Compound</h3>
                  <p className="text-xs text-gray-500">Lending Protocol</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-lg group-hover:bg-white transition-colors">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="p-1.5 bg-green-100 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Total Supplied</span>
                </div>
                <span className="font-bold text-gray-900">
                  ${protocols.compound.totalSupplied.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        )}

        {!hasProtocols && (
          <div className="text-center py-12 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
              <Activity className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-semibold text-lg mb-1">No Active Positions</p>
            <p className="text-gray-500 text-sm">
              You don't have any positions in DeFi protocols yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
