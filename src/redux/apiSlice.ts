import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
        : "http://localhost:3000",
    prepareHeaders: (headers) => {
      let token;
      const auth = Cookies.get("token");
      if (auth) {
        // The token is stored directly as a JWT string, not as JSON
        token = auth;
      }
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["COLLEGE", "ADMISSION", "REVIEW"],
  endpoints: () => ({
    // Add other endpoints here as needed
  }),
});

export const {} = apiSlice;
