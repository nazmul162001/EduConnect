"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-responsive py-12 sm:py-16 md:py-20 lg:py-32 text-center px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-extrabold leading-tight"
        >
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Your Gateway to
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl heading-gradient drop-shadow-sm">
            Educational Excellence
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100/90 max-w-4xl mx-auto px-2"
        >
          Discover top universities, explore admission opportunities, and take
          the next step toward your academic future with our comprehensive
          college platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
        >
          <a
            href="#featured"
            className="btn-hero text-sm sm:text-base md:text-lg w-full sm:w-auto"
          >
            Explore Colleges
            <span className="btn-hero-icon">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
          <a
            href="/admission"
            className="btn-hero-outline text-sm sm:text-base md:text-lg w-full sm:w-auto"
          >
            Start Application
            <span className="btn-hero-icon"></span>
          </a>
        </motion.div>
      </div>

      {/* Search Bar Section */}
      <div className="container-responsive pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Find Your Perfect College
          </h2>
          <p className="text-base sm:text-lg text-blue-200 max-w-2xl mx-auto px-2">
            Search through our comprehensive database of top universities and
            discover the institution that matches your academic goals
          </p>
        </div>
        <SearchBar />
      </div>
    </section>
  );
}
