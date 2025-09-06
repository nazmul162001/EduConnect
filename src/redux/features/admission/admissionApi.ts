import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AdmissionResponse,
  CreateAdmissionRequest,
  GetAdmissionsResponse,
} from "./admissionSlice";

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
    getAdmissions: builder.query<GetAdmissionsResponse, void>({
      query: () => "/",
      providesTags: ["Admission"],
    }),
  }),
});

export const { useCreateAdmissionMutation, useGetAdmissionsQuery } =
  admissionApi;
