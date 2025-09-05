"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Protected({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  console.log("=== Protected Component ===");
  console.log("User:", user?.name);
  console.log("Authenticated:", isAuthenticated);
  console.log("Loading:", isLoading);
  console.log("Pathname:", pathname);

  useEffect(() => {
    // Only redirect if we haven't already redirected and we're not on the login page
    if (
      !isLoading &&
      !isAuthenticated &&
      !hasRedirected &&
      pathname !== "/login"
    ) {
      console.log("Protected: Redirecting to login");
      setHasRedirected(true);
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router, pathname, hasRedirected]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="container-responsive py-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  // Show login required message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container-responsive py-16 text-center">
        <div className="mx-auto max-w-xl card">
          <h2 className="text-xl font-semibold">Login Required</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Please log in to view this content.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => router.push("/login")}
              className="btn-primary"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/register")}
              className="btn-outline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render protected content if authenticated
  return <>{children}</>;
}
