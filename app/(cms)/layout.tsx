"use client";

import type React from "react";

import "../globals.css";
import { useState, useEffect } from "react";
import SidePanel from "./components/SidePanel";
import LogoutButton from "./components/LogoutButton";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Notification from "./components/Notification";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [mounted, setMounted] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setMounted(true);
		const checkSession = async () => {
			const supabase = createClient();
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session) {
				setUser(session.user);
			} else {
				router.push("/login");
			}
			setLoading(false);
		};

		checkSession();
	}, [router]);

	if (!mounted) {
		return null;
	}

	if (loading) {
		return <div className="flex h-screen items-center justify-center">Loading...</div>;
	}

	if (user) {
		return (
			<div className="bg-[#fbf8f3]">
				<LogoutButton />
				<div className="flex">
					<aside className="w-64 min-h-lvh h-full">
						<SidePanel />
					</aside>
					<main className="min-h-lvh h-full flex-1 pb-8 pr-8">
						<Notification />
						<div className="bg-white min-h-full px-12 py-16">{children}</div>
					</main>
				</div>
			</div>
		);
	}

	return null;
}
