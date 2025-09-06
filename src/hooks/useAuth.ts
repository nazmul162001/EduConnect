import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import {
  clearAuth,
  setLoading,
  setUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.root.auth
  );
  const { data: session, status: sessionStatus } = useSession();
  const hasInitialized = useRef(false);

  // Only run JWT query if we don't have a NextAuth session
  const {
    data: jwtUser,
    error: jwtError,
    isLoading: jwtLoading,
  } = useGetCurrentUserQuery(undefined, {
    skip: !!session?.user, // Skip JWT query if NextAuth session exists
  });

  // Handle NextAuth session (Google/GitHub users)
  useEffect(() => {
    console.log("=== NextAuth Effect ===");
    console.log("Session:", session?.user?.name);
    console.log("Status:", sessionStatus);

    if (session?.user) {
      console.log("Setting user from NextAuth session");
      dispatch(
        setUser({
          id: session.user.id || "",
          name: session.user.name || "",
          email: session.user.email || "",
          role:
            (session.user.role as "STUDENT" | "ADMIN" | "COLLEGE_ADMIN") ||
            "STUDENT",
          avatar: session.user.image || undefined,
          // Address fields from NextAuth session
          street: session.user.street || "",
          city: session.user.city || "",
          state: session.user.state || "",
          zipCode: session.user.zipCode || "",
          country: session.user.country || "",
          // College fields from NextAuth session
          university: session.user.university || "",
          major: session.user.major || "",
          graduationYear: session.user.graduationYear || "",
          gpa: session.user.gpa || "",
        })
      );
      hasInitialized.current = true;
    }
  }, [session, dispatch]);

  // Handle JWT authentication (manual login users)
  useEffect(() => {
    console.log("=== JWT Effect ===");
    console.log("JWT User:", jwtUser?.user?.name);
    console.log("JWT Error:", jwtError);
    console.log("JWT Loading:", jwtLoading);
    console.log("Has NextAuth:", !!session?.user);

    // Only handle JWT if no NextAuth session
    if (!session?.user) {
      if (jwtUser?.user) {
        console.log("Setting user from JWT");
        dispatch(setUser(jwtUser.user));
        hasInitialized.current = true;
      } else if (jwtError && hasInitialized.current) {
        console.log("JWT error, clearing auth");
        dispatch(clearAuth());
      }
    }

    dispatch(setLoading(jwtLoading));
  }, [jwtUser, jwtError, jwtLoading, session?.user, dispatch]);

  // Determine final authentication state
  const currentUser = user || session?.user || null;
  const isUserAuthenticated = !!currentUser;
  const isAuthLoading = isLoading || sessionStatus === "loading";

  console.log("=== Final Auth State ===");
  console.log("User:", currentUser?.name);
  console.log("Authenticated:", isUserAuthenticated);
  console.log("Loading:", isAuthLoading);

  return {
    user: currentUser,
    isAuthenticated: isUserAuthenticated,
    isLoading: isAuthLoading,
  };
}
