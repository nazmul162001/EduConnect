import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  useSecureCookies: process.env.NODE_ENV === "production",
  callbacks: {
    async signIn({ user, account, profile: _profile }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Connect to MongoDB
          const uri = process.env.DATABASE_URL;
          if (!uri) {
            throw new Error("DATABASE_URL not set");
          }

          const client = new MongoClient(uri);
          await client.connect();
          const db = client.db("edu_connect");
          const usersCollection = db.collection("User");

          // Check if user already exists
          const existingUser = await usersCollection.findOne({
            email: user.email,
          });

          if (!existingUser) {
            // Create new user with Google account
            const newUser = {
              email: user.email!,
              name: user.name!,
              password: await bcrypt.hash("google-oauth-user", 12), // Dummy password for OAuth users
              role: "STUDENT",
              avatar: user.image,
              // Address fields with default empty values
              street: "",
              city: "",
              state: "",
              zipCode: "",
              country: "",
              // College fields with default empty values
              university: "",
              major: "",
              graduationYear: "",
              gpa: "",
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            await usersCollection.insertOne(newUser);
          } else {
            // Update existing user with Google info if needed
            await usersCollection.updateOne(
              { email: user.email },
              {
                $set: {
                  name: user.name,
                  avatar: user.image,
                  updatedAt: new Date(),
                },
              }
            );
          }

          await client.close();
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // For OAuth users, we need to get the user ID from the database
        if (account?.provider === "google" || account?.provider === "github") {
          try {
            const uri = process.env.DATABASE_URL;
            if (uri) {
              const client = new MongoClient(uri);
              await client.connect();
              const db = client.db("edu_connect");
              const usersCollection = db.collection("User");

              const dbUser = await usersCollection.findOne({
                email: user.email,
              });

              if (dbUser) {
                token.id = dbUser._id.toString();
                token.name = dbUser.name;
                token.email = dbUser.email;
                token.role = dbUser.role;
                token.avatar = dbUser.avatar;
                // Include address fields in token
                token.street = dbUser.street || "";
                token.city = dbUser.city || "";
                token.state = dbUser.state || "";
                token.zipCode = dbUser.zipCode || "";
                token.country = dbUser.country || "";
                // Include college fields in token
                token.university = dbUser.university || "";
                token.major = dbUser.major || "";
                token.graduationYear = dbUser.graduationYear || "";
                token.gpa = dbUser.gpa || "";
              }

              await client.close();
            }
          } catch (error) {
            console.error("Error getting user ID in jwt callback:", error);
          }
        } else {
          token.id = user.id;
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Always fetch fresh user data from database to ensure we have the latest info
        try {
          const uri = process.env.DATABASE_URL;
          if (uri) {
            const client = new MongoClient(uri);
            await client.connect();
            const db = client.db("edu_connect");
            const usersCollection = db.collection("User");

            const dbUser = await usersCollection.findOne({
              _id: new (await import("mongodb")).ObjectId(token.id as string),
            });

            if (dbUser) {
              // Update session with fresh data from database
              session.user.id = dbUser._id.toString();
              session.user.name = dbUser.name;
              session.user.email = dbUser.email;
              session.user.role = dbUser.role;
              session.user.image = dbUser.avatar;
              // Include address fields in session
              session.user.street = dbUser.street || "";
              session.user.city = dbUser.city || "";
              session.user.state = dbUser.state || "";
              session.user.zipCode = dbUser.zipCode || "";
              session.user.country = dbUser.country || "";
              // Include college fields in session
              (session.user as Record<string, string>).university =
                dbUser.university || "";
              (session.user as Record<string, string>).major =
                dbUser.major || "";
              (session.user as Record<string, string>).graduationYear =
                dbUser.graduationYear || "";
              (session.user as Record<string, string>).gpa = dbUser.gpa || "";
            }

            await client.close();
          }
        } catch (error) {
          console.error("Error fetching user data in session callback:", error);
          // Fallback to token data if database fetch fails
          session.user.id = token.id as string;
          session.user.role = token.role as string;
          session.user.street = token.street as string;
          session.user.city = token.city as string;
          session.user.state = token.state as string;
          session.user.zipCode = token.zipCode as string;
          session.user.country = token.country as string;
          (session.user as Record<string, string>).university =
            token.university as string;
          (session.user as Record<string, string>).major =
            token.major as string;
          (session.user as Record<string, string>).graduationYear =
            token.graduationYear as string;
          (session.user as Record<string, string>).gpa = token.gpa as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
