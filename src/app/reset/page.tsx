"use client";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ResetPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

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
          <h1 className="text-2xl font-bold text-white">Reset password</h1>
          {sent ? (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-green-400 font-medium mb-2">
                Email sent successfully!
              </p>
              <p className="text-blue-200 text-sm">
                Check your email for reset instructions.
              </p>
            </div>
          ) : (
            <form
              className="mt-6 grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                await resetPassword(email);
                setSent(true);
              }}
            >
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
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Send reset link
              </button>
            </form>
          )}
          <p className="mt-4 text-sm text-blue-200">
            Remember your password?{" "}
            <Link
              className="text-white hover:underline font-medium"
              href="/login"
            >
              Back to login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
