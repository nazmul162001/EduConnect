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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
