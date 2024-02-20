import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SidePanel from "./components/SidePanel";
import LogoutButton from "./components/LogoutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Horta do Pé Descalço",
	description: "Admin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
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
			</body>
		</html>
	);
}
