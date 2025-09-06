"use client";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";
import { useAuth } from "@/hooks/useAuth";
import {
  useGetAdmissionsQuery,
  useUpdateAdmissionMutation,
} from "@/redux/features/admission/admissionApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Edit, Mail, MapPin, Phone, Star, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const editSchema = z.object({
  studentName: z.string().min(2, "Full name must be at least 2 characters"),
  course: z.string().min(2, "Course must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
  address: z.string().min(4, "Address must be at least 4 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  profileImage: z.string().url("Please enter a valid URL").or(z.literal("")),
});

type EditForm = z.infer<typeof editSchema>;

export default function MyCollegePage() {
  const { user } = useAuth();
  const { data: admissionsData, isLoading, error } = useGetAdmissionsQuery();
  const [updateAdmission, { isLoading: isUpdating }] =
    useUpdateAdmissionMutation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Get the most recent admission application
  const application = admissionsData?.admissions?.[0];
  const college = application?.college;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EditForm>({
    resolver: zodResolver(editSchema),
  });

  const openEditModal = () => {
    if (application) {
      setValue("studentName", application.studentName);
      setValue("course", application.course);
      setValue("email", application.email);
      setValue("phone", application.phone);
      setValue("address", application.address || "");
      setValue("dateOfBirth", application.dateOfBirth || "");
      setValue("profileImage", application.profileImage || "");
      setIsEditModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    reset();
  };

  const onEditSubmit = async (values: EditForm) => {
    if (!application) return;

    try {
      await updateAdmission({
        admissionId: application.id,
        studentName: values.studentName,
        course: values.course,
        email: values.email,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth,
        profileImage: values.profileImage || undefined,
        address: values.address,
      }).unwrap();

      await Swal.fire({
        title: "Application Updated!",
        text: "Your application details have been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3b82f6",
      });

      closeEditModal();
    } catch (error: any) {
      console.error("Error updating application:", error);
      await Swal.fire({
        title: "Update Failed",
        text:
          error?.data?.error ||
          "Failed to update application. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen py-10"
        style={{
          background: `radial-gradient(1200px 600px at 10% 10%, rgba(99, 102, 241, 0.15), transparent), radial-gradient(1000px 600px at 90% 20%, rgba(6, 182, 212, 0.15), transparent), var(--background)`,
        }}
      >
        <div className="container-responsive max-w-6xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded w-64 mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-96 mb-8"></div>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-white/10 rounded-2xl"></div>
                <div className="h-64 bg-white/10 rounded-2xl"></div>
              </div>
              <div className="h-96 bg-white/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !application || !college) {
    return (
      <div
        className="min-h-screen py-10"
        style={{
          background: `radial-gradient(1200px 600px at 10% 10%, rgba(99, 102, 241, 0.15), transparent), radial-gradient(1000px 600px at 90% 20%, rgba(6, 182, 212, 0.15), transparent), var(--background)`,
        }}
      >
        <div className="container-responsive max-w-6xl mx-auto px-6">
          <FadeIn>
            <h1 className="text-4xl font-bold text-white mb-2">
              My College Application
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Manage your application details and share your experience
            </p>
          </FadeIn>

          <SlideUp>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                No Application Found
              </h2>
              <p className="text-blue-100 mb-6">
                You haven't submitted any college applications yet. Start your
                journey by applying to a college.
              </p>
              <a
                href="/admission"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start Application
              </a>
            </div>
          </SlideUp>
        </div>
      </div>
    );
  }

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
    <div
      className="min-h-screen py-10"
      style={{
        background: `radial-gradient(1200px 600px at 10% 10%, rgba(99, 102, 241, 0.15), transparent), radial-gradient(1000px 600px at 90% 20%, rgba(6, 182, 212, 0.15), transparent), var(--background)`,
      }}
    >
      <div className="container-responsive max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeIn>
          <h1 className="text-4xl font-bold text-white mb-2">
            My College Application
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Manage your application details and share your experience
          </p>
        </FadeIn>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Two Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Details Card */}
            <SlideUp>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Application Details
                  </h2>
                  <button
                    onClick={openEditModal}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <p className="text-white font-semibold">
                      {application.studentName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-1">
                      Preferred Subject
                    </label>
                    <p className="text-white font-semibold">
                      {application.course}
                    </p>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-1">
                      Email
                    </label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-300" />
                      <p className="text-white">{application.email}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-1">
                      Phone
                    </label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-300" />
                      <p className="text-white">{application.phone}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-1">
                      Date of Birth
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-300" />
                      <p className="text-white">
                        {new Date(
                          application.dateOfBirth || ""
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-1">
                      Application Date
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-300" />
                      <p className="text-white">
                        {new Date(
                          application.applicationDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-blue-200 text-sm font-medium mb-1">
                      Address
                    </label>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-300 mt-0.5" />
                      <p className="text-white">{application.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Share Your Experience Card */}
            <SlideUp>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Share Your Experience
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-3">
                      Rate your experience
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="transition-colors"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-400 hover:text-yellow-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-3">
                      Your review
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts about the college and application process..."
                      className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmitReview}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </SlideUp>
          </div>

          {/* Right Column - Applied College Card */}
          <div>
            <SlideUp>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Applied College
                </h2>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {college.name}
                  </h3>

                  <div className="mb-6">
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors">
                      Application Submitted
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-blue-200 text-sm mb-1">
                      Application Status
                    </p>
                    <p className="text-white font-bold text-lg">Under Review</p>
                  </div>

                  <p className="text-blue-100 text-sm mt-4 leading-relaxed">
                    Your application is being reviewed by the admissions
                    committee. You will receive an update within 2-4 weeks.
                  </p>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Edit Application Details
                </h2>
                <button
                  onClick={closeEditModal}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register("studentName")}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                      placeholder="Enter your full name"
                    />
                    {errors.studentName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.studentName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Preferred Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register("course")}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                      placeholder="e.g., Computer Science, Medicine"
                    />
                    {errors.course && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.course.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register("phone")}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Date of Birth <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("dateOfBirth")}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2">
                      Profile Image URL
                    </label>
                    <input
                      {...register("profileImage")}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                      placeholder="https://example.com/image.jpg"
                    />
                    {errors.profileImage && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.profileImage.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Complete Address <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    {...register("address")}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200 resize-none"
                    placeholder="Enter your complete postal address"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {isUpdating ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
