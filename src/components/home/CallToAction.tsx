"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="container-responsive sm:mt-20 md:mt-24 px-6 sm:px-8 pb-5 md:pb-10 lg:pb-16">
      <div
        className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 md:p-16 text-center"
        style={{
          background: `linear-gradient(135deg, 
            rgba(99, 102, 241, 0.1) 0%, 
            rgba(6, 182, 212, 0.1) 100%),
            radial-gradient(
              800px 400px at 50% 50%,
              rgba(99, 102, 241, 0.2),
              transparent
            )`,
        }}
      >
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200/90 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Join thousands of students who have found their perfect college.
            Your educational future starts here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/colleges"
              className="btn-hero text-base sm:text-lg md:text-xl w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5"
            >
              Explore Colleges
              <span className="btn-hero-icon">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
            <Link
              href="/admission"
              className="btn-hero-outline text-base sm:text-lg md:text-xl w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5"
            >
              Start Application
              <span className="btn-hero-icon"></span>
            </Link>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-brand-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-tr from-accent-500/20 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
