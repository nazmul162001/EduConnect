import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    const body = await request.json();
    const {
      name,
      email,
      street,
      city,
      state,
      zipCode,
      country,
      university,
      major,
      graduationYear,
      gpa,
    } = body;

    // Validate that at least one field is provided
    const hasFields =
      name ||
      email ||
      street ||
      city ||
      state ||
      zipCode ||
      country ||
      university ||
      major ||
      graduationYear ||
      gpa;
    if (!hasFields) {
      return NextResponse.json(
        { error: "At least one field must be provided for update" },
        { status: 400 }
      );
    }

    // Validate email format if email is provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        );
      }
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

    // Check if email is already taken by another user (only if email is being updated)
    const { ObjectId } = await import("mongodb");
    if (email) {
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
    }

    // Build update object with only provided fields
    const updateFields: any = {
      updatedAt: new Date(),
    };

    if (name !== undefined) updateFields.name = name.trim();
    if (email !== undefined) updateFields.email = email.trim().toLowerCase();
    if (street !== undefined) updateFields.street = street?.trim() || "";
    if (city !== undefined) updateFields.city = city?.trim() || "";
    if (state !== undefined) updateFields.state = state?.trim() || "";
    if (zipCode !== undefined) updateFields.zipCode = zipCode?.trim() || "";
    if (country !== undefined) updateFields.country = country?.trim() || "";
    if (university !== undefined)
      updateFields.university = university?.trim() || "";
    if (major !== undefined) updateFields.major = major?.trim() || "";
    if (graduationYear !== undefined)
      updateFields.graduationYear = graduationYear?.trim() || "";
    if (gpa !== undefined) updateFields.gpa = gpa?.trim() || "";

    // Update the user profile
    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateFields }
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
      // College fields
      university: updatedUser.university || "",
      major: updatedUser.major || "",
      graduationYear: updatedUser.graduationYear || "",
      gpa: updatedUser.gpa || "",
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

// Keep PUT method for backward compatibility
export async function PUT(request: NextRequest) {
  return PATCH(request);
}
