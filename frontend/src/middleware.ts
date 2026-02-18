import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session');

    // Protect admin-only routes
    if (request.nextUrl.pathname.startsWith('/admins') ||
        request.nextUrl.pathname.startsWith('/dashboard')) {

        const devBypass = process.env.NEXT_PUBLIC_DEV_ADMIN_BYPASS === "true";
        if (devBypass) return NextResponse.next();

        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Redirect from auth pages if already logged in
    if (session && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup'))) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
