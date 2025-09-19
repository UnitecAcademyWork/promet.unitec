import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  const publicRoutes = ["/", "/login", "/registro",, "/duvidas", "/recuperar-senha", "/formulario/parceiro", "/cursos"];

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  if (publicRoutes.some((route) => pathname === route)) {
    return NextResponse.next();
  }

  // Se não houver token → redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Todas as rotas de páginas
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
