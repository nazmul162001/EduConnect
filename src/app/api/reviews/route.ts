import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URI = process.env.DATABASE_URL!;

export async function GET(request: NextRequest) {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("edu_connect");
    const reviewsCollection = db.collection("Review");

    // Get collegeId from query params if provided
    const { searchParams } = new URL(request.url);
    const collegeId = searchParams.get("collegeId");

    let query = {};
    if (collegeId) {
      query = { collegeId: new ObjectId(collegeId) };
    }

    // Fetch reviews and sort by creation date (newest first)
    const reviews = await reviewsCollection
      .find(query)
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

export async function POST(request: NextRequest) {
  const client = new MongoClient(MONGODB_URI);

  try {
    // Try to get NextAuth token first (for OAuth users)
    const nextAuthToken = await getToken({ req: request });

    let userId: string;

    if (nextAuthToken?.id) {
      // NextAuth user (Google/GitHub)
      userId = nextAuthToken.id as string;
    } else {
      // Try JWT token (for manual login users)
      const cookieStore = await cookies();
      const jwtToken = cookieStore.get("auth-token")?.value;

      if (!jwtToken) {
        return NextResponse.json(
          { error: "Authorization token required" },
          { status: 401 }
        );
      }

      // Verify the JWT token
      const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
      const payload = jwt.verify(jwtToken, JWT_SECRET) as { userId: string };

      if (!payload || !payload.userId) {
        return NextResponse.json(
          { error: "Invalid or expired token" },
          { status: 401 }
        );
      }

      userId = payload.userId;
    }

    const body = await request.json();
    const {
      rating,
      comment,
      collegeId,
      userName,
      firstName,
      lastName,
      university,
    } = body;

    // Validate required fields
    if (!rating || !comment || !collegeId || !userName) {
      return NextResponse.json(
        { error: "Rating, comment, collegeId, and userName are required" },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db("edu_connect");
    const reviewsCollection = db.collection("Review");

    // Check if user already reviewed this college
    const existingReview = await reviewsCollection.findOne({
      userId: new ObjectId(userId),
      collegeId: new ObjectId(collegeId),
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this college" },
        { status: 400 }
      );
    }

    // Create new review
    const review = {
      rating: parseInt(rating),
      comment: comment.trim(),
      userName: userName.trim(),
      firstName: firstName?.trim() || "",
      lastName: lastName?.trim() || "",
      university: university?.trim() || "",
      userId: new ObjectId(userId),
      collegeId: new ObjectId(collegeId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await reviewsCollection.insertOne(review);

    return NextResponse.json({
      message: "Review created successfully",
      review: {
        id: result.insertedId.toString(),
        ...review,
        userId: review.userId.toString(),
        collegeId: review.collegeId.toString(),
      },
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
