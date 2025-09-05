"use client";
import { College } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Helper function to format date as "31 September"
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  return `${day} ${month}`;
}

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
      <div className="p-5 space-y-3 text-black dark:text-white">
        {/* College Name */}
        <h3 className="text-lg font-semibold line-clamp-1">{college.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-amber-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">
            {college.rating.toFixed(1)}
          </span>
        </div>

        {/* Application Deadline */}
        <p className="text-sm text-black/70 dark:text-white/80">
          <span className="font-medium">Application Deadline:</span>{" "}
          {formatDate(college.admissionEnd)}
        </p>

        {/* Number of Research Papers */}
        <p className="text-sm text-black/70 dark:text-white/80">
          <span className="font-medium">Research Papers:</span>{" "}
          {college.researchPapers?.length || 0}
        </p>

        {/* Details Button */}
        <Link
          href={`/colleges/${college._id || college.id}`}
          className="inline-flex items-center w-full justify-center mt-3 rounded-full px-5 py-2.5 text-white bg-gradient-to-r from-brand-600 to-accent-500 shadow-lg shadow-brand-600/20 hover:shadow-xl hover:shadow-brand-600/30 transition group"
        >
          Details
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
