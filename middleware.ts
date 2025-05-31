import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);

	if (!sessionCookie) {
		const currentPath = request.nextUrl.pathname;
		return NextResponse.redirect(
			new URL(
				`/sign-in?redirect=${encodeURIComponent(currentPath)}`,
				request.url,
			),
		);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/event/:id/join'], // Only protect the join route
};
