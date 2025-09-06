import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let client: MongoClient | null = null;

  try {
    const { id } = await params;

    // Connect to MongoDB
    const uri = process.env.DATABASE_URL;
    if (!uri) {
      throw new Error("DATABASE_URL not set");
    }

    client = new MongoClient(uri);
    await client.connect();
    const db = client.db("edu_connect");
    const collegesCollection = db.collection("College");

    // Convert string ID to ObjectId
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (_error) {
      return NextResponse.json(
        { error: "Invalid college ID format" },
        { status: 400 }
      );
    }

    // Find the specific college by ID
    const college = await collegesCollection.findOne({ _id: objectId });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    // Convert ObjectId to string for JSON response
    const collegeData = {
      ...college,
      _id: college._id.toString(),
    };

    return NextResponse.json({
      success: true,
      data: collegeData,
    });
  } catch (error) {
    console.error("Error fetching college:", error);
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
