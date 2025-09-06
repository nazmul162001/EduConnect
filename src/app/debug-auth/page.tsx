"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DebugAuthPage() {
  const { data: session, status } = useSession();
  const [envCheck, setEnvCheck] = useState<Record<
    string,
    string | boolean
  > | null>(null);

  useEffect(() => {
    // Check environment variables
    fetch("/api/test-env")
      .then((res) => res.json())
      .then((data) => setEnvCheck(data))
      .catch((err) => console.error("Env check failed:", err));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">NextAuth Debug Page</h1>

      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Session Status</h2>
          <p>Status: {status}</p>
          <p>Session: {JSON.stringify(session, null, 2)}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
          <pre>{JSON.stringify(envCheck, null, 2)}</pre>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Actions</h2>
          <div className="space-x-4">
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Sign In with Google
            </button>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
