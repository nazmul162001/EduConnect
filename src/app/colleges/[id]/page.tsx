"use client";
import { Protected } from "@/components/auth/Protected";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";
import { getCollegeById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CollegeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const college = getCollegeById(params.id);
  if (!college) return notFound();
  return (
    <Protected>
      <div className="container-responsive py-10">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <SlideUp>
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden card">
                <Image
                  src={college.image}
                  alt={college.name}
                  fill
                  className="object-cover"
                />
              </div>
            </SlideUp>
            <FadeIn>
              <h1 className="mt-6 text-3xl font-bold">{college.name}</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {college.researchHistory}
              </p>
            </FadeIn>

            <section className="mt-8">
              <h2 className="text-xl font-semibold">Admission Process</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Admission window: {college.admissionStart} to{" "}
                {college.admissionEnd}. Submit your application, upload
                documents, and schedule an interview if shortlisted.
              </p>
              <Link
                href={`/admission?college=${college.id}`}
                className="btn-primary mt-3 inline-block"
              >
                Apply Now
              </Link>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-semibold">Events</h2>
              <div className="mt-3 grid gap-3">
                {college.events.length === 0 && (
                  <p className="text-sm text-slate-500">No upcoming events.</p>
                )}
                {college.events.map((e) => (
                  <div key={e.id} className="card">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{e.title}</h3>
                      <span className="text-xs text-slate-500">{e.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {e.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-semibold">Sports</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {college.sports.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-full border px-3 py-1 text-sm bg-white dark:bg-slate-900"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside>
            <div className="card">
              <h3 className="font-semibold">Quick Facts</h3>
              <ul className="mt-3 text-sm space-y-2 text-slate-600 dark:text-slate-300">
                <li>Rating: {college.rating.toFixed(2)}</li>
                <li>Research Papers: {college.researchPapers.length}</li>
                <li>Gallery Photos: {college.graduatesGallery.length}</li>
              </ul>
            </div>
            <div className="card mt-4">
              <h3 className="font-semibold">Research Papers</h3>
              <ul className="mt-3 space-y-2">
                {college.researchPapers.length === 0 && (
                  <li className="text-sm text-slate-500">
                    No research listed.
                  </li>
                )}
                {college.researchPapers.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.url}
                      target="_blank"
                      className="text-sm font-medium text-brand-700 hover:underline"
                    >
                      {p.title}
                    </a>
                    <p className="text-xs text-slate-500">
                      {p.authors.join(", ")} • {p.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </Protected>
  );
}
