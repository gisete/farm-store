import "../globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";

import CartProvider from "./providers/CartProvider";

export const metadata: Metadata = {
	title: "Horta do Pé Descalço",
	description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en-150">
			<CartProvider>
				<body className="font-body m-2">
					<div className="border border-black max-w-screen-xl xl:mr-auto xl:ml-auto m-2">
						<Header />
						<main>{children}</main>
					</div>
				</body>
			</CartProvider>
		</html>
	);
}
