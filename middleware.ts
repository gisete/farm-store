import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@lib/firebaseAuth";

export function middleware(request: NextRequest) {
	const currentUser = auth.currentUser;

	if (currentUser) {
		console.log("User is logged in");
		// return NextResponse.redirect(new URL("/admin", request.url));
	}
	// return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: [
		// Update the pattern to exclude .ico files as well
		"/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$).*)",
	],
};
