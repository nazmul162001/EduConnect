import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    const { email, oldPassword, newPassword, step } = await request.json();

    // Validate input based on step
    if (step === 1) {
      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }
    } else if (step === 2) {
      if (!email || !oldPassword || !newPassword) {
        return NextResponse.json(
          { error: "Email, old password, and new password are required" },
          { status: 400 }
        );
      }
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

    if (step === 1) {
      // Step 1: Check if email exists
      const user = await usersCollection.findOne({ email });

      if (!user) {
        return NextResponse.json(
          { error: "Email not found. Please check your email address." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: "Email verified successfully",
        email: email,
      });
    } else if (step === 2) {
      // Step 2: Verify old password and update to new password
      const user = await usersCollection.findOne({ email });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Verify old password
      const isValidOldPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isValidOldPassword) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 401 }
        );
      }

      // Hash new password
      const saltRounds = 12;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password in database
      const result = await usersCollection.updateOne(
        { email: email },
        {
          $set: {
            password: hashedNewPassword,
            updatedAt: new Date(),
          },
        }
      );

      if (result.modifiedCount === 0) {
        return NextResponse.json(
          { error: "Failed to update password" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: "Password updated successfully",
      });
    }

    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  } catch (error) {
    console.error("Reset password error:", error);
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
