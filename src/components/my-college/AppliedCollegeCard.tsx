"use client";
import { SlideUp } from "@/components/motion/MotionPrimitives";
import {
  CheckCircle,
  Clock,
  Download,
  GraduationCap,
  Share2,
} from "lucide-react";

interface College {
  name: string;
}

interface AppliedCollegeCardProps {
  college: College;
}

export default function AppliedCollegeCard({
  college,
}: AppliedCollegeCardProps) {
  return (
    <SlideUp>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Applied College
            </h2>
            <p className="text-blue-200 text-xs sm:text-sm">
              Your chosen institution
            </p>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 leading-tight break-words">
            {college.name}
          </h3>

          <div className="mb-4 sm:mb-6">
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Application Submitted
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-white/5 rounded-xl">
              <p className="text-blue-200 text-xs sm:text-sm mb-2">
                Application Status
              </p>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <p className="text-white font-bold text-base sm:text-lg">
                  Under Review
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-white/5 rounded-xl">
              <p className="text-blue-200 text-xs sm:text-sm mb-2">
                Expected Response
              </p>
              <p className="text-white font-semibold text-sm sm:text-base">
                2-4 weeks
              </p>
            </div>
          </div>

          <p className="text-blue-100 text-xs sm:text-sm mt-4 sm:mt-6 leading-relaxed">
            Your application is being carefully reviewed by our admissions
            committee. We&apos;ll notify you as soon as a decision is made.
          </p>

          <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              Download
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </SlideUp>
  );
}
