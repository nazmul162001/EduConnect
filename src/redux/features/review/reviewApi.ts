import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  university?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  collegeId: string;
}

interface CreateReviewRequest {
  rating: number;
  comment: string;
  collegeId: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  university?: string;
}

interface ReviewResponse {
  message: string;
  review: Review;
}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/reviews",
    credentials: "include",
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    getReviews: builder.query<{ reviews: Review[] }, string>({
      query: (collegeId) => `?collegeId=${collegeId}`,
      providesTags: ["Review"],
    }),
    createReview: builder.mutation<ReviewResponse, CreateReviewRequest>({
      query: (reviewData) => ({
        url: "/",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),
    updateReview: builder.mutation<
      ReviewResponse,
      { id: string; data: Partial<CreateReviewRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReview: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
