import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import {
  clearAuth,
  setLoading,
  setUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.root.auth
  );
  const { data: session, status: sessionStatus } = useSession();
  const hasInitialized = useRef(false);

  const {
    data,
    error,
    isLoading: queryLoading,
  } = useGetCurrentUserQuery(undefined, {
    skip: false, // Always try to get current user
  });

  // Handle NextAuth session
  useEffect(() => {
    if (session?.user && !isAuthenticated) {
      // Update Redux state with NextAuth user data
      dispatch(
        setUser({
          id: session.user.id || "",
          name: session.user.name || "",
          email: session.user.email || "",
          role:
            (session.user.role as "STUDENT" | "ADMIN" | "COLLEGE_ADMIN") ||
            "STUDENT",
          avatar: session.user.image || undefined,
        })
      );
    }
  }, [session, dispatch, isAuthenticated]);

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
      hasInitialized.current = true;
    } else if (error) {
      dispatch(clearAuth());
      hasInitialized.current = true;
    }
    dispatch(setLoading(queryLoading));
  }, [data, error, queryLoading, dispatch]);

  // Handle when Redux auth is cleared - also clear NextAuth session
  useEffect(() => {
    if (!isAuthenticated && session?.user) {
      console.log("Redux auth cleared, signing out from NextAuth...");
      signOut({ redirect: false });
    }
  }, [isAuthenticated, session]);

  // Return combined authentication state
  const isAuthLoading = isLoading || sessionStatus === "loading";
  const isUserAuthenticated = isAuthenticated || !!session?.user;

  return {
    user:
      user ||
      (session?.user
        ? {
            id: session.user.id || "",
            name: session.user.name || "",
            email: session.user.email || "",
            role:
              (session.user.role as "STUDENT" | "ADMIN" | "COLLEGE_ADMIN") ||
              "STUDENT",
            avatar: session.user.image || undefined,
          }
        : null),
    isAuthenticated: isUserAuthenticated,
    isLoading: isAuthLoading,
  };
}
