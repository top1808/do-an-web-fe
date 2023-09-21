import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/admin')) {
		// Add /profile specific logics
		console.log(123);
	}
	if (request.nextUrl.pathname.startsWith('/home')) {
		// Add /dashboard specific logics
	}
}
export const config = {
	matcher: ['/app/admin'],
};
