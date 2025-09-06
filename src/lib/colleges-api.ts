import { College } from "@/types";

export interface CollegesApiResponse {
  success: boolean;
  colleges: College[];
  count: number;
  error?: string;
  message?: string;
}

export async function fetchColleges(): Promise<College[]> {
  try {
    const response = await fetch("/api/colleges", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: CollegesApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch colleges");
    }

    return result.colleges;
  } catch (error) {
    console.error("Error fetching colleges:", error);
    // Return empty array as fallback
    return [];
  }
}

export async function getColleges(): Promise<College[]> {
  return await fetchColleges();
}

export async function getCollegeById(id: string): Promise<College | undefined> {
  const colleges = await fetchColleges();
  return colleges.find((c) => c.id === id);
}

export async function searchColleges(query: string): Promise<College[]> {
  const colleges = await fetchColleges();
  const q = query.trim().toLowerCase();
  if (!q) return colleges.slice(0, 3);
  return colleges.filter((c) => c.name.toLowerCase().includes(q));
}
