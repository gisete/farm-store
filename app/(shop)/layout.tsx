// File: app/(shop)/layout.tsx
import "../globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import CartProvider from "./providers/CartProvider";

export const metadata: Metadata = {
	title: "Horta do Pé Descalço",
	description: "",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
	return (
		<CartProvider>
			<div className="border border-black max-w-(--breakpoint-xl) xl:mr-auto xl:ml-auto m-2">
				<Header />
				<main>{children}</main>
			</div>
		</CartProvider>
	);
}
