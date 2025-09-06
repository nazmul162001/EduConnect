"use client";

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
        {stories.map((story) => (
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
