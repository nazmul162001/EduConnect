"use client";
import { Review } from "@/types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface ReviewData {
  _id: string;
  collegeId: string;
  userId: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  rating: number;
  comment: string;
  university?: string;
  createdAt: string;
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
          // Transform the data to match the expected format
          const transformedReviews = data.data.map((review: ReviewData) => ({
            _id: review._id,
            id: review._id,
            collegeId: review.collegeId,
            userId: review.userId,
            userName: review.userName,
            firstName: review.firstName,
            lastName: review.lastName,
            rating: review.rating,
            comment: review.comment,
            university: review.university,
            createdAt: review.createdAt,
          }));
          setReviews(transformedReviews);
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
