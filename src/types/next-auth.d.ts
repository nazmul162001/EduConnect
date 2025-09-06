import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      // Address fields
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
  }

  interface User {
    id: string;
    role?: string;
    // Address fields
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
    // Address fields
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  }
}
