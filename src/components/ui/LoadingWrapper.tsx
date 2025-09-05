"use client";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useLoading } from "@/context/LoadingContext";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading();
  const pathname = usePathname();

  // Skip loading for 404 page
  if (pathname === "/404" || pathname === "/not-found") {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
