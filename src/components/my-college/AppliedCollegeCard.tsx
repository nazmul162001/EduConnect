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
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Applied College</h2>
            <p className="text-blue-200 text-sm">Your chosen institution</p>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">{college.name}</h3>

          <div className="mb-6">
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
              <CheckCircle className="w-5 h-5" />
              Application Submitted
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-blue-200 text-sm mb-2">Application Status</p>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <p className="text-white font-bold text-lg">Under Review</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-blue-200 text-sm mb-2">Expected Response</p>
              <p className="text-white font-semibold">2-4 weeks</p>
            </div>
          </div>

          <p className="text-blue-100 text-sm mt-6 leading-relaxed">
            Your application is being carefully reviewed by our admissions
            committee. We&apos;ll notify you as soon as a decision is made.
          </p>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </SlideUp>
  );
}
