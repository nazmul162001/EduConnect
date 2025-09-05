import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Admission } from "./admissionSlice";

interface CreateAdmissionRequest {
  studentName: string;
  email: string;
  phone: string;
  course: string;
  collegeId: string;
}

interface UpdateAdmissionRequest {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "WAITLISTED";
}

interface AdmissionResponse {
  message: string;
  admission: Admission;
}

export const admissionApi = createApi({
  reducerPath: "admissionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admissions",
    credentials: "include",
  }),
  tagTypes: ["Admission"],
  endpoints: (builder) => ({
    getAdmissions: builder.query<{ admissions: Admission[] }, void>({
      query: () => "/",
      providesTags: ["Admission"],
    }),
    getAdmissionById: builder.query<{ admission: Admission }, string>({
      query: (id) => `/${id}`,
      providesTags: ["Admission"],
    }),
    createAdmission: builder.mutation<
      AdmissionResponse,
      CreateAdmissionRequest
    >({
      query: (admissionData) => ({
        url: "/",
        method: "POST",
        body: admissionData,
      }),
      invalidatesTags: ["Admission"],
    }),
    updateAdmission: builder.mutation<
      AdmissionResponse,
      UpdateAdmissionRequest
    >({
      query: ({ id, status }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Admission"],
    }),
    deleteAdmission: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admission"],
    }),
  }),
});

export const {
  useGetAdmissionsQuery,
  useGetAdmissionByIdQuery,
  useCreateAdmissionMutation,
  useUpdateAdmissionMutation,
  useDeleteAdmissionMutation,
} = admissionApi;
