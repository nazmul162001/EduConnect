"use client";

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
        {features.map((feature) => (
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
