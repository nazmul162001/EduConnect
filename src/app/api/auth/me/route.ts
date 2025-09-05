import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  let client: MongoClient | null = null;

  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
    const payload = jwt.verify(token, JWT_SECRET) as any;

    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Connect to MongoDB
    const uri = process.env.DATABASE_URL;
    if (!uri) {
      throw new Error("DATABASE_URL not set");
    }

    client = new MongoClient(uri);
    await client.connect();
    const db = client.db("edu_connect");
    const usersCollection = db.collection("User");

    // Find user by ID
    const { ObjectId } = await import("mongodb");
    const user = await usersCollection.findOne(
      { _id: new ObjectId(payload.userId) },
      { projection: { password: 0 } } // Exclude password
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Convert MongoDB document to proper format
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error("Get current user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
