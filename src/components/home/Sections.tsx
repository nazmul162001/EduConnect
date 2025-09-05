"use client";
import { CollegeCard } from "@/components/college/CollegeCard";
import {
  getColleges,
  getGallery,
  getResearchLinks,
  getReviews,
} from "@/lib/data";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Globe,
  GraduationCap,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FeaturedColleges() {
  const featured = getColleges().slice(0, 3);
  return (
    <section className="container-responsive mt-12 sm:mt-16 md:mt-20 px-6 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient">
          Featured Colleges
        </h2>
        <Link
          href="/colleges"
          className="text-base sm:text-lg font-semibold text-white hover:text-brand-500 transition-colors bg-brand-50/20 hover:bg-brand-50/30 px-4 py-2 rounded-full border border-brand-200/30"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featured.map((c) => (
          <CollegeCard key={c.id} college={c} />
        ))}
      </div>
    </section>
  );
}

export function Gallery() {
  const images = getGallery();
  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Graduates Gallery
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          See the success stories of our graduates from top universities
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {images.map((src, i) => (
          <motion.div
            key={src + i}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden card shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <Image src={src} alt="Graduates" fill className="object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ResearchLinks() {
  const links = getResearchLinks();
  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Student Research
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          Explore groundbreaking research by our students and alumni
        </p>
      </div>
      <div className="grid gap-4 sm:gap-6 max-w-4xl mx-auto">
        {links.map((p) => (
          <motion.a
            key={p.id}
            href={p.url}
            target="_blank"
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/80 p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg leading-tight group-hover:text-brand-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                  {p.authors.join(", ")} • {p.year}
                </p>
              </div>
              <span className="inline-flex items-center text-sm sm:text-base font-semibold text-brand-600 group-hover:text-brand-500 flex-shrink-0 bg-brand-50/50 group-hover:bg-brand-50/80 px-4 py-2 rounded-full transition-all">
                Read{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export function Reviews() {
  const reviews = getReviews().slice(0, 6);
  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 pb-16 sm:pb-20 md:pb-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          What Students Say
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          Hear from students who found their perfect college through our
          platform
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {reviews.map((r) => (
          <motion.div
            key={r.id}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl sm:rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/80 p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
                {r.userName}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 sm:h-5 sm:w-5 fill-current"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              &ldquo;{r.comment}&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {new Date(r.createdAt).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Statistics Section
export function Statistics() {
  const stats = [
    { icon: Users, value: "50K+", label: "Students Helped" },
    { icon: GraduationCap, value: "500+", label: "Partner Colleges" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: Globe, value: "25+", label: "Countries" },
  ];

  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Trusted by Students Worldwide
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          Join thousands of students who have found their perfect college
          through our platform
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="text-center p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/15 dark:hover:bg-slate-800/40 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 sm:p-4 rounded-full bg-brand-500/20 text-brand-400">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {stat.value}
            </div>
            <div className="text-sm sm:text-base text-slate-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Key Features Section
export function KeyFeatures() {
  const features = [
    {
      icon: "🎯",
      title: "Smart Matching",
      description:
        "AI-powered algorithm matches you with colleges that fit your academic goals and preferences.",
    },
    {
      icon: "📊",
      title: "Comprehensive Data",
      description:
        "Access detailed information about admission requirements, tuition fees, and campus life.",
    },
    {
      icon: "🤝",
      title: "Expert Guidance",
      description:
        "Get personalized advice from education counselors and college admission experts.",
    },
    {
      icon: "📱",
      title: "Easy Application",
      description:
        "Streamlined application process with document management and deadline tracking.",
    },
    {
      icon: "💰",
      title: "Scholarship Finder",
      description:
        "Discover financial aid opportunities and scholarships tailored to your profile.",
    },
    {
      icon: "🌍",
      title: "Global Reach",
      description:
        "Connect with universities worldwide and explore international education opportunities.",
    },
  ];

  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Why Choose EduConnect?
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-3xl mx-auto">
          We provide everything you need to make informed decisions about your
          higher education journey
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/15 dark:hover:bg-slate-800/40 transition-all duration-300"
          >
            <div className="text-4xl sm:text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Success Stories Section
export function SuccessStories() {
  const stories = [
    {
      name: "Sarah Johnson",
      college: "Stanford University",
      program: "Computer Science",
      quote:
        "EduConnect helped me find the perfect program that matched my career goals. The application process was seamless!",
    },
    {
      name: "Ahmed Hassan",
      college: "MIT",
      program: "Engineering",
      quote:
        "The scholarship finder feature saved me thousands of dollars. I couldn't have done it without EduConnect.",
    },
    {
      name: "Maria Rodriguez",
      college: "Harvard University",
      program: "Business Administration",
      quote:
        "The expert guidance and college matching made my dream of attending Harvard a reality.",
    },
  ];

  return (
    <section className="container-responsive mt-16 sm:mt-20 md:mt-24 px-6 sm:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4">
          Success Stories
        </h2>
        <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto">
          Real students, real results. See how EduConnect has transformed
          educational journeys.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {stories.map((story, index) => (
          <div
            key={story.name}
            className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/10 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/15 dark:hover:bg-slate-800/40 transition-all duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">
                  {story.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {story.name}
              </h3>
              <p className="text-sm sm:text-base text-brand-400 font-semibold mb-1">
                {story.program}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mb-4">
                {story.college}
              </p>
              <blockquote className="text-sm sm:text-base text-slate-300 italic leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Call to Action Section
export function CallToAction() {
  return (
    <section className="container-responsive sm:mt-20 md:mt-24 px-6 sm:px-8 pb-5 md:pb-10 lg:pb-16">
      <div
        className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 md:p-16 text-center"
        style={{
          background: `linear-gradient(135deg, 
            rgba(99, 102, 241, 0.1) 0%, 
            rgba(6, 182, 212, 0.1) 100%),
            radial-gradient(
              800px 400px at 50% 50%,
              rgba(99, 102, 241, 0.2),
              transparent
            )`,
        }}
      >
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200/90 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Join thousands of students who have found their perfect college.
            Your educational future starts here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/colleges"
              className="btn-hero text-base sm:text-lg md:text-xl w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5"
            >
              Explore Colleges
              <span className="btn-hero-icon">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
            <Link
              href="/admission"
              className="btn-hero-outline text-base sm:text-lg md:text-xl w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5"
            >
              Start Application
              <span className="btn-hero-icon"></span>
            </Link>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-brand-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-tr from-accent-500/20 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
