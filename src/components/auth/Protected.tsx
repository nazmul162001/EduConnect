"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading)
    return <div className="container-responsive py-10">Loading...</div>;
  if (!user) {
    return (
      <div className="container-responsive py-16 text-center">
        <div className="mx-auto max-w-xl card">
          <h2 className="text-xl font-semibold">Login required</h2>
          <p className="mt-2 text-sm text-slate-600">
            Please log in to view this content.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/login" className="btn-primary">
              Login
            </Link>
            <Link href="/register" className="btn-outline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
