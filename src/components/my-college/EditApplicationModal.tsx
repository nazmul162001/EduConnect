"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React from "react";
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

interface Application {
  id: string;
  studentName: string;
  course: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: string;
  profileImage?: string;
}

interface EditApplicationModalProps {
  isOpen: boolean;
  application: Application | null;
  onClose: () => void;
  onUpdate: (data: {
    admissionId: string;
    studentName: string;
    course: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    profileImage?: string;
    address?: string;
  }) => Promise<void>;
  isUpdating: boolean;
}

export default function EditApplicationModal({
  isOpen,
  application,
  onClose,
  onUpdate,
  isUpdating,
}: EditApplicationModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EditForm>({
    resolver: zodResolver(editSchema),
  });

  // Pre-populate form when application changes
  React.useEffect(() => {
    if (application && isOpen) {
      setValue("studentName", application.studentName);
      setValue("course", application.course);
      setValue("email", application.email);
      setValue("phone", application.phone);
      setValue("address", application.address || "");
      setValue("dateOfBirth", application.dateOfBirth || "");
      setValue("profileImage", application.profileImage || "");
    }
  }, [application, isOpen, setValue]);

  const onSubmit = async (values: EditForm) => {
    if (!application) return;

    try {
      await onUpdate({
        admissionId: application.id,
        studentName: values.studentName,
        course: values.course,
        email: values.email,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth,
        profileImage: values.profileImage || undefined,
        address: values.address,
      });

      await Swal.fire({
        title: "Application Updated!",
        text: "Your application details have been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3b82f6",
      });

      onClose();
    } catch (error: unknown) {
      console.error("Error updating application:", error);
      let errorMessage = "Failed to update application. Please try again.";
      if (error && typeof error === "object" && "data" in error) {
        const errorData = (error as Record<string, { error?: string }>).data;
        if (errorData?.error) {
          errorMessage = errorData.error;
        }
      }

      await Swal.fire({
        title: "Update Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              Edit Application Details
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                onClick={handleClose}
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
  );
}
