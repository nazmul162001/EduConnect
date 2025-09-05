"use client";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";
import { useAuth } from "@/hooks/useAuth";
import { getColleges } from "@/lib/data";
import { saveToStorage, storageKeys } from "@/lib/storage";
import { AdmissionForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, GraduationCap, Upload } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  candidateName: z.string().min(2),
  subject: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  address: z.string().min(4),
  dateOfBirth: z.string(),
  imageUrl: z.string().url().or(z.literal("")),
  collegeId: z.string().min(1),
});

function InnerAdmission() {
  const colleges = getColleges();
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const preselected = params.get("college") ?? "";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<AdmissionForm>({
    resolver: zodResolver(schema),
    defaultValues: { collegeId: preselected, email: user?.email ?? "" },
  });
  const selected = watch("collegeId");

  const onSubmit = (values: AdmissionForm) => {
    saveToStorage(storageKeys.myCollege, values);
    reset();
    router.push("/my-college");
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
                  >
                    <option value="">Choose a college to apply to...</option>
                    {colleges.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} - Rating: {c.rating.toFixed(1)} • Research:{" "}
                        {c.researchPapers.length}
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
                    {...register("candidateName")}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                    placeholder="Enter your full name"
                  />
                  {errors.candidateName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.candidateName.message}
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
                    {...register("subject")}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                    placeholder="e.g., Computer Science, Medicine"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.subject.message}
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
                      {...register("imageUrl")}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                      placeholder="https://example.com/image.jpg"
                    />
                    <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                  </div>
                  {errors.imageUrl && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.imageUrl.message}
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
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Submit Application
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
    <Suspense
      fallback={<div className="container-responsive py-10">Loading...</div>}
    >
      <InnerAdmission />
    </Suspense>
  );
}
