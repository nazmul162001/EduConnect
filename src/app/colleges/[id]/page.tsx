"use client";
import { Protected } from "@/components/auth/Protected";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";
import { College } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function CollegeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollege() {
      try {
        setLoading(true);
        const response = await fetch(`/api/colleges/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("College not found");
            return;
          }
          throw new Error("Failed to fetch college");
        }
        const data = await response.json();
        setCollege(data.data);
      } catch (err) {
        setError("Failed to load college details");
        console.error("Error fetching college:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCollege();
  }, [id]);

  if (loading) {
    return (
      <Protected>
        <div className="container-responsive py-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </Protected>
    );
  }

  if (error || !college) {
    return notFound();
  }
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        {/* Back Button */}
        <div className="container-responsive pt-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>

        {/* Hero Banner */}
        <div className="container-responsive pt-6">
          <SlideUp>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
              <Image
                src={college.image}
                alt={college.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {college.name}
                </h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {college.location || "Location not specified"}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {college.rating?.toFixed(1) || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </SlideUp>
        </div>

        {/* Main Content */}
        <div className="container-responsive pb-16">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              {/* About Section */}
              <FadeIn>
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    About {college.name}
                  </h2>
                  <p className="text-slate-200 leading-relaxed">
                    {college.description ||
                      college.researchHistory ||
                      "A prestigious institution committed to academic excellence and innovation."}
                  </p>
                </div>
              </FadeIn>

              {/* Admission Process */}
              <FadeIn>
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Admission Process
                  </h2>
                  <p className="text-slate-200 mb-4">
                    Holistic review process focusing on academic achievement,
                    leadership, and community impact.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Admission Deadline:{" "}
                    {college.admissionEnd
                      ? formatDate(college.admissionEnd)
                      : "TBA"}
                  </div>
                </div>
              </FadeIn>

              {/* Upcoming Events */}
              <FadeIn>
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Upcoming Events
                  </h2>
                  <div className="space-y-4">
                    {college.events && college.events.length > 0 ? (
                      college.events.map((event, index) => (
                        <div key={event.id || index} className="flex gap-4">
                          <div className="w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">
                              {event.title}
                            </h3>
                            <p className="text-sm text-slate-300 mb-1">
                              {formatDate(event.date)}
                            </p>
                            <p className="text-slate-200 text-sm">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-300">
                        No upcoming events scheduled.
                      </p>
                    )}
                  </div>
                </div>
              </FadeIn>

              {/* Research Excellence */}
              <FadeIn>
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Research Excellence
                  </h2>
                  <p className="text-slate-200 mb-4">
                    Pioneer in technology and innovation with strong ties to
                    industry and breakthrough research in various fields.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {college.researchPapers?.length || 0} Active Research
                    Projects
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <FadeIn>
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Quick Facts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-slate-200">
                        {college.rating?.toFixed(1) || "N/A"}/5.0
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-slate-200">
                        {college.researchPapers?.length || 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-slate-200">
                        {college.location || "Location TBA"}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Sports & Activities */}
              <FadeIn>
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Sports & Activities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {college.sports && college.sports.length > 0 ? (
                      college.sports.map((sport, index) => (
                        <span
                          key={sport.name || index}
                          className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm rounded-full font-medium shadow-lg"
                        >
                          {sport.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-300 text-sm">
                        No sports listed
                      </span>
                    )}
                  </div>
                </div>
              </FadeIn>

              {/* Apply Now Button */}
              <FadeIn>
                <Link
                  href={`/admission?college=${college._id || college.id}`}
                  className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/25"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Apply Now
                  </div>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
}
