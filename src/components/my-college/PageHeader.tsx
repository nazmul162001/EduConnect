"use client";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { GraduationCap } from "lucide-react";

export default function PageHeader() {
  return (
    <FadeIn>
      <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4 sm:px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full mb-4 sm:mb-6">
          <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
          My College Application
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed px-2">
          Track your application progress, manage your academic journey, and
          stay connected with your chosen institution.
        </p>
      </div>
    </FadeIn>
  );
}
