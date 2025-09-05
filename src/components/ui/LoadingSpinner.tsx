"use client";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Users } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
            >
              <GraduationCap className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 border-4 border-white/20 rounded-full"
            />
          </div>
        </motion.div>

        {/* Text Animation */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl font-bold text-white mb-2"
        >
          EduConnect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-blue-100 mb-8"
        >
          Connecting Students to Excellence
        </motion.p>

        {/* Loading Dots */}
        <motion.div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
              className="w-3 h-3 bg-white rounded-full"
            />
          ))}
        </motion.div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-1/4 left-1/4"
          >
            <BookOpen className="w-8 h-8 text-blue-300" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute top-1/3 right-1/4"
          >
            <Users className="w-8 h-8 text-purple-300" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute bottom-1/4 left-1/3"
          >
            <GraduationCap className="w-8 h-8 text-indigo-300" />
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 0.8 }}
          className="mt-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        />
      </div>
    </div>
  );
}
