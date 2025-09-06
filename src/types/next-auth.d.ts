import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
      university?: string;
      major?: string;
      graduationYear?: string;
      gpa?: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    university?: string;
    major?: string;
    graduationYear?: string;
    gpa?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
    avatar?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    university?: string;
    major?: string;
    graduationYear?: string;
    gpa?: string;
  }
}
