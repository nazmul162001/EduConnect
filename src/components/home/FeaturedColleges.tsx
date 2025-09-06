"use client";
import { CollegeCard } from "@/components/college/CollegeCard";
import { getColleges } from "@/lib/colleges-api";
import { College } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export function FeaturedColleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollegesData = async () => {
      try {
        setLoading(true);
        const data = await getColleges();
        setColleges(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setError("Failed to load colleges");
      } finally {
        setLoading(false);
      }
    };

    fetchCollegesData();
  }, []);

  const featured = colleges?.slice(0, 3) || [];

  if (loading) {
    return (
      <section className="container-responsive mt-12 sm:mt-16 md:mt-20 px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient">
            Featured Colleges
          </h2>
          <Link
            href="/colleges"
            className="text-base sm:text-lg font-semibold text-white hover:text-brand-500 transition-colors bg-brand-50/20 hover:bg-brand-50/30 px-4 py-2 rounded-full border border-brand-200/30"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-800/50 rounded-lg p-6 animate-pulse"
            >
              <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-responsive mt-12 sm:mt-16 md:mt-20 px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient">
            Featured Colleges
          </h2>
          <Link
            href="/colleges"
            className="text-base sm:text-lg font-semibold text-white hover:text-brand-500 transition-colors bg-brand-50/20 hover:bg-brand-50/30 px-4 py-2 rounded-full border border-brand-200/30"
          >
            View all →
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-responsive mt-12 sm:mt-16 md:mt-20 px-6 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient">
          Featured Colleges
        </h2>
        <Link
          href="/colleges"
          className="text-base sm:text-lg font-semibold text-white hover:text-brand-500 transition-colors bg-brand-50/20 hover:bg-brand-50/30 px-4 py-2 rounded-full border border-brand-200/30"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featured.map((c) => (
          <CollegeCard key={c._id || c.id} college={c} />
        ))}
      </div>
    </section>
  );
}
