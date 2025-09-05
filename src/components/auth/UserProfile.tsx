"use client";
import { useAuth } from "@/hooks/useAuth";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { clearAuth } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export function UserProfile() {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      console.log("Starting logout process...");
      setIsDropdownOpen(false);

      // Sign out from NextAuth first
      await signOut({
        redirect: false,
        callbackUrl: "/login",
      });

      // Call Redux logout API (this will clear Redux state automatically)
      try {
        await logout().unwrap();
      } catch (reduxError) {
        console.log(
          "Redux logout failed (user might be Google OAuth):",
          reduxError
        );
        // For Google OAuth users, manually clear Redux state
        dispatch(clearAuth());
      }

      console.log("Logout completed successfully");

      // Navigate to login page using Next.js router (no page reload)
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if everything fails, we still want to clear local state
      dispatch(clearAuth());
      setIsDropdownOpen(false);
      router.push("/login");
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {user.name}
          </span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <User className="w-4 h-4 mr-3" />
              Profile
            </Link>
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                Swal.fire({
                  title: "Log out?",
                  text: "You will need to sign in again.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#dc2626",
                  cancelButtonColor: "#475569",
                  confirmButtonText: "Log Out",
                  cancelButtonText: "Cancel",
                  reverseButtons: true,
                  background: "#1e293b",
                  color: "#f1f5f9",
                  customClass: {
                    popup: "swal2-popup-custom",
                    title: "swal2-title-custom",
                    htmlContainer: "swal2-content-custom",
                    confirmButton: "swal2-confirm-custom",
                    cancelButton: "swal2-cancel-custom",
                    icon: "swal2-icon-custom",
                  },
                  width: "320px",
                  padding: "1.5rem",
                  showCloseButton: false,
                  focusCancel: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleLogout();
                  }
                });
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Log Out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
