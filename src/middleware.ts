import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
