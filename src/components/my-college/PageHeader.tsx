"use client";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { GraduationCap } from "lucide-react";

export default function PageHeader() {
  return (
    <FadeIn>
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full mb-6">
          <GraduationCap className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
          My College Application
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Track your application progress, manage your academic journey, and
          stay connected with your chosen institution.
        </p>
      </div>
    </FadeIn>
  );
}
