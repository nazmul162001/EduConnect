"use client";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Lock, Mail, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login, loginWithGoogle, loginWithSocial } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetForm, setResetForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [resetLoading, setResetLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    router.push("/");
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetForm.newPassword !== resetForm.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    setResetLoading(true);
    // Simulate password reset
    setTimeout(() => {
      setResetLoading(false);
      setShowResetModal(false);
      setResetForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      alert("Password reset successfully!");
    }, 1500);
  };

  return (
    <div
      className="min-h-screen py-12"
      style={{
        background: `radial-gradient(1200px 600px at 10% 10%, rgba(99, 102, 241, 0.15), transparent), radial-gradient(1000px 600px at 90% 20%, rgba(6, 182, 212, 0.15), transparent), var(--background)`,
      }}
    >
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-8"
        >
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-blue-200 mt-1">Login to continue</p>
          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 grid gap-2">
            <button
              onClick={async () => {
                setLoading(true);
                await loginWithGoogle();
                router.push("/");
              }}
              className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
            <button
              onClick={async () => {
                await loginWithSocial("github");
                router.push("/");
              }}
              className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
          </div>
          <p className="mt-4 text-sm text-blue-200">
            Forgot password?{" "}
            <button
              onClick={() => setShowResetModal(true)}
              className="text-white hover:underline font-medium"
            >
              Reset
            </button>
          </p>
          <p className="mt-2 text-sm text-blue-200">
            New here?{" "}
            <Link
              className="text-white hover:underline font-medium"
              href="/register"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Reset Password Modal */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowResetModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Reset Password
                </h2>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type="password"
                      value={resetForm.oldPassword}
                      onChange={(e) =>
                        setResetForm({
                          ...resetForm,
                          oldPassword: e.target.value,
                        })
                      }
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                      placeholder="Enter your current password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type="password"
                      value={resetForm.newPassword}
                      onChange={(e) =>
                        setResetForm({
                          ...resetForm,
                          newPassword: e.target.value,
                        })
                      }
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                      placeholder="Enter your new password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                    <input
                      type="password"
                      value={resetForm.confirmPassword}
                      onChange={(e) =>
                        setResetForm({
                          ...resetForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-blue-200"
                      placeholder="Confirm your new password"
                    />
                  </div>
                </div>

                <button
                  disabled={resetLoading}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {resetLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>

              <p className="mt-4 text-sm text-blue-200 text-center">
                Remember your password?{" "}
                <button
                  onClick={() => setShowResetModal(false)}
                  className="text-white hover:underline font-medium"
                >
                  Back to login
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
