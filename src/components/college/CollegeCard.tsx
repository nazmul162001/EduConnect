"use client";
import { College } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function CollegeCard({ college }: { college: College }) {
  const [imgSrc, setImgSrc] = useState(college.image);
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-3xl border border-white/50 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xl transition-all group"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={imgSrc}
          alt={college.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() =>
            setImgSrc("https://picsum.photos/seed/college/1200/675")
          }
        />
      </div>
      <div className="p-5 space-y-2 text-black dark:text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{college.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">
              {college.rating.toFixed(2)}
            </span>
          </div>
        </div>
        <p className="text-sm text-black/70 dark:text-white/80">
          Admission: {college.admissionStart} - {college.admissionEnd}
        </p>
        <p className="text-sm text-black/70 dark:text-white/80 line-clamp-2">
          {college.researchHistory}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-black/70 dark:text-white/80">
          {college.sports.slice(0, 4).map((s) => (
            <span
              key={s.name}
              className="rounded-full bg-brand-50/80 dark:bg-slate-800 px-2 py-1 border border-brand-100 dark:border-slate-700"
            >
              {s.name}
            </span>
          ))}
        </div>
        <Link
          href={`/colleges/${college.id}`}
          className="inline-flex items-center mt-3 rounded-full px-5 py-2.5 text-white bg-gradient-to-r from-brand-600 to-accent-500 shadow-lg shadow-brand-600/20 hover:shadow-xl hover:shadow-brand-600/30 transition group"
        >
          Details
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
