import colleges from "@/data/colleges.json";
import gallery from "@/data/gallery.json";
import research from "@/data/research.json";
import seedReviews from "@/data/reviews.json";
import { loadFromStorage, saveToStorage, storageKeys } from "@/lib/storage";
import { College, ResearchPaper, Review } from "@/types";

export function getColleges(): College[] {
  return colleges as unknown as College[];
}

export function getCollegeById(id: string): College | undefined {
  return (colleges as unknown as College[]).find((c) => c.id === id);
}

export function searchColleges(query: string): College[] {
  const q = query.trim().toLowerCase();
  if (!q) return getColleges().slice(0, 3);
  return getColleges().filter((c) => c.name.toLowerCase().includes(q));
}

export function getGallery(): string[] {
  return gallery as unknown as string[];
}

export function getResearchLinks() {
  return research as unknown as ResearchPaper[];
}

export function getReviews(): Review[] {
  const existing = loadFromStorage<Review[]>(storageKeys.reviews, []);
  if (existing && existing.length > 0) return existing;
  saveToStorage(storageKeys.reviews, seedReviews as unknown as Review[]);
  return seedReviews as unknown as Review[];
}

export function addReview(review: Review) {
  const all = getReviews();
  const next = [review, ...all];
  saveToStorage(storageKeys.reviews, next);
}
