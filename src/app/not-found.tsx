"use client";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Home, MapPin, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1
            className="text-8xl md:text-9xl font-black text-white mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(147, 51, 234, 0.8)",
                "0 0 20px rgba(59, 130, 246, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Floating Icons Animation */}
        <motion.div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50, x: -100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -top-8 -left-8"
          >
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <BookOpen className="w-8 h-8 text-blue-300" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -top-8 -right-8"
          >
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Search className="w-8 h-8 text-purple-300" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MapPin className="w-8 h-8 text-indigo-300" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! You&apos;re Lost on Campus
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Looks like this page took a detour to the library and never came
            back. Don&apos;t worry, we&apos;ll help you find your way back to
            the main campus!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
              Explore Colleges
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16"
        >
          <div className="flex justify-center gap-8 text-blue-200/30">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-2 h-2 bg-current rounded-full" />
            </motion.div>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-2 h-2 bg-current rounded-full" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-2 h-2 bg-current rounded-full" />
            </motion.div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
