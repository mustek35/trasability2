import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { auth: session } = req;
  if (!session && !req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
