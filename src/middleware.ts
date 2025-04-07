import { NextResponse, type NextRequest } from "next/server";
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "./auth/core/session";

const vetRoutes = "/vet";
const adminRoutes = "/admin";

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value });
    },
    get: (key) => response.cookies.get(key),
  });

  return response;
}

async function middlewareAuth(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith(vetRoutes)) {
    console.log("HERE");
    const user = await getUserFromSession(request.cookies);
    if (user == null) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (!user.roles.includes("VET")) {
      console.log({ user });
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith(adminRoutes)) {
    const user = await getUserFromSession(request.cookies);
    if (user == null) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (!user.roles.includes("ADMIN")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
