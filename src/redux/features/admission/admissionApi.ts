import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AdmissionResponse,
  CreateAdmissionRequest,
  GetAdmissionsResponse,
} from "./admissionSlice";

export interface UpdateAdmissionRequest {
  admissionId: string;
  studentName: string;
  course: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  profileImage?: string;
  address?: string;
}

export const admissionApi = createApi({
  reducerPath: "admissionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admissions",
  }),
  tagTypes: ["Admission"],
  endpoints: (builder) => ({
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Add the new admission to the store
          dispatch(
            admissionApi.util.updateQueryData(
              "getAdmissions",
              undefined,
              (draft) => {
                draft.admissions.unshift(data.admission);
              }
            )
          );
        } catch (error) {
          console.error("Error creating admission:", error);
        }
      },
    }),
    updateAdmission: builder.mutation<
      AdmissionResponse,
      UpdateAdmissionRequest
    >({
      query: (admissionData) => ({
        url: "/",
        method: "PUT",
        body: admissionData,
      }),
      invalidatesTags: ["Admission"],
      async onQueryStarted({ admissionId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Optimistically update the cache
          dispatch(
            admissionApi.util.updateQueryData(
              "getAdmissions",
              undefined,
              (draft) => {
                const admission = draft.admissions.find(
                  (a) => a.id === admissionId
                );
                if (admission) {
                  Object.assign(admission, data.admission);
                }
              }
            )
          );
        } catch {
          // If the update fails, the cache will be invalidated and refetched
        }
      },
    }),
    getAdmissions: builder.query<GetAdmissionsResponse, void>({
      query: () => "/",
      providesTags: ["Admission"],
    }),
  }),
});

export const {
  useCreateAdmissionMutation,
  useUpdateAdmissionMutation,
  useGetAdmissionsQuery,
} = admissionApi;
