"use client";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeft,
  Calendar,
  Edit3,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  // Mock data for demonstration - in real app, this would come from user's profile
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
      street: "123 University Avenue",
      city: "Stanford",
      state: "California",
      zipCode: "94305",
      country: "United States",
    },
    phone: "+1 (555) 123-4567",
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
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
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
                        <Phone className="w-5 h-5 text-green-400" />
                        <span className="text-slate-200">
                          {userProfile.phone}
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
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-green-400" />
                  <h3 className="text-2xl font-bold text-white">
                    Address Information
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-20">Street:</span>
                    <span className="text-white font-medium">
                      {userProfile.address.street}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-20">City:</span>
                    <span className="text-white font-medium">
                      {userProfile.address.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-20">State:</span>
                    <span className="text-white font-medium">
                      {userProfile.address.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300 w-20">ZIP:</span>
                    <span className="text-white font-medium">
                      {userProfile.address.zipCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">
                      {userProfile.address.country}
                    </span>
                  </div>
                </div>
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
    </div>
  );
}
