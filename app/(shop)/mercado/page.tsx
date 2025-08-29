"use client";

import { useEffect, useState } from "react";
import Products from "../components/Products";
import Cart from "../components/Cart";
import useGetProducts from "@/app/hooks/useGetProducts";
import LoadingProducts from "../components/LoadingProducts";

export default function Home() {
	const { allProducts, getAllProducts } = useGetProducts();

	useEffect(() => {
		getAllProducts();
	}, []);

	return (
		<div className="flex flex-col lg:flex-row">
			<div className="p-3 pt-6 md:p-6 md:pt-10 flex-[2.5]  md:border-r border-black">
				{!allProducts || allProducts.length === 0 ? <LoadingProducts /> : <Products products={allProducts} />}
			</div>

			<div className="flex-1 relative">
				<Cart />
			</div>
		</div>
	);
}
