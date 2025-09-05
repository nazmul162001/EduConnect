"use client";
import { CollegeCard } from "@/components/college/CollegeCard";
import { getColleges } from "@/lib/colleges-api";
import { getGallery, getResearchLinks } from "@/lib/data";
import { College, Review } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Globe,
  GraduationCap,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
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

  const featured = colleges.slice(0, 3);

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

export function ResearchLinks() {
  const links = getResearchLinks();
  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Student Research
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          Explore groundbreaking research by our students and alumni
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {links.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -8, scale: 1.05 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/10 dark:bg-slate-800/30 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
          >
            {/* Category Tag */}
            <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
              {p.category || "Computer Science"}
            </div>

            {/* Document Icon */}
            <div className="absolute top-6 right-6 text-blue-400/60 group-hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Research Title */}
            <h3 className="font-bold text-white text-lg sm:text-xl leading-tight mb-4 group-hover:text-blue-300 transition-colors">
              {p.title}
            </h3>

            {/* Authors */}
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-4 h-4 text-slate-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <p className="text-sm text-slate-300">{p.authors.join(", ")}</p>
            </div>

            {/* Publication Date and Institution */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-slate-300">January {p.year}</p>
              </div>
              <p className="text-sm text-blue-400 font-medium">
                {p.institution || "MIT"}
              </p>
            </div>

            {/* Abstract/Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {p.abstract ||
                "This research explores innovative approaches and methodologies in the field of computer science, contributing to the advancement of knowledge and technology."}
            </p>

            {/* Divider */}
            <div className="border-t border-slate-600/50 mb-4"></div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {p.downloads ? p.downloads.toLocaleString() : "1,234"} downloads
              </p>
              <motion.a
                href={p.url}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Read Paper
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get user initials
  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        if (data.success) {
          setReviews(data.data);
        } else {
          setError("Failed to fetch reviews");
        }
      } catch (err) {
        setError("Failed to fetch reviews");
        console.error("Error fetching reviews:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (reviews.length - 2)); // -2 because we show 3 at a time
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (reviews.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + (reviews.length - 2)) % (reviews.length - 2)
    );
  };

  if (isLoading) {
    return (
      <section className="container-responsive mt-16 sm:mt-20 md:mt-24 pb-16 sm:pb-20 md:pb-24 px-6 sm:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
            What Students Say
          </h2>
          <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
            Hear from students who found their perfect college through our
            platform
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-responsive mt-16 sm:mt-20 md:mt-24 pb-16 sm:pb-20 md:pb-24 px-6 sm:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
            What Students Say
          </h2>
          <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
            Hear from students who found their perfect college through our
            platform
          </p>
        </div>
        <div className="text-center text-red-400">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 pb-16 sm:pb-20 md:pb-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          What Students Say
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          Hear from students who found their perfect college through our
          platform
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all duration-300"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all duration-300"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Carousel Slides */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
          >
            {reviews.map((r, index) => (
              <div
                key={r._id || `review-${index}`}
                className="w-1/3 flex-shrink-0 px-4"
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative rounded-2xl sm:rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/10 dark:bg-slate-800/30 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm h-full"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 text-6xl text-slate-400/20 dark:text-slate-600/20 font-serif">
                    &ldquo;
                  </div>

                  {/* User Avatar and Info */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {getUserInitials(
                        r.firstName || r.userName.split(" ")[0],
                        r.lastName || r.userName.split(" ")[1] || ""
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white text-lg">
                          {r.userName}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < r.rating
                                  ? "fill-current"
                                  : "text-slate-400 dark:text-slate-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* University Tag */}
                      {r.university && (
                        <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          {r.university}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Review Comment */}
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-200 leading-relaxed mb-4 pr-8">
                    {r.comment}
                  </p>

                  {/* Date */}
                  <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium">
                    {new Date(r.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: reviews.length - 2 }).map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => setCurrentSlide(slideIndex)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                slideIndex === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Statistics Section
export function Statistics() {
  const stats = [
    { icon: Users, value: "50K+", label: "Students Helped" },
    { icon: GraduationCap, value: "500+", label: "Partner Colleges" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: Globe, value: "25+", label: "Countries" },
  ];

  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Trusted by Students Worldwide
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          Join thousands of students who have found their perfect college
          through our platform
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/15 dark:hover:bg-slate-800/40 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 sm:p-4 rounded-full bg-brand-500/20 text-brand-400">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {stat.value}
            </div>
            <div className="text-sm sm:text-base text-slate-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Key Features Section
export function KeyFeatures() {
  const features = [
    {
      icon: "🎯",
      title: "Smart Matching",
      description:
        "AI-powered algorithm matches you with colleges that fit your academic goals and preferences.",
    },
    {
      icon: "📊",
      title: "Comprehensive Data",
      description:
        "Access detailed information about admission requirements, tuition fees, and campus life.",
    },
    {
      icon: "🤝",
      title: "Expert Guidance",
      description:
        "Get personalized advice from education counselors and college admission experts.",
    },
    {
      icon: "📱",
      title: "Easy Application",
      description:
        "Streamlined application process with document management and deadline tracking.",
    },
    {
      icon: "💰",
      title: "Scholarship Finder",
      description:
        "Discover financial aid opportunities and scholarships tailored to your profile.",
    },
    {
      icon: "🌍",
      title: "Global Reach",
      description:
        "Connect with universities worldwide and explore international education opportunities.",
    },
  ];

  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Why Choose EduConnect?
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-3xl mx-auto">
          We provide everything you need to make informed decisions about your
          higher education journey
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/15 dark:hover:bg-slate-800/40 transition-all duration-300"
          >
            <div className="text-4xl sm:text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Success Stories Section
export function SuccessStories() {
  const stories = [
    {
      name: "Sarah Johnson",
      college: "Stanford University",
      program: "Computer Science",
      quote:
        "EduConnect helped me find the perfect program that matched my career goals. The application process was seamless!",
    },
    {
      name: "Ahmed Hassan",
      college: "MIT",
      program: "Engineering",
      quote:
        "The scholarship finder feature saved me thousands of dollars. I couldn't have done it without EduConnect.",
    },
    {
      name: "Maria Rodriguez",
      college: "Harvard University",
      program: "Business Administration",
      quote:
        "The expert guidance and college matching made my dream of attending Harvard a reality.",
    },
  ];

  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Success Stories
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          Real students, real results. See how EduConnect has transformed
          educational journeys.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {stories.map((story) => (
          <div
            key={story.name}
            className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/15 dark:hover:bg-slate-800/40 transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">
                  {story.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {story.name}
              </h3>
              <p className="text-sm sm:text-base text-brand-400 font-semibold mb-1">
                {story.program}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mb-4">
                {story.college}
              </p>
              <blockquote className="text-sm sm:text-base text-slate-300 italic leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Call to Action Section
export function CallToAction() {
  return (
    <section className="container-responsive sm:mt-20 md:mt-24 px-6 sm:px-8 pb-5 md:pb-10 lg:pb-16">
      <div
        className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 md:p-16 text-center"
        style={{
          background: `linear-gradient(135deg, 
            rgba(99, 102, 241, 0.1) 0%, 
            rgba(6, 182, 212, 0.1) 100%),
            radial-gradient(
              800px 400px at 50% 50%,
              rgba(99, 102, 241, 0.2),
              transparent
            )`,
        }}
      >
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200/90 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Join thousands of students who have found their perfect college.
            Your educational future starts here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/colleges"
              className="btn-hero text-base sm:text-lg md:text-xl w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5"
            >
              Explore Colleges
              <span className="btn-hero-icon">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
            <Link
              href="/admission"
              className="btn-hero-outline text-base sm:text-lg md:text-xl w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5"
            >
              Start Application
              <span className="btn-hero-icon"></span>
            </Link>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-brand-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-tr from-accent-500/20 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
