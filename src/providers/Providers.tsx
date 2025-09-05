"use client";
import { AuthProvider } from "@/context/AuthContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <LoadingProvider>
      <AuthProvider>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </AuthProvider>
    </LoadingProvider>
  );
}
