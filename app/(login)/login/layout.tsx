// File: app/(login)/login/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Login page for the admin dashboard.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
	return <main>{children}</main>;
}
