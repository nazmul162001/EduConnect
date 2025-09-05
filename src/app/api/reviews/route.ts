import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URI = process.env.DATABASE_URL!;

export async function GET(request: NextRequest) {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("edu_connect");
    const reviewsCollection = db.collection("Review");

    // Fetch all reviews and sort by creation date (newest first)
    const reviews = await reviewsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: reviews,
      count: reviews.length,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reviews",
        data: [],
        count: 0,
      },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
