"use client";
import { Award, Globe, GraduationCap, Users } from "lucide-react";

export function Statistics() {
  const stats = [
    { icon: Users, value: "50K+", label: "Students Helped" },
    { icon: GraduationCap, value: "500+", label: "Partner Colleges" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: Globe, value: "25+", label: "Countries" },
  ];

  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Trusted by Students Worldwide
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          Join thousands of students who have found their perfect college
          through our platform
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/15 dark:hover:bg-slate-800/40 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 sm:p-4 rounded-full bg-brand-500/20 text-brand-400">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {stat.value}
            </div>
            <div className="text-sm sm:text-base text-slate-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
