import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    const body = await request.json();
    const { name, email, street, city, state, zipCode, country } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

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

    // Connect to MongoDB
    const uri = process.env.DATABASE_URL;
    if (!uri) {
      throw new Error("DATABASE_URL not set");
    }

    client = new MongoClient(uri);
    await client.connect();
    const db = client.db("edu_connect");
    const usersCollection = db.collection("User");

    // Check if email is already taken by another user
    const { ObjectId } = await import("mongodb");
    const existingUser = await usersCollection.findOne({
      email: email.trim().toLowerCase(),
      _id: { $ne: new ObjectId(userId) },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already taken by another user" },
        { status: 409 }
      );
    }

    // Update the user profile
    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          // Address fields (optional, can be empty strings)
          street: street?.trim() || "",
          city: city?.trim() || "",
          state: state?.trim() || "",
          zipCode: zipCode?.trim() || "",
          country: country?.trim() || "",
          updatedAt: new Date(),
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the updated user data
    const updatedUser = await usersCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Convert MongoDB document to proper format
    const userData = {
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
      // Address fields
      street: updatedUser.street || "",
      city: updatedUser.city || "",
      state: updatedUser.state || "",
      zipCode: updatedUser.zipCode || "",
      country: updatedUser.country || "",
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    // For NextAuth users, we need to trigger a session update
    // This will cause the client to refetch the session data
    const response = NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: userData,
    });

    // Add a header to indicate the session should be refreshed
    response.headers.set("X-Session-Update", "true");

    return response;
  } catch (error) {
    console.error("Error updating profile:", error);
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
