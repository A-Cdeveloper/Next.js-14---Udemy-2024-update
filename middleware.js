import { NextResponse } from "next/server";
import { auth } from "@/app/_lib/auth";

// This function can be marked `async` if using `await` inside
// export async function middleware(request) {
//   const session = await auth();
//   if (!session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   //   console.log("HI FROM MIDDLWARE");
//   //   return NextResponse.next();
// }

export const middleware = auth;

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/account/:path*",
};
