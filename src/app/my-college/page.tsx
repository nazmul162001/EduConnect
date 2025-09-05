"use client";
import { Protected } from "@/components/auth/Protected";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { addReview, getCollegeById } from "@/lib/data";
import { loadFromStorage, storageKeys } from "@/lib/storage";
import { AdmissionForm, Review } from "@/types";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function MyCollegePage() {
  const [application, setApplication] = useState<AdmissionForm | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const app = loadFromStorage<AdmissionForm | null>(
      storageKeys.myCollege,
      null
    );
    setApplication(app);
  }, []);

  const college = useMemo(
    () => (application ? getCollegeById(application.collegeId) : undefined),
    [application]
  );

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const onAddReview = () => {
    if (!user || !college) return;
    const review: Review = {
      id: crypto.randomUUID(),
      collegeId: college.id,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    addReview(review);
    setComment("");
    setRating(5);
  };

  if (!application || !college) {
    return (
      <div className="container-responsive py-10">
        <h1 className="text-2xl font-semibold">No application found</h1>
        <p className="text-sm text-slate-600 mt-2">
          Submit the admission form to see your college and add a review.
        </p>
      </div>
    );
  }

  return (
    <Protected>
      <div className="container-responsive py-10">
        <FadeIn>
          <h1 className="text-3xl font-bold">My College</h1>
        </FadeIn>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* College card */}
          <SlideUp>
            <div className="card">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                <Image
                  src={college.image.replace("/public", "")}
                  alt={college.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{college.name}</h2>
              <p className="text-sm text-slate-600">
                Admission window: {college.admissionStart} -{" "}
                {college.admissionEnd}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Applied Candidate: {application.candidateName}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Subject: {application.subject}
              </p>
            </div>
          </SlideUp>

          {/* Review card */}
          <FadeIn>
            <div className="card">
              <h2 className="font-semibold">Add a Review</h2>
              <div className="mt-3 grid gap-3">
                <label className="block">
                  <span className="mb-1 block text-sm">Rating</span>
                  <select
                    className="w-full rounded-xl border p-2"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm">Comment</span>
                  <textarea
                    className="w-full rounded-xl border p-3"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </label>
                <Button onClick={onAddReview}>Submit Review</Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Protected>
  );
}
