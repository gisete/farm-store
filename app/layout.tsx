import "./globals.css";
import type { Metadata } from "next";
import { Inter, Open_Sans, Lato, Lora } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const open_sans = Open_Sans({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-open-sans",
});

const lato = Lato({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
	variable: "--font-lato",
});

export const metadata: Metadata = {
	title: "Horta do Pé Descalço",
	description: "",
	icons: {
		icon: "/favicon.ico", // /public path
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en-150" className={lato.className}>
			<body className="font-body">{children}</body>
		</html>
	);
}
