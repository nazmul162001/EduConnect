"use client";
import { SlideUp } from "@/components/motion/MotionPrimitives";
import { Award, Calendar, Target, TrendingUp } from "lucide-react";

interface QuickStatsCardProps {
  applicationProgress: number;
  daysApplied: number;
}

export default function QuickStatsCard({
  applicationProgress,
  daysApplied,
}: QuickStatsCardProps) {
  return (
    <SlideUp>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Quick Stats
            </h2>
            <p className="text-blue-200 text-xs sm:text-sm">
              Your application metrics
            </p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              </div>
              <span className="text-blue-200 text-sm sm:text-base">
                Days Applied
              </span>
            </div>
            <span className="text-white font-bold text-sm sm:text-base">
              {daysApplied}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              </div>
              <span className="text-blue-200 text-sm sm:text-base">
                Progress
              </span>
            </div>
            <span className="text-white font-bold text-sm sm:text-base">
              {applicationProgress}%
            </span>
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
              </div>
              <span className="text-blue-200 text-sm sm:text-base">Status</span>
            </div>
            <span className="text-white font-bold text-sm sm:text-base">
              Active
            </span>
          </div>
        </div>
      </div>
    </SlideUp>
  );
}
