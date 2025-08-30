import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider"

const lato = Lato({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
	variable: "--font-lato",
});

export const metadata: Metadata = {
	title: "Horta do Pé Descalço",
	description: "",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en-150" className={lato.className} suppressHydrationWarning>
			<body className="font-body">
				{children}
				{/* </ThemeProvider> */}
			</body>
		</html>
	);
}
