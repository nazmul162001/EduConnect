"use client";
import { useAuth } from "@/hooks/useAuth";
import {
  useGetAdmissionsQuery,
  useUpdateAdmissionMutation,
} from "@/redux/features/admission/admissionApi";
import { useEffect, useState } from "react";

// Import components
import ApplicationDetailsCard from "@/components/my-college/ApplicationDetailsCard";
import ApplicationProgressCard from "@/components/my-college/ApplicationProgressCard";
import AppliedCollegeCard from "@/components/my-college/AppliedCollegeCard";
import EditApplicationModal from "@/components/my-college/EditApplicationModal";
import ExperienceReviewCard from "@/components/my-college/ExperienceReviewCard";
import LoadingState from "@/components/my-college/LoadingState";
import NoApplicationState from "@/components/my-college/NoApplicationState";
import PageHeader from "@/components/my-college/PageHeader";
import QuickStatsCard from "@/components/my-college/QuickStatsCard";

export default function MyCollegePage() {
  useAuth(); // Keep auth hook for potential future use
  const { data: admissionsData, isLoading, error } = useGetAdmissionsQuery();
  const [updateAdmission, { isLoading: isUpdating }] =
    useUpdateAdmissionMutation();
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
  const daysApplied = Math.floor(
    (currentTime.getTime() -
      new Date(application?.applicationDate || new Date()).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateApplication = async (data: {
    admissionId: string;
    studentName: string;
    course: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    profileImage?: string;
    address?: string;
  }) => {
    await updateAdmission(data).unwrap();
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen py-10"
        style={{
          background: `radial-gradient(1200px 600px at 10% 10%, rgba(99, 102, 241, 0.15), transparent), radial-gradient(1000px 600px at 90% 20%, rgba(6, 182, 212, 0.15), transparent), var(--background)`,
        }}
      >
        <LoadingState />
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
        <NoApplicationState />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10"
      style={{
        background: `radial-gradient(1200px 600px at 10% 10%, rgba(99, 102, 241, 0.15), transparent), radial-gradient(1000px 600px at 90% 20%, rgba(6, 182, 212, 0.15), transparent), var(--background)`,
      }}
    >
      <div className="container-responsive max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <PageHeader />

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Application Progress Card */}
            <ApplicationProgressCard
              applicationProgress={applicationProgress}
            />

            {/* Application Details Card */}
            <ApplicationDetailsCard
              application={application}
              onEditClick={openEditModal}
            />

            {/* Share Your Experience Card */}
            <ExperienceReviewCard
              collegeId={college.id}
              collegeName={college.name}
              collegeData={college}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Applied College Card */}
            <AppliedCollegeCard college={college} />

            {/* Quick Stats Card */}
            <QuickStatsCard
              applicationProgress={applicationProgress}
              daysApplied={daysApplied}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditApplicationModal
        isOpen={isEditModalOpen}
        application={application}
        onClose={closeEditModal}
        onUpdate={handleUpdateApplication}
        isUpdating={isUpdating}
      />
    </div>
  );
}
