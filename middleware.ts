import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  // Rotas públicas
  const publicRoutes = ["/", "/login", "/registro", "/recuperar-senha"];

  // Ignora arquivos estáticos e rotas internas do Next
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // Se for rota pública → deixa passar
  if (publicRoutes.some((route) => pathname === route)) {
    return NextResponse.next();
  }

  // Se não houver token → redireciona para /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Aplica em todas as rotas de páginas
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
