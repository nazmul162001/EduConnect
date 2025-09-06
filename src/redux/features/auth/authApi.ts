import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, clearAuth } from "./authSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface UpdateProfileRequest {
  name: string;
  email: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

interface AuthResponse {
  message: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Clear the auth state immediately after successful logout
          dispatch(clearAuth());
          // Reset the entire auth API cache
          dispatch(authApi.util.resetApiState());
        } catch (error) {
          console.error("Logout failed:", error);
          // Even if logout fails, clear the auth state
          dispatch(clearAuth());
          // Reset the entire auth API cache
          dispatch(authApi.util.resetApiState());
        }
      },
    }),
    getCurrentUser: builder.query<{ user: User }, void>({
      query: () => "/me",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<AuthResponse, UpdateProfileRequest>({
      query: (profileData) => ({
        url: "/update-profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Update the auth state with the new user data
          dispatch(
            authApi.util.updateQueryData(
              "getCurrentUser",
              undefined,
              (draft) => {
                draft.user = data.user;
              }
            )
          );

          // For NextAuth users, trigger a session refresh
          // This ensures the NextAuth session is updated with the new data
          if (typeof window !== "undefined") {
            // Check if we're in a browser environment
            const { getSession } = await import("next-auth/react");
            try {
              await getSession();
            } catch (error) {
              console.log("Session refresh completed");
            }
          }
        } catch (error) {
          console.error("Profile update failed:", error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} = authApi;
