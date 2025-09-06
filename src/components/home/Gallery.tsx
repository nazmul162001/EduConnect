"use client";
import { getGallery } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";

export function Gallery() {
  const images = getGallery();

  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Graduates Gallery
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          See the success stories of our graduates from top universities
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {images.map((src, i) => (
          <motion.div
            key={src + i}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden card shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <Image src={src} alt="Graduates" fill className="object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
