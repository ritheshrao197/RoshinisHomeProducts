import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Admin routes we want to protect
    const adminRoutes = ['/dashboard', '/products', '/orders', '/customers'];
    const isProtectedRoute = adminRoutes.some(route => request.nextUrl.pathname.startsWith(route));

    if (isProtectedRoute) {
        // In a fully configured environment, we'd check Supabase Auth cookies
        // const supabase = createServerClient(...)
        // const { data: { user } } = await supabase.auth.getUser()

        // For now, if there's no auth hint, we allow access with a warning or 
        // we would redirect to a /login page. We'll simulate auth success for demo
        // if(!user) return NextResponse.redirect(new URL('/login', request.url))
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
