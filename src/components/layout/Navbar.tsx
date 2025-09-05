"use client";
import { UserProfile } from "@/components/auth/UserProfile";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/colleges", label: "Colleges" },
  { href: "/admission", label: "Admission" },
  { href: "/my-college", label: "My College" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/70 backdrop-blur border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="container-responsive flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-800 dark:text-slate-100"
        >
          <GraduationCap className="h-6 w-6 text-brand-600" />
          <span className="font-semibold">EduConnect</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium hover:text-brand-700 dark:hover:text-brand-300 transition ${
                pathname === item.href
                  ? "text-brand-700 dark:text-brand-300"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="btn-hero inline-flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden btn-outline"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="container-responsive py-3 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block"
                onClick={() => setOpen(false)}
              >
                <span
                  className={`text-sm font-medium ${
                    pathname === item.href ? "text-brand-700" : "text-slate-700"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="text-sm font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {user.name}
                </Link>
                <UserProfile />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="btn-hero"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
