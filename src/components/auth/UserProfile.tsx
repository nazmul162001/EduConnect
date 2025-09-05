"use client";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

export function UserProfile() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <span className="text-sm font-medium text-gray-700">{user.name}</span>
      </div>
      <LogoutButton />
    </div>
  );
}
