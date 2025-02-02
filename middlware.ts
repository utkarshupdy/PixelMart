import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Determines whether a request is authorized based on the provided token and the request's pathname.
 *
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.token - The token object containing user information.
 * @param {Object} params.req - The request object containing URL details.
 * @param {Object} params.req.nextUrl - The URL of the incoming request.
 * 
 * @returns {boolean} - Returns true if the request is authorized, false otherwise.
 * 
 * The authorization logic is as follows:
 * - Allows requests to the webhook endpoint.
 * - Allows requests to authentication-related routes.
 * - Allows requests to public routes.
 * - Requires an admin role for admin routes.
 * - Requires a valid token for all other routes.
 */

/******  b5ebc5a4-3892-4535-bb53-783d922c2c21  *******/ 

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow webhook endpoint
        if (pathname.startsWith("/api/webhook")) {
          return true;
        }

        // Allow auth-related routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // Public routes
        if (
          pathname === "/" ||
          pathname.startsWith("/api/products") ||
          pathname.startsWith("/products")
        ) {
          return true;
        }

        // Admin routes require admin role
        if (pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }

        // All other routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};