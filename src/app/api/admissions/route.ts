import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    const body = await request.json();
    const {
      collegeId,
      studentName,
      course,
      email,
      phone,
      dateOfBirth,
      profileImage,
      address,
    } = body;

    // Validate required fields
    if (!collegeId || !studentName || !course || !email || !phone) {
      return NextResponse.json(
        {
          error: "College, student name, course, email, and phone are required",
        },
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

    // Get user ID from authentication
    let userId: string;

    // Try to get NextAuth token first (for OAuth users)
    const nextAuthToken = await getToken({ req: request });

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
    const admissionsCollection = db.collection("Admission");
    const collegesCollection = db.collection("College");

    // Verify college exists
    const { ObjectId } = await import("mongodb");
    const college = await collegesCollection.findOne({
      _id: new ObjectId(collegeId),
    });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    // Check if user already has an application for this college
    const existingApplication = await admissionsCollection.findOne({
      userId: new ObjectId(userId),
      collegeId: new ObjectId(collegeId),
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this college" },
        { status: 409 }
      );
    }

    // Create the admission application
    const admissionData = {
      studentName: studentName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      course: course.trim(),
      dateOfBirth: dateOfBirth?.trim() || null,
      profileImage: profileImage?.trim() || null,
      address: address?.trim() || null,
      status: "PENDING",
      applicationDate: new Date(),
      userId: new ObjectId(userId),
      collegeId: new ObjectId(collegeId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await admissionsCollection.insertOne(admissionData);

    if (!result.insertedId) {
      return NextResponse.json(
        { error: "Failed to create admission application" },
        { status: 500 }
      );
    }

    // Get the created admission with populated data
    const createdAdmission = await admissionsCollection.findOne(
      { _id: result.insertedId },
      { projection: { password: 0 } }
    );

    if (!createdAdmission) {
      return NextResponse.json(
        { error: "Failed to retrieve created admission" },
        { status: 500 }
      );
    }

    // Convert MongoDB document to proper format
    const admissionResponse = {
      id: createdAdmission._id.toString(),
      studentName: createdAdmission.studentName,
      email: createdAdmission.email,
      phone: createdAdmission.phone,
      course: createdAdmission.course,
      dateOfBirth: createdAdmission.dateOfBirth,
      profileImage: createdAdmission.profileImage,
      address: createdAdmission.address,
      status: createdAdmission.status,
      applicationDate: createdAdmission.applicationDate,
      collegeId: createdAdmission.collegeId.toString(),
      userId: createdAdmission.userId.toString(),
      createdAt: createdAdmission.createdAt,
      updatedAt: createdAdmission.updatedAt,
    };

    return NextResponse.json({
      success: true,
      message: "Admission application submitted successfully",
      admission: admissionResponse,
    });
  } catch (error) {
    console.error("Error creating admission application:", error);
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

export async function PUT(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    const body = await request.json();
    const {
      admissionId,
      studentName,
      course,
      email,
      phone,
      dateOfBirth,
      profileImage,
      address,
    } = body;

    // Validate required fields
    if (!admissionId || !studentName || !course || !email || !phone) {
      return NextResponse.json(
        {
          error:
            "Admission ID, student name, course, email, and phone are required",
        },
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

    // Get user ID from authentication
    let userId: string;

    // Try to get NextAuth token first (for OAuth users)
    const nextAuthToken = await getToken({ req: request });

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
    const admissionsCollection = db.collection("Admission");

    const { ObjectId } = await import("mongodb");

    // Check if the admission belongs to the current user
    const existingAdmission = await admissionsCollection.findOne({
      _id: new ObjectId(admissionId),
      userId: new ObjectId(userId),
    });

    if (!existingAdmission) {
      return NextResponse.json(
        { error: "Admission application not found or access denied" },
        { status: 404 }
      );
    }

    // Update the admission application
    const updateData = {
      studentName: studentName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      course: course.trim(),
      dateOfBirth: dateOfBirth || null,
      profileImage: profileImage || null,
      address: address || null,
      updatedAt: new Date(),
    };

    const result = await admissionsCollection.updateOne(
      { _id: new ObjectId(admissionId) },
      { $set: updateData }
    );

    if (!result.acknowledged || result.matchedCount === 0) {
      throw new Error("Failed to update admission application");
    }

    // Fetch the updated admission
    const updatedAdmission = await admissionsCollection.findOne({
      _id: new ObjectId(admissionId),
    });

    if (!updatedAdmission) {
      return NextResponse.json(
        { error: "Admission application not found after update" },
        { status: 404 }
      );
    }

    const responseAdmission = {
      id: updatedAdmission._id.toString(),
      studentName: updatedAdmission.studentName,
      email: updatedAdmission.email,
      phone: updatedAdmission.phone,
      course: updatedAdmission.course,
      dateOfBirth: updatedAdmission.dateOfBirth,
      profileImage: updatedAdmission.profileImage,
      address: updatedAdmission.address,
      status: updatedAdmission.status,
      applicationDate: updatedAdmission.applicationDate,
      collegeId: updatedAdmission.collegeId.toString(),
      userId: updatedAdmission.userId.toString(),
      createdAt: updatedAdmission.createdAt,
      updatedAt: updatedAdmission.updatedAt,
    };

    return NextResponse.json({
      success: true,
      message: "Admission application updated successfully",
      admission: responseAdmission,
    });
  } catch (error) {
    console.error("Error updating admission application:", error);
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

export async function GET(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    // Get user ID from authentication
    let userId: string;

    // Try to get NextAuth token first (for OAuth users)
    const nextAuthToken = await getToken({ req: request });

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
    const admissionsCollection = db.collection("Admission");
    const collegesCollection = db.collection("College");

    // Get user's admission applications
    const { ObjectId } = await import("mongodb");
    const admissions = await admissionsCollection
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();

    // Populate college information for each admission
    const admissionsWithColleges = await Promise.all(
      admissions.map(async (admission) => {
        const college = await collegesCollection.findOne({
          _id: admission.collegeId,
        });

        return {
          id: admission._id.toString(),
          studentName: admission.studentName,
          email: admission.email,
          phone: admission.phone,
          course: admission.course,
          dateOfBirth: admission.dateOfBirth,
          profileImage: admission.profileImage,
          address: admission.address,
          status: admission.status,
          applicationDate: admission.applicationDate,
          collegeId: admission.collegeId.toString(),
          college: college
            ? {
                id: college._id.toString(),
                name: college.name,
                description: college.description,
                image: college.image,
                location: college.location,
                rating: college.rating,
                website: college.website,
                email: college.email,
                phone: college.phone,
              }
            : null,
          userId: admission.userId.toString(),
          createdAt: admission.createdAt,
          updatedAt: admission.updatedAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      admissions: admissionsWithColleges,
    });
  } catch (error) {
    console.error("Error fetching admission applications:", error);
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
