import { apiSlice } from "@/redux/apiSlice";
import { Admission } from "./admissionSlice";

export const admissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all admissions
    getAdmissions: builder.query<Admission[], void>({
      query: () => "/api/admissions",
      providesTags: ["ADMISSION"],
    }),

    // Get admission by ID
    getAdmissionById: builder.query<Admission, string>({
      query: (id) => `/api/admissions/${id}`,
      providesTags: (result, error, id) => [{ type: "ADMISSION", id }],
    }),

    // Create new admission
    createAdmission: builder.mutation<Admission, Partial<Admission>>({
      query: (newAdmission) => ({
        url: "/api/admissions",
        method: "POST",
        body: newAdmission,
      }),
      invalidatesTags: ["ADMISSION"],
    }),

    // Update admission
    updateAdmission: builder.mutation<
      Admission,
      { id: string; updates: Partial<Admission> }
    >({
      query: ({ id, updates }) => ({
        url: `/api/admissions/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "ADMISSION", id }],
    }),

    // Delete admission
    deleteAdmission: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/admissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ADMISSION"],
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
