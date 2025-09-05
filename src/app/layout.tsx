import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LoadingWrapper } from "@/components/ui/LoadingWrapper";
import { Providers } from "@/providers/Providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduConnect — College Booking Platform",
  description: "Discover, compare, and book college services and facilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="antialiased min-h-dvh flex flex-col"
        suppressHydrationWarning={true}
      >
        <Providers>
          <LoadingWrapper>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LoadingWrapper>
        </Providers>
      </body>
    </html>
  );
}
