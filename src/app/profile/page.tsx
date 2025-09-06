"use client";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import {
  ArrowLeft,
  Calendar,
  Edit3,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Save,
  Shield,
  Star,
  User,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [error, setError] = useState("");

  // Initialize edit form with current user data
  const initializeEditForm = () => {
    setEditForm({
      name: userProfile.name,
      email: userProfile.email,
    });
  };

  // Initialize address form with current user data
  const initializeAddressForm = () => {
    setAddressForm({
      street: userProfile.address.street,
      city: userProfile.address.city,
      state: userProfile.address.state,
      zipCode: userProfile.address.zipCode,
      country: userProfile.address.country,
    });
  };

  // Handle edit button click
  const handleEditClick = () => {
    initializeEditForm();
    setIsEditModalOpen(true);
  };

  // Handle address edit button click
  const handleAddressEditClick = () => {
    initializeAddressForm();
    setIsAddressModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle address form input changes
  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    setError("");

    // Basic validation
    if (!editForm.name.trim() || !editForm.email.trim()) {
      setError("Name and email are required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const result = await updateProfile({
        name: editForm.name.trim(),
        email: editForm.email.trim().toLowerCase(),
      }).unwrap();

      // Success - close modal and show success message
      setIsEditModalOpen(false);
      setEditForm({ name: "", email: "" });

      // For NextAuth users, update the session to reflect the changes
      if (session?.user) {
        await updateSession();
      }

      // You could show a success toast here
      console.log("Profile updated successfully:", result);
    } catch (error: unknown) {
      console.error("Error updating profile:", error);

      // Handle different error types
      if (error && typeof error === "object" && "data" in error) {
        const errorData = error as {
          data?: { error?: string };
          status?: number;
        };
        if (errorData.data?.error) {
          setError(errorData.data.error);
        } else if (errorData.status === 401) {
          setError("Please log in again to update your profile");
        } else if (errorData.status === 409) {
          setError("This email is already taken by another user");
        } else {
          setError("Failed to update profile. Please try again.");
        }
      } else {
        setError("Failed to update profile. Please try again.");
      }
    }
  };

  // Handle address save changes
  const handleAddressSaveChanges = async () => {
    setError("");

    try {
      const result = await updateProfile({
        name: userProfile.name,
        email: userProfile.email,
        street: addressForm.street.trim(),
        city: addressForm.city.trim(),
        state: addressForm.state.trim(),
        zipCode: addressForm.zipCode.trim(),
        country: addressForm.country.trim(),
      }).unwrap();

      // Success - close modal and show success message
      setIsAddressModalOpen(false);
      setAddressForm({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });

      console.log("Address updated successfully:", result);

      // For NextAuth users, update the session to reflect the changes
      if (session?.user) {
        await updateSession();
      }

      // The RTK Query mutation will automatically update the user data in the store
      // and trigger a re-render, so we don't need to manually update userProfile
    } catch (error: unknown) {
      console.error("Error updating address:", error);

      // Handle different error types
      if (error && typeof error === "object" && "data" in error) {
        const errorData = error as {
          data?: { error?: string };
          status?: number;
        };
        if (errorData.data?.error) {
          setError(errorData.data.error);
        } else if (errorData.status === 401) {
          setError("Please log in again to update your address");
        } else {
          setError("Failed to update address. Please try again.");
        }
      } else {
        setError("Failed to update address. Please try again.");
      }
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditForm({ name: "", email: "" });
    setError("");
  };

  // Handle address modal close
  const handleAddressCloseModal = () => {
    setIsAddressModalOpen(false);
    setAddressForm({
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });
    setError("");
  };

  // User profile data - using real user data from auth
  const userProfile = {
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    avatar: user?.avatar || null,
    role: user?.role || "Student",
    university: "Stanford University",
    universityLogo:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop&crop=center",
    major: "Computer Science",
    graduationYear: "2025",
    gpa: "3.8",
    address: {
      street: user?.street || "",
      city: user?.city || "",
      state: user?.state || "",
      zipCode: user?.zipCode || "",
      country: user?.country || "",
    },
    joinDate: "September 2023",
    applications: 3,
    acceptedColleges: 2,
    profileCompleteness: 85,
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <div className="container-responsive pt-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="h-6 w-px bg-slate-600"></div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
        </div>
      </div>

      <div className="container-responsive pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Main Profile Content */}
          <div className="space-y-8">
            {/* Profile Header Card */}
            <FadeIn delay={0.1}>
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-purple-500/30 shadow-2xl">
                      {userProfile.avatar ? (
                        <Image
                          src={userProfile.avatar}
                          alt={userProfile.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                          <User className="w-16 h-16 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                          {userProfile.name}
                        </h2>
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-5 h-5 text-purple-400" />
                          <span className="text-purple-400 font-medium">
                            {userProfile.role}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleEditClick}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <span className="text-slate-200">
                          {userProfile.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-yellow-400" />
                        <span className="text-slate-200">
                          Joined {userProfile.joinDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-slate-200">
                          GPA: {userProfile.gpa}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* University Information */}
            <FadeIn delay={0.2}>
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">
                    University Information
                  </h3>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-purple-500/30">
                    <Image
                      src={userProfile.universityLogo}
                      alt={userProfile.university}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {userProfile.university}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300">Major:</span>
                        <span className="text-white font-medium">
                          {userProfile.major}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300">Graduation Year:</span>
                        <span className="text-white font-medium">
                          {userProfile.graduationYear}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300">Current GPA:</span>
                        <span className="text-white font-medium">
                          {userProfile.gpa}/4.0
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Address Information */}
            <FadeIn delay={0.3}>
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-green-400" />
                    <h3 className="text-2xl font-bold text-white">
                      Address Information
                    </h3>
                  </div>
                  {userProfile.address.street ||
                  userProfile.address.city ||
                  userProfile.address.state ||
                  userProfile.address.zipCode ||
                  userProfile.address.country ? (
                    <button
                      onClick={handleAddressEditClick}
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                  ) : null}
                </div>

                {/* Check if address data exists */}
                {userProfile.address.street ||
                userProfile.address.city ||
                userProfile.address.state ||
                userProfile.address.zipCode ||
                userProfile.address.country ? (
                  <div className="space-y-3">
                    {userProfile.address.street && (
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300 w-20">Street:</span>
                        <span className="text-white font-medium">
                          {userProfile.address.street}
                        </span>
                      </div>
                    )}
                    {userProfile.address.city && (
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300 w-20">City:</span>
                        <span className="text-white font-medium">
                          {userProfile.address.city}
                        </span>
                      </div>
                    )}
                    {userProfile.address.state && (
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300 w-20">State:</span>
                        <span className="text-white font-medium">
                          {userProfile.address.state}
                        </span>
                      </div>
                    )}
                    {userProfile.address.zipCode && (
                      <div className="flex items-center gap-3">
                        <span className="text-slate-300 w-20">ZIP:</span>
                        <span className="text-white font-medium">
                          {userProfile.address.zipCode}
                        </span>
                      </div>
                    )}
                    {userProfile.address.country && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">
                          {userProfile.address.country}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400 mb-4">
                      No address information added yet
                    </p>
                    <button
                      onClick={handleAddressEditClick}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mx-auto"
                    >
                      <Edit3 className="w-4 h-4" />
                      Add Address
                    </button>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completeness */}
            <FadeIn delay={0.1}>
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  Profile Completeness
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Overall Progress</span>
                    <span className="text-white font-semibold">
                      {userProfile.profileCompleteness}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${userProfile.profileCompleteness}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-400">
                    Complete your profile to unlock more features
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Application Stats */}
            <FadeIn delay={0.2}>
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  Application Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-blue-400" />
                      </div>
                      <span className="text-slate-300">Applications</span>
                    </div>
                    <span className="text-white font-bold text-xl">
                      {userProfile.applications}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-slate-300">Accepted</span>
                    </div>
                    <span className="text-white font-bold text-xl">
                      {userProfile.acceptedColleges}
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Quick Actions */}
            <FadeIn delay={0.3}>
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/admission"
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 rounded-lg transition-all duration-300 group"
                  >
                    <GraduationCap className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-white">New Application</span>
                  </Link>
                  <Link
                    href="/my-college"
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 rounded-lg transition-all duration-300 group"
                  >
                    <Star className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                    <span className="text-white">My Applications</span>
                  </Link>
                  <Link
                    href="/colleges"
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 rounded-lg transition-all duration-300 group"
                  >
                    <Globe className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-white">Browse Colleges</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  disabled={isUpdating}
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                  disabled={isUpdating}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-3 p-6 border-t border-slate-700">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isUpdating}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address Edit Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">Edit Address</h2>
              <button
                onClick={handleAddressCloseModal}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Street Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={addressForm.street}
                  onChange={handleAddressInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your street address"
                  disabled={isUpdating}
                />
              </div>

              {/* City Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={addressForm.city}
                  onChange={handleAddressInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your city"
                  disabled={isUpdating}
                />
              </div>

              {/* State Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  State/Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={addressForm.state}
                  onChange={handleAddressInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your state or province"
                  disabled={isUpdating}
                />
              </div>

              {/* ZIP Code Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={addressForm.zipCode}
                  onChange={handleAddressInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your ZIP or postal code"
                  disabled={isUpdating}
                />
              </div>

              {/* Country Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={addressForm.country}
                  onChange={handleAddressInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your country"
                  disabled={isUpdating}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-3 p-6 border-t border-slate-700">
              <button
                onClick={handleAddressCloseModal}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={handleAddressSaveChanges}
                disabled={isUpdating}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Address
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
