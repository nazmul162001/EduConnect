// Middleware disabled - using client-side protection with Protected component instead
// This approach is more reliable for JWT + NextAuth hybrid authentication

export async function middleware() {
  // No middleware logic - all protection handled client-side
  return;
}

export const config = {
  matcher: [],
};
