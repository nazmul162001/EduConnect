"use client";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";
import { Eye, FileText, GraduationCap, Zap } from "lucide-react";
import Link from "next/link";

export default function NoApplicationState() {
  return (
    <div className="container-responsive max-w-7xl mx-auto px-6">
      {/* Enhanced Header */}
      <FadeIn>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full mb-6">
            <GraduationCap className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
            My College Application
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your gateway to higher education. Track applications, manage
            documents, and stay connected with your academic journey.
          </p>
        </div>
      </FadeIn>

      {/* Enhanced No Application State */}
      <SlideUp>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-12 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full mb-8">
                <FileText className="w-12 h-12 text-blue-400" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Begin Your Journey?
              </h2>

              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                You haven&apos;t submitted any college applications yet. Take
                the first step towards your dream education by applying to your
                preferred college.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/admission"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                  Start Application
                </Link>

                <Link
                  href="/colleges"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <Eye className="w-5 h-5" />
                  Browse Colleges
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">15+</div>
                  <div className="text-blue-200 text-sm">
                    Colleges Available
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">95%</div>
                  <div className="text-blue-200 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">24/7</div>
                  <div className="text-blue-200 text-sm">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SlideUp>
    </div>
  );
}
