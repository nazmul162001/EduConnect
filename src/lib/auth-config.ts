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
    async signIn({ user, account, profile }) {
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
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
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
