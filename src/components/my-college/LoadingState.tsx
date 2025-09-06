"use client";

export default function LoadingState() {
  return (
    <div className="container-responsive max-w-7xl mx-auto px-6">
      {/* Enhanced Loading Header */}
      <div className="text-center mb-12">
        <div className="animate-pulse">
          <div className="h-12 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-lg w-80 mx-auto mb-4"></div>
          <div className="h-6 bg-white/20 rounded w-96 mx-auto mb-8"></div>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <span className="text-blue-200 text-lg">
            Loading your application dashboard...
          </span>
        </div>
      </div>

      {/* Enhanced Loading Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          {/* Application Details Skeleton */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-8">
                <div className="h-8 bg-white/20 rounded w-48"></div>
                <div className="h-10 bg-white/20 rounded-lg w-20"></div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-white/10 rounded w-24"></div>
                    <div className="h-6 bg-white/20 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Card Skeleton */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded w-56 mb-8"></div>
              <div className="space-y-6">
                <div className="h-6 bg-white/10 rounded w-32"></div>
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 w-8 bg-white/20 rounded"></div>
                  ))}
                </div>
                <div className="h-32 bg-white/10 rounded-lg"></div>
                <div className="h-12 bg-white/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* College Card Skeleton */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded w-40 mb-6"></div>
              <div className="text-center space-y-4">
                <div className="h-6 bg-white/20 rounded w-32 mx-auto"></div>
                <div className="h-12 bg-white/20 rounded-lg"></div>
                <div className="h-4 bg-white/10 rounded w-24 mx-auto"></div>
                <div className="h-6 bg-white/20 rounded w-28 mx-auto"></div>
                <div className="h-16 bg-white/10 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Stats Card Skeleton */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded w-32 mb-6"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-4 bg-white/10 rounded w-20"></div>
                    <div className="h-6 bg-white/20 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
