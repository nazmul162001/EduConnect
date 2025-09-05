"use client";

import { useGetAdmissionsQuery } from "@/redux/features/admission/admissionApi";
import {
  addAdmission,
  setAdmissions,
} from "@/redux/features/admission/admissionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";

const AdmissionDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { admissions, loading, error } = useAppSelector(
    (state) => state.admission
  );

  // Using RTK Query hook
  const {
    data: apiAdmissions,
    isLoading: apiLoading,
    error: apiError,
    refetch,
  } = useGetAdmissionsQuery();

  const handleAddDemoAdmission = () => {
    const newAdmission = {
      id: Date.now().toString(),
      studentName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      course: "Computer Science",
      status: "pending" as const,
      applicationDate: new Date().toISOString(),
    };

    dispatch(addAdmission(newAdmission));
  };

  const handleSetDemoAdmissions = () => {
    const demoAdmissions = [
      {
        id: "1",
        studentName: "Alice Smith",
        email: "alice.smith@example.com",
        phone: "+1234567891",
        course: "Mathematics",
        status: "approved" as const,
        applicationDate: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        studentName: "Bob Johnson",
        email: "bob.johnson@example.com",
        phone: "+1234567892",
        course: "Physics",
        status: "pending" as const,
        applicationDate: "2024-01-16T11:00:00Z",
      },
    ];

    dispatch(setAdmissions(demoAdmissions));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Redux Admission Demo</h1>

      {/* Redux State Display */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Redux State (Local)</h2>
        <div className="mb-4">
          <button
            onClick={handleAddDemoAdmission}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
          >
            Add Demo Admission
          </button>
          <button
            onClick={handleSetDemoAdmissions}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Set Demo Admissions
          </button>
        </div>

        {loading && <p className="text-blue-600">Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Admissions in Redux State:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(admissions, null, 2)}
          </pre>
        </div>
      </div>

      {/* RTK Query API Display */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">RTK Query API</h2>
        <div className="mb-4">
          <button
            onClick={() => refetch()}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Refetch API Data
          </button>
        </div>

        {apiLoading && <p className="text-blue-600">API Loading...</p>}
        {apiError && (
          <p className="text-red-600">API Error: {JSON.stringify(apiError)}</p>
        )}

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">API Response:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(apiAdmissions, null, 2)}
          </pre>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">Instructions:</h3>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>
            • Click "Add Demo Admission" to add a single admission to Redux
            state
          </li>
          <li>
            • Click "Set Demo Admissions" to populate Redux state with demo data
          </li>
          <li>• Click "Refetch API Data" to test the RTK Query API call</li>
          <li>
            • The API call will fail (404) since we don't have a real backend,
            but it demonstrates the setup
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdmissionDemo;
