import type React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CmsLayoutClient from "./CmsLayoutClient";
import "../globals.css";

/**
 * Server Component: Admin CMS Layout with Server-Side Authentication
 *
 * This layout protects all admin routes by checking authentication on the server
 * before rendering any content. This prevents unauthorized access and provides
 * better security than client-side only checks.
 *
 * Uses getUser() instead of getSession() to verify authentication with Supabase
 * Auth server, ensuring the session is valid and not tampered with.
 */
export default async function CmsLayout({ children }: { children: React.ReactNode }) {
	// Server-side authentication check
	const supabase = await createClient();

	// Use getUser() instead of getSession() for secure authentication verification
	// This validates the session with Supabase Auth server
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	// Redirect to login if not authenticated (happens on server)
	if (error || !user) {
		redirect("/login");
	}

	// If authenticated, render the client layout
	return <CmsLayoutClient>{children}</CmsLayoutClient>;
}
