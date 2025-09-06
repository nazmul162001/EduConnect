"use client";
import { SlideUp } from "@/components/motion/MotionPrimitives";
import { useAuth } from "@/hooks/useAuth";
import { College } from "@/redux/features/admission/admissionSlice";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { Heart, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

interface ExperienceReviewCardProps {
  collegeId: string;
  collegeName?: string;
  collegeData?: College;
}

export default function ExperienceReviewCard({
  collegeId,
  collegeName,
  collegeData,
}: ExperienceReviewCardProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const [createReview] = useCreateReviewMutation();
  const { refetch: refetchUser } = useGetCurrentUserQuery();

  const handleSubmitReview = async () => {
    if (rating === 0 || !comment.trim()) {
      Swal.fire({
        title: "Missing Information",
        text: "Please provide both a rating and a review comment.",
        icon: "warning",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (!user) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please log in to submit a review.",
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Refresh user data to get the latest university information
      const { data: freshUserData } = await refetchUser();
      const currentUser = freshUserData?.user || user;

      const userName = currentUser.name || "Anonymous User";
      // Handle multiple universities - take the first one if comma-separated
      // If user's university is empty, use the college name as fallback
      let university = currentUser.university
        ? currentUser.university.split(",")[0].trim()
        : "";

      // Fallback: if university is still empty, use the college name
      if (!university) {
        if (collegeName) {
          university = collegeName;
        } else if (collegeData?.name) {
          university = collegeData.name;
        }
      }

      console.log("=== Review Submission Debug ===");
      console.log("Original user object:", user);
      console.log("Fresh user data:", currentUser);
      console.log("University field:", currentUser.university);
      console.log("College name:", collegeName);
      console.log("College data:", collegeData);
      console.log("Processed university:", university);

      const reviewData = {
        rating,
        comment: comment.trim(),
        collegeId,
        userName,
        firstName: userName.split(" ")[0],
        lastName: userName.split(" ").slice(1).join(" "),
        university,
      };

      await createReview(reviewData).unwrap();

      Swal.fire({
        title: "Review Submitted!",
        text: "Thank you for sharing your experience. Your review helps other students make informed decisions.",
        icon: "success",
        confirmButtonColor: "#10b981",
      });

      // Reset form
      setRating(0);
      setComment("");
    } catch (error: unknown) {
      console.error("Error submitting review:", error);
      const errorMessage =
        (error as { data?: { error?: string } })?.data?.error ||
        "Failed to submit review. Please try again.";

      Swal.fire({
        title: "Submission Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="group w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 group-hover:animate-pulse" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </div>
    </SlideUp>
  );
}
