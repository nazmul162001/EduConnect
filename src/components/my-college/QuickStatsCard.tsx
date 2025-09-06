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
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Quick Stats</h2>
            <p className="text-blue-200 text-sm">Your application metrics</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-blue-200">Days Applied</span>
            </div>
            <span className="text-white font-bold">{daysApplied}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-blue-200">Progress</span>
            </div>
            <span className="text-white font-bold">{applicationProgress}%</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-blue-200">Status</span>
            </div>
            <span className="text-white font-bold">Active</span>
          </div>
        </div>
      </div>
    </SlideUp>
  );
}
