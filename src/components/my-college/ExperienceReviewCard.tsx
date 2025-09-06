"use client";
import { SlideUp } from "@/components/motion/MotionPrimitives";
import { Heart, MessageCircle, Star } from "lucide-react";
import { useState } from "react";

export default function ExperienceReviewCard() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = () => {
    if (rating === 0 || !comment.trim()) {
      alert("Please provide both a rating and a review comment.");
      return;
    }

    // TODO: Implement review submission
    console.log("Review submitted:", { rating, comment });
    setRating(0);
    setComment("");
    alert("Review submitted successfully!");
  };

  return (
    <SlideUp>
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Share Your Experience
            </h2>
            <p className="text-blue-200">
              Help other students with your insights
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-blue-200 text-sm font-medium mb-4">
              Rate your application experience
            </label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="group transition-all duration-300 hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 transition-all duration-300 ${
                      star <= rating
                        ? "text-yellow-400 fill-current drop-shadow-lg"
                        : "text-gray-400 hover:text-yellow-300 group-hover:scale-110"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-blue-200 text-sm mt-2">
                {rating === 5
                  ? "Excellent!"
                  : rating === 4
                  ? "Great!"
                  : rating === 3
                  ? "Good!"
                  : rating === 2
                  ? "Fair"
                  : "Poor"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-blue-200 text-sm font-medium mb-4">
              Share your thoughts
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience with the application process, what you liked, what could be improved, or any tips for future applicants..."
              className="w-full h-40 px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-400 focus:outline-none text-white placeholder-blue-200 resize-none transition-all duration-300 focus:bg-white/10"
            />
          </div>

          <button
            onClick={handleSubmitReview}
            className="group w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Heart className="w-5 h-5 group-hover:animate-pulse" />
            Submit Review
          </button>
        </div>
      </div>
    </SlideUp>
  );
}
