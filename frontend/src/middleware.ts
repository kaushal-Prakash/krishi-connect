import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const publicRoutes = ["/login", "/signup", "/"];
  const authRoutes = ["/login", "/signup"];
  const protectedRoutes = ["/user-home", "/profile","/forums/organic-farming"]; 
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Skip middleware for static files
  if (pathname.startsWith('/_next/') || 
      pathname.startsWith('/api/') || 
      pathname.startsWith('/static/') ||
      /\.(png|jpg|jpeg|svg|ico)$/.test(pathname)) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/user-home", req.url));
  }

  // Protect private routes
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)'
  ]
};