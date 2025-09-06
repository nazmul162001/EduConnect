"use client";
import { Protected } from "@/components/auth/Protected";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";
import { useAuth } from "@/hooks/useAuth";
import { useCreateAdmissionMutation } from "@/redux/features/admission/admissionApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, GraduationCap, Upload } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

const schema = z.object({
  studentName: z.string().min(2, "Full name must be at least 2 characters"),
  course: z.string().min(2, "Course must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
  address: z.string().min(4, "Address must be at least 4 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  profileImage: z.string().url("Please enter a valid URL").or(z.literal("")),
  collegeId: z.string().min(1, "Please select a college"),
});

type AdmissionForm = z.infer<typeof schema>;

function InnerAdmission() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const preselected = params.get("college") ?? "";
  const [colleges, setColleges] = useState<any[]>([]);
  const [isLoadingColleges, setIsLoadingColleges] = useState(true);

  const [createAdmission, { isLoading: isSubmitting }] =
    useCreateAdmissionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AdmissionForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      collegeId: preselected,
      email: user?.email ?? "",
      studentName: user?.name ?? "",
      phone: user?.phone ?? "",
      address:
        user?.street && user?.city && user?.state && user?.country
          ? `${user.street}, ${user.city}, ${user.state}, ${user.country}`
          : "",
    },
  });
  const selected = watch("collegeId");

  // Fetch colleges from API
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("/api/colleges");
        const data = await response.json();
        if (data.success) {
          setColleges(data.colleges);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setIsLoadingColleges(false);
      }
    };

    fetchColleges();
  }, []);

  const onSubmit = async (values: AdmissionForm) => {
    try {
      const result = await createAdmission({
        collegeId: values.collegeId,
        studentName: values.studentName,
        course: values.course,
        email: values.email,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth,
        profileImage: values.profileImage || undefined,
        address: values.address,
      }).unwrap();

      // Show success message
      await Swal.fire({
        title: "Application Submitted!",
        text: "Your college admission application has been submitted successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3b82f6",
      });

      // Reset form and redirect
      reset();
      router.push("/my-college");
    } catch (error: any) {
      console.error("Error submitting application:", error);

      // Show error message
      await Swal.fire({
        title: "Submission Failed",
        text:
          error?.data?.error ||
          "Failed to submit application. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div
      className="min-h-screen py-10"
      style={{
        background: `radial-gradient(1200px 600px at 10% 10%, rgba(99, 102, 241, 0.15), transparent), radial-gradient(1000px 600px at 90% 20%, rgba(6, 182, 212, 0.15), transparent), var(--background)`,
      }}
    >
      <div className="container-responsive max-w-4xl mx-auto">
        {/* Header Section */}
        <FadeIn>
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-2xl"
            >
              <GraduationCap className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              College Admission
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Take the first step towards your academic future. Fill out the
              application form below.
            </p>
          </div>
        </FadeIn>

        {/* Application Form Card */}
        <SlideUp>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Application Form
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* College Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label className="block text-white font-semibold mb-2">
                  Select College <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("collegeId")}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none appearance-none text-white placeholder-blue-200"
                    disabled={isLoadingColleges}
                  >
                    <option value="">
                      {isLoadingColleges
                        ? "Loading colleges..."
                        : "Choose a college to apply to..."}
                    </option>
                    {colleges.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} - Rating: {c.rating.toFixed(1)} • Location:{" "}
                        {c.location}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 pointer-events-none" />
                </div>
                {errors.collegeId && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.collegeId.message}
                  </p>
                )}
              </motion.div>

              {/* Two Column Layout */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className="block text-white font-semibold mb-2">
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
                </motion.div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label className="block text-white font-semibold mb-2">
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
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="block text-white font-semibold mb-2">
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
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-white font-semibold mb-2">
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
                </motion.div>

                {/* Date of Birth */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-white font-semibold mb-2">
                    Date of Birth <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register("dateOfBirth")}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 pointer-events-none" />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </motion.div>

                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label className="block text-white font-semibold mb-2">
                    Profile Image
                  </label>
                  <div className="relative">
                    <input
                      {...register("profileImage")}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                      placeholder="https://example.com/image.jpg"
                    />
                    <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  </div>
                  {errors.profileImage && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.profileImage.message}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Address - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label className="block text-white font-semibold mb-2">
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
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="pt-6"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {isSubmitting
                    ? "Submitting Application..."
                    : "Submit Application"}
                </button>
              </motion.div>

              {/* Footer Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="text-center pt-4"
              >
                <p className="text-blue-200 text-sm">
                  * Required fields. Please ensure all information is accurate
                  before submission.
                </p>
              </motion.div>
            </form>
          </div>
        </SlideUp>
      </div>
    </div>
  );
}

export default function AdmissionPage() {
  return (
    <Protected>
      <Suspense
        fallback={<div className="container-responsive py-10">Loading...</div>}
      >
        <InnerAdmission />
      </Suspense>
    </Protected>
  );
}
