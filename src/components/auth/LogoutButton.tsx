"use client";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { clearAuth } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearAuth());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
