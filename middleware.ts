import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./config/locales";

const publicPages = ["/sign-in", "/sign-up", "/take-quiz-guest"];
const redirectAfterLogin = "/dashboard";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "never",
});

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const accessToken = req.cookies.get("AccessToken");

  const isEightCharPath =
    req.nextUrl.pathname.length === 9 && req.nextUrl.pathname.startsWith("/");

  if (req.nextUrl.pathname === "/" && accessToken) {
    url.pathname = redirectAfterLogin;
    return NextResponse.redirect(url);
  }

  if (isEightCharPath) {
    return intlMiddleware(req);
  }

  if (publicPages.includes(req.nextUrl.pathname)) {
    if (accessToken) {
      url.pathname = redirectAfterLogin;
      return NextResponse.redirect(url);
    }
    return intlMiddleware(req);
  } else {
    if (accessToken) {
      return intlMiddleware(req);
    } else {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
