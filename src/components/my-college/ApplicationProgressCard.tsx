"use client";
import { SlideUp } from "@/components/motion/MotionPrimitives";
import { Award, BarChart3, CheckCircle, Clock, Target } from "lucide-react";

interface ApplicationProgressCardProps {
  applicationProgress: number;
}

export default function ApplicationProgressCard({
  applicationProgress,
}: ApplicationProgressCardProps) {
  return (
    <SlideUp>
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Application Progress
                </h2>
                <p className="text-blue-200">Track your admission journey</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                {applicationProgress}%
              </div>
              <div className="text-blue-200 text-sm">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${applicationProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-white font-semibold">Submitted</div>
                <div className="text-blue-200 text-sm">Application sent</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-white font-semibold">Under Review</div>
                <div className="text-blue-200 text-sm">Committee reviewing</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
              <Target className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-white font-semibold">Decision</div>
                <div className="text-blue-200 text-sm">Awaiting result</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
              <Award className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-white font-semibold">Enrollment</div>
                <div className="text-blue-200 text-sm">Next step</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideUp>
  );
}
