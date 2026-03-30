import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const locale = request.nextUrl.pathname.split("/").filter(Boolean)[0];
  const requestHeaders = new Headers(request.headers);

  if (isLocale(locale)) {
    requestHeaders.set("x-locale", locale);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/fr/:path*", "/en/:path*"],
};
