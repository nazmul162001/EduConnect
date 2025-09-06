"use client";
import { getResearchLinks } from "@/lib/data";
import { motion } from "framer-motion";

export function ResearchLinks() {
  const links = getResearchLinks();

  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Student Research
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          Explore groundbreaking research by our students and alumni
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {links.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -8, scale: 1.05 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/10 dark:bg-slate-800/30 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
          >
            {/* Category Tag */}
            <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
              {p.category || "Computer Science"}
            </div>

            {/* Document Icon */}
            <div className="absolute top-6 right-6 text-blue-400/60 group-hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Research Title */}
            <h3 className="font-bold text-white text-lg sm:text-xl leading-tight mb-4 group-hover:text-blue-300 transition-colors">
              {p.title}
            </h3>

            {/* Authors */}
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-4 h-4 text-slate-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <p className="text-sm text-slate-300">{p.authors.join(", ")}</p>
            </div>

            {/* Publication Date and Institution */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-slate-300">January {p.year}</p>
              </div>
              <p className="text-sm text-blue-400 font-medium">
                {p.institution || "MIT"}
              </p>
            </div>

            {/* Abstract/Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {p.abstract ||
                "This research explores innovative approaches and methodologies in the field of computer science, contributing to the advancement of knowledge and technology."}
            </p>

            {/* Divider */}
            <div className="border-t border-slate-600/50 mb-4"></div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {p.downloads ? p.downloads.toLocaleString() : "1,234"} downloads
              </p>
              <motion.a
                href={p.url}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Read Paper
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
