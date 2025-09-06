import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  let client: MongoClient | null = null;

  try {
    const uri = process.env.DATABASE_URL;
    if (!uri) {
      throw new Error("DATABASE_URL not set");
    }

    client = new MongoClient(uri);
    await client.connect();
    const db = client.db("edu_connect");
    const collegesCollection = db.collection("College");

    // Fetch all colleges from the database
    const colleges = await collegesCollection.find({}).toArray();

    // Convert MongoDB documents to proper format
    const formattedColleges = colleges.map((college) => ({
      id: college._id.toString(),
      name: college.name,
      description: college.description,
      image: college.image,
      location: college.location,
      rating: college.rating,
      website: college.website,
      email: college.email,
      phone: college.phone,
      createdAt: college.createdAt,
      updatedAt: college.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      colleges: formattedColleges,
      count: formattedColleges.length,
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch colleges",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
