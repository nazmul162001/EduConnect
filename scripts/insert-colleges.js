const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });

// Helper function to generate additional fields for colleges
function generateCollegeFields(baseCollege) {
  const sportsOptions = [
    [{ name: "Football" }, { name: "Basketball" }, { name: "Swimming" }],
    [{ name: "Tennis" }, { name: "Volleyball" }, { name: "Athletics" }],
    [{ name: "Rowing" }, { name: "Soccer" }, { name: "Baseball" }],
    [{ name: "Golf" }, { name: "Track & Field" }, { name: "Wrestling" }],
    [{ name: "Hockey" }, { name: "Lacrosse" }, { name: "Softball" }],
  ];

  const researchOptions = [
    "Breakthroughs in bioinformatics and climate modeling.",
    "Leading robotics, HCI, and renewable energy research programs.",
    "Pioneering AI and quantum computing initiatives with global collaborations.",
    "Advanced research in biotechnology and medical sciences.",
    "Cutting-edge work in space technology and astrophysics.",
    "Innovative studies in sustainable engineering and green technology.",
    "Groundbreaking research in machine learning and data science.",
    "Revolutionary advances in nanotechnology and materials science.",
    "Transformative research in renewable energy and environmental science.",
    "Breakthrough discoveries in genetics and molecular biology.",
    "Leading research in cybersecurity and information technology.",
    "Innovative studies in urban planning and smart cities.",
    "Advanced research in aerospace engineering and propulsion systems.",
    "Cutting-edge work in artificial intelligence and neural networks.",
    "Pioneering research in quantum physics and theoretical mathematics.",
  ];

  const randomSports =
    sportsOptions[Math.floor(Math.random() * sportsOptions.length)];
  const randomResearch =
    researchOptions[Math.floor(Math.random() * researchOptions.length)];

  return {
    ...baseCollege,
    admissionStart: "2025-06-01",
    admissionEnd: "2025-08-31",
    researchHistory: randomResearch,
    sports: randomSports,
    events: [
      {
        id: Math.random().toString(36).substr(2, 9),
        title: "Open House 2025",
        date: "2025-03-15",
        description: "Annual open house for prospective students",
      },
    ],
    researchPapers: [
      {
        id: Math.random().toString(36).substr(2, 9),
        title: "Recent Advances in Technology",
        url: "https://example.com/research-paper",
        authors: ["Dr. John Smith", "Dr. Jane Doe"],
        year: 2024,
      },
    ],
    graduatesGallery: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    ],
  };
}

const baseColleges = [
  {
    name: "Harvard University",
    description:
      "One of the world's most prestigious universities, known for excellence in research, teaching, and learning. Harvard offers a comprehensive range of academic programs across various disciplines.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
    location: "Cambridge, Massachusetts, USA",
    rating: 4.9,
    website: "https://www.harvard.edu",
    email: "admissions@harvard.edu",
    phone: "+1-617-495-1000",
  },
  {
    name: "Stanford University",
    description:
      "A leading research university known for its academic strength, wealth, proximity to Silicon Valley, and ranking as one of the world's top universities.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
    location: "Stanford, California, USA",
    rating: 4.8,
    website: "https://www.stanford.edu",
    email: "admission@stanford.edu",
    phone: "+1-650-723-2300",
  },
  {
    name: "Massachusetts Institute of Technology",
    description:
      "A world-renowned private research university specializing in science, technology, engineering, and mathematics. MIT is known for its cutting-edge research and innovation.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    location: "Cambridge, Massachusetts, USA",
    rating: 4.9,
    website: "https://www.mit.edu",
    email: "admissions@mit.edu",
    phone: "+1-617-253-1000",
  },
  {
    name: "University of Oxford",
    description:
      "The oldest university in the English-speaking world, Oxford is a collegiate research university known for its academic excellence and rich history.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
    location: "Oxford, England, UK",
    rating: 4.8,
    website: "https://www.ox.ac.uk",
    email: "admissions@ox.ac.uk",
    phone: "+44-1865-270000",
  },
  {
    name: "University of Cambridge",
    description:
      "A collegiate research university with a rich history dating back to 1209. Cambridge is known for its academic excellence and beautiful architecture.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    location: "Cambridge, England, UK",
    rating: 4.8,
    website: "https://www.cam.ac.uk",
    email: "admissions@cam.ac.uk",
    phone: "+44-1223-337733",
  },
  {
    name: "California Institute of Technology",
    description:
      "A world-renowned science and engineering institute that maintains a strong emphasis on science and engineering education and research.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    location: "Pasadena, California, USA",
    rating: 4.7,
    website: "https://www.caltech.edu",
    email: "ugadmissions@caltech.edu",
    phone: "+1-626-395-6811",
  },
  {
    name: "Princeton University",
    description:
      "A private Ivy League research university known for its academic excellence, beautiful campus, and strong emphasis on undergraduate education.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    location: "Princeton, New Jersey, USA",
    rating: 4.8,
    website: "https://www.princeton.edu",
    email: "uaoffice@princeton.edu",
    phone: "+1-609-258-3000",
  },
  {
    name: "Yale University",
    description:
      "A private Ivy League research university known for its academic excellence, beautiful campus, and strong commitment to liberal arts education.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
    location: "New Haven, Connecticut, USA",
    rating: 4.8,
    website: "https://www.yale.edu",
    email: "admissions@yale.edu",
    phone: "+1-203-432-4771",
  },
  {
    name: "University of Chicago",
    description:
      "A private research university known for its rigorous academic programs, strong emphasis on research, and commitment to free and open inquiry.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    location: "Chicago, Illinois, USA",
    rating: 4.7,
    website: "https://www.uchicago.edu",
    email: "admissions@uchicago.edu",
    phone: "+1-773-702-1234",
  },
  {
    name: "Columbia University",
    description:
      "A private Ivy League research university located in New York City, known for its academic excellence and diverse student body.",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
    location: "New York, New York, USA",
    rating: 4.7,
    website: "https://www.columbia.edu",
    email: "ugrad-ask@columbia.edu",
    phone: "+1-212-854-2522",
  },
  {
    name: "University of Pennsylvania",
    description:
      "A private Ivy League research university known for its interdisciplinary approach to education and strong emphasis on practical knowledge.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    location: "Philadelphia, Pennsylvania, USA",
    rating: 4.7,
    website: "https://www.upenn.edu",
    email: "info@admissions.upenn.edu",
    phone: "+1-215-898-7507",
  },
  {
    name: "Duke University",
    description:
      "A private research university known for its academic excellence, beautiful campus, and strong programs in medicine, law, and business.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
    location: "Durham, North Carolina, USA",
    rating: 4.6,
    website: "https://www.duke.edu",
    email: "admissions@duke.edu",
    phone: "+1-919-684-3214",
  },
  {
    name: "Northwestern University",
    description:
      "A private research university known for its strong programs in journalism, engineering, and business, located on the shores of Lake Michigan.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    location: "Evanston, Illinois, USA",
    rating: 4.6,
    website: "https://www.northwestern.edu",
    email: "ug-admission@northwestern.edu",
    phone: "+1-847-491-7271",
  },
  {
    name: "Johns Hopkins University",
    description:
      "A private research university known for its excellence in medicine, public health, and international studies, with a strong emphasis on research.",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
    location: "Baltimore, Maryland, USA",
    rating: 4.6,
    website: "https://www.jhu.edu",
    email: "gotojhu@jhu.edu",
    phone: "+1-410-516-8171",
  },
  {
    name: "Cornell University",
    description:
      "A private Ivy League research university known for its diverse academic programs, beautiful campus, and strong emphasis on both theoretical and practical education.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    location: "Ithaca, New York, USA",
    rating: 4.6,
    website: "https://www.cornell.edu",
    email: "admissions@cornell.edu",
    phone: "+1-607-255-5241",
  },
];

// Generate complete college data with all required fields
const colleges = baseColleges.map(generateCollegeFields);

async function insertColleges() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("DATABASE_URL not found in environment variables");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("edu_connect");
    const collegesCollection = db.collection("College");

    // Clear existing colleges (optional - remove this if you want to keep existing data)
    await collegesCollection.deleteMany({});
    console.log("Cleared existing college data");

    // Insert new colleges
    const result = await collegesCollection.insertMany(colleges);
    console.log(`Successfully inserted ${result.insertedCount} colleges`);

    // Display inserted colleges
    const insertedColleges = await collegesCollection.find({}).toArray();
    console.log("\nInserted colleges:");
    insertedColleges.forEach((college, index) => {
      console.log(
        `${index + 1}. ${college.name} - ${college.location} (Rating: ${
          college.rating
        })`
      );
    });
  } catch (error) {
    console.error("Error inserting colleges:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

insertColleges();
