"use client";
import { SlideUp } from "@/components/motion/MotionPrimitives";
import {
  BookOpen,
  Calendar,
  Edit,
  FileText,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";

interface Application {
  id: string;
  studentName: string;
  course: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  applicationDate: string;
  address?: string;
}

interface ApplicationDetailsCardProps {
  application: Application;
  onEditClick: () => void;
}

export default function ApplicationDetailsCard({
  application,
  onEditClick,
}: ApplicationDetailsCardProps) {
  return (
    <SlideUp>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Application Details
              </h2>
              <p className="text-blue-200 text-sm sm:text-base">
                Your personal information
              </p>
            </div>
          </div>
          <button
            onClick={onEditClick}
            className="group flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Edit Details
          </button>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-blue-200 text-sm font-medium">
              Full Name
            </label>
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
              <p className="text-white font-semibold text-sm sm:text-base truncate">
                {application.studentName}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-blue-200 text-sm font-medium">
              Preferred Subject
            </label>
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
              <p className="text-white font-semibold text-sm sm:text-base truncate">
                {application.course}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-blue-200 text-sm font-medium">
              Email Address
            </label>
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
              <p className="text-white text-sm sm:text-base truncate">
                {application.email}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-blue-200 text-sm font-medium">
              Phone Number
            </label>
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
              <p className="text-white text-sm sm:text-base truncate">
                {application.phone}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-blue-200 text-sm font-medium">
              Date of Birth
            </label>
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
              <p className="text-white text-sm sm:text-base">
                {new Date(application.dateOfBirth || "").toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-blue-200 text-sm font-medium">
              Application Date
            </label>
            <div className="flex items-center gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
              <p className="text-white text-sm sm:text-base">
                {new Date(application.applicationDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-2">
            <label className="block text-blue-200 text-sm font-medium">
              Complete Address
            </label>
            <div className="flex items-start gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-white text-sm sm:text-base break-words">
                {application.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideUp>
  );
}
