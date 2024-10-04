import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const userToken = request.cookies.get("userToken");
  const { pathname } = request.nextUrl;

  //? Si el usuario está autenticado

  if (userToken) {
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //? Si el usuario NO está autenticado
  else {
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.next();
    }

    if (pathname === "/profile" || pathname.startsWith("/profile/") || pathname === "/cart") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};
