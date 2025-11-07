'use client';

export function SkeletonCard() {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/20 rounded"></div>
          <div className="h-6 w-32 bg-white/20 rounded"></div>
        </div>
        <div className="w-5 h-5 bg-white/20 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-10 w-48 bg-white/20 rounded"></div>
        <div className="h-4 w-24 bg-white/20 rounded"></div>
      </div>
    </div>
  );
}

export function SkeletonTokenList() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="h-8 w-40 bg-gray-200 rounded mb-4 animate-pulse"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonProtocolStats() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
      <div className="h-[300px] bg-gray-100 rounded-lg animate-pulse flex items-end justify-between px-4 pb-4">
        {[40, 60, 45, 70, 55, 80, 65, 75].map((height, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-t w-8"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
