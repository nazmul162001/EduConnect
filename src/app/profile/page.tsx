"use client";
import { Protected } from "@/components/auth/Protected";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Protected>
      <div className="container-responsive py-10">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="mt-6 max-w-xl card">
          <div className="grid gap-2 text-sm">
            <p>
              <span className="font-medium">Name:</span> {user?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-medium">Role:</span> {user?.role}
            </p>
            {user?.avatar && (
              <div className="mt-4">
                <span className="font-medium">Avatar:</span>
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-16 h-16 rounded-full mt-2"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Protected>
  );
}
