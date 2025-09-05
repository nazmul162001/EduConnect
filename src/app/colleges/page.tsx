"use client";
import { CollegeCard } from "@/components/college/CollegeCard";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import { getColleges } from "@/lib/colleges-api";
import { College } from "@/types";
import { useEffect, useState } from "react";

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollegesData = async () => {
      try {
        setLoading(true);
        const data = await getColleges();
        setColleges(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setError("Failed to load colleges");
      } finally {
        setLoading(false);
      }
    };

    fetchCollegesData();
  }, []);

  if (loading) {
    return (
      <div className="container-responsive py-10">
        <h1 className="text-3xl font-bold">All Colleges</h1>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-gray-800/50 rounded-lg p-6 animate-pulse"
            >
              <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-responsive py-10">
        <h1 className="text-3xl font-bold">All Colleges</h1>
        <div className="text-center py-12">
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-10">
      <h1 className="text-3xl font-bold">All Colleges ({colleges.length})</h1>
      <StaggerContainer>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((c) => (
            <StaggerItem key={c._id || c.id}>
              <CollegeCard college={c} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </div>
  );
}
