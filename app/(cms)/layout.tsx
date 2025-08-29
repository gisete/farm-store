"use client";

import "../globals.css";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import SidePanel from "./components/SidePanel";
import LogoutButton from "./components/LogoutButton";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // Import the Supabase browser client
import Notification from "./components/Notification";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
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

	if (loading) {
		return (
			<html lang="pt-BR">
				<body className={inter.className}>
					<div>Loading...</div>
				</body>
			</html>
		);
	}

	return (
		<html lang="pt-BR">
			<body className={inter.className}>
				{user && (
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
				)}
			</body>
		</html>
	);
}
