"use client";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";
import { useAuth } from "@/hooks/useAuth";
import {
  useGetAdmissionsQuery,
  useUpdateAdmissionMutation,
} from "@/redux/features/admission/admissionApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get the most recent admission application
  const application = admissionsData?.admissions?.[0];
  const college = application?.college;

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate application progress
  const getApplicationProgress = () => {
    if (!application) return 0;
    const daysSinceApplication = Math.floor(
      (currentTime.getTime() -
        new Date(application.applicationDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return Math.min(daysSinceApplication * 2, 100); // 2% per day, max 100%
  };

  const applicationProgress = getApplicationProgress();

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
        <div className="container-responsive max-w-7xl mx-auto px-6">
          {/* Enhanced Loading Header */}
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-12 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-lg w-80 mx-auto mb-4"></div>
              <div className="h-6 bg-white/20 rounded w-96 mx-auto mb-8"></div>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              <span className="text-blue-200 text-lg">
                Loading your application dashboard...
              </span>
            </div>
          </div>

          {/* Enhanced Loading Grid */}
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-8">
              {/* Application Details Skeleton */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
                <div className="animate-pulse">
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-8 bg-white/20 rounded w-48"></div>
                    <div className="h-10 bg-white/20 rounded-lg w-20"></div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 bg-white/10 rounded w-24"></div>
                        <div className="h-6 bg-white/20 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience Card Skeleton */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
                <div className="animate-pulse">
                  <div className="h-8 bg-white/20 rounded w-56 mb-8"></div>
                  <div className="space-y-6">
                    <div className="h-6 bg-white/10 rounded w-32"></div>
                    <div className="flex space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-8 w-8 bg-white/20 rounded"
                        ></div>
                      ))}
                    </div>
                    <div className="h-32 bg-white/10 rounded-lg"></div>
                    <div className="h-12 bg-white/20 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              {/* College Card Skeleton */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
                <div className="animate-pulse">
                  <div className="h-8 bg-white/20 rounded w-40 mb-6"></div>
                  <div className="text-center space-y-4">
                    <div className="h-6 bg-white/20 rounded w-32 mx-auto"></div>
                    <div className="h-12 bg-white/20 rounded-lg"></div>
                    <div className="h-4 bg-white/10 rounded w-24 mx-auto"></div>
                    <div className="h-6 bg-white/20 rounded w-28 mx-auto"></div>
                    <div className="h-16 bg-white/10 rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Stats Card Skeleton */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
                <div className="animate-pulse">
                  <div className="h-8 bg-white/20 rounded w-32 mb-6"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="h-4 bg-white/10 rounded w-20"></div>
                        <div className="h-6 bg-white/20 rounded w-16"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
        <div className="container-responsive max-w-7xl mx-auto px-6">
          {/* Enhanced Header */}
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full mb-6">
                <GraduationCap className="w-10 h-10 text-blue-400" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                My College Application
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Your gateway to higher education. Track applications, manage
                documents, and stay connected with your academic journey.
              </p>
            </div>
          </FadeIn>

          {/* Enhanced No Application State */}
          <SlideUp>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-12 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full mb-8">
                    <FileText className="w-12 h-12 text-blue-400" />
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-6">
                    Ready to Begin Your Journey?
                  </h2>

                  <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    You haven't submitted any college applications yet. Take the
                    first step towards your dream education by applying to your
                    preferred college.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                      href="/admission"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Zap className="w-5 h-5 group-hover:animate-pulse" />
                      Start Application
                    </Link>

                    <Link
                      href="/colleges"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300"
                    >
                      <Eye className="w-5 h-5" />
                      Browse Colleges
                    </Link>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        15+
                      </div>
                      <div className="text-blue-200 text-sm">
                        Colleges Available
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        95%
                      </div>
                      <div className="text-blue-200 text-sm">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        24/7
                      </div>
                      <div className="text-blue-200 text-sm">
                        Support Available
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      <div className="container-responsive max-w-7xl mx-auto px-6">
        {/* Enhanced Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full mb-6">
              <GraduationCap className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
              My College Application
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Track your application progress, manage your academic journey, and
              stay connected with your chosen institution.
            </p>
          </div>
        </FadeIn>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Application Progress Card */}
            <SlideUp>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Application Progress
                        </h2>
                        <p className="text-blue-200">
                          Track your admission journey
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">
                        {applicationProgress}%
                      </div>
                      <div className="text-blue-200 text-sm">Complete</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${applicationProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <div>
                        <div className="text-white font-semibold">
                          Submitted
                        </div>
                        <div className="text-blue-200 text-sm">
                          Application sent
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <Clock className="w-6 h-6 text-yellow-400" />
                      <div>
                        <div className="text-white font-semibold">
                          Under Review
                        </div>
                        <div className="text-blue-200 text-sm">
                          Committee reviewing
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <Target className="w-6 h-6 text-blue-400" />
                      <div>
                        <div className="text-white font-semibold">Decision</div>
                        <div className="text-blue-200 text-sm">
                          Awaiting result
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <Award className="w-6 h-6 text-purple-400" />
                      <div>
                        <div className="text-white font-semibold">
                          Enrollment
                        </div>
                        <div className="text-blue-200 text-sm">Next step</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Application Details Card */}
            <SlideUp>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Application Details
                      </h2>
                      <p className="text-blue-200">Your personal information</p>
                    </div>
                  </div>
                  <button
                    onClick={openEditModal}
                    className="group flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Edit Details
                  </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-blue-200 text-sm font-medium">
                      Full Name
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <Users className="w-5 h-5 text-blue-400" />
                      <p className="text-white font-semibold">
                        {application.studentName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-blue-200 text-sm font-medium">
                      Preferred Subject
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <BookOpen className="w-5 h-5 text-green-400" />
                      <p className="text-white font-semibold">
                        {application.course}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-blue-200 text-sm font-medium">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <p className="text-white">{application.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-blue-200 text-sm font-medium">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <Phone className="w-5 h-5 text-green-400" />
                      <p className="text-white">{application.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-blue-200 text-sm font-medium">
                      Date of Birth
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <p className="text-white">
                        {new Date(
                          application.dateOfBirth || ""
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-blue-200 text-sm font-medium">
                      Application Date
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <p className="text-white">
                        {new Date(
                          application.applicationDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-blue-200 text-sm font-medium">
                      Complete Address
                    </label>
                    <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                      <MapPin className="w-5 h-5 text-red-400 mt-0.5" />
                      <p className="text-white">{application.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Share Your Experience Card */}
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
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Applied College Card */}
            <SlideUp>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Applied College
                    </h2>
                    <p className="text-blue-200 text-sm">
                      Your chosen institution
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {college.name}
                  </h3>

                  <div className="mb-6">
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
                      <CheckCircle className="w-5 h-5" />
                      Application Submitted
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-blue-200 text-sm mb-2">
                        Application Status
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-5 h-5 text-yellow-400" />
                        <p className="text-white font-bold text-lg">
                          Under Review
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-blue-200 text-sm mb-2">
                        Expected Response
                      </p>
                      <p className="text-white font-semibold">2-4 weeks</p>
                    </div>
                  </div>

                  <p className="text-blue-100 text-sm mt-6 leading-relaxed">
                    Your application is being carefully reviewed by our
                    admissions committee. We'll notify you as soon as a decision
                    is made.
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Quick Stats Card */}
            <SlideUp>
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Quick Stats
                    </h2>
                    <p className="text-blue-200 text-sm">
                      Your application metrics
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-blue-200">Days Applied</span>
                    </div>
                    <span className="text-white font-bold">
                      {Math.floor(
                        (currentTime.getTime() -
                          new Date(application.applicationDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-blue-200">Progress</span>
                    </div>
                    <span className="text-white font-bold">
                      {applicationProgress}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-blue-200">Status</span>
                    </div>
                    <span className="text-white font-bold">Active</span>
                  </div>
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
