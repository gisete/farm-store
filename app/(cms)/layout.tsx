"use client";

import "../globals.css";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import SidePanel from "./components/SidePanel";
import LogoutButton from "./components/LogoutButton";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@lib/firebaseAuth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [isUserValid, setIsUserValid] = useState(false);
	const router = useRouter();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsUserValid(true);
			} else {
				router.push("/login");
			}
		});
	}, []);

	return (
		<html lang="pt-BR">
			<body className={inter.className}>
				{isUserValid && (
					<div className="bg-[#fbf8f3]">
						<LogoutButton />

						<div className="flex">
							<aside className="w-64 h-screen ">
								<SidePanel />
							</aside>

							<main className="h-screen flex-1 pb-8 pr-8">
								<div className="bg-white min-h-full px-12 py-16">{children}</div>
							</main>
						</div>
					</div>
				)}
			</body>
		</html>
	);
}
