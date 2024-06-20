"use client";

import { useEffect, useState } from "react";
import Products from "../components/Products";
import Cart from "../components/Cart";
import useGetProducts from "../hooks/useGetProducts";
import LoadingProducts from "../components/LoadingProducts";

type ProductsProps = {
	products: [
		product: {
			image: string;
			name: string;
			description: string;
			price: number;
			unit: string;
			slug: string;
		}
	];
};

export default function Home() {
	const [products, setProducts] = useState([]);
	const { allProducts, getAllProducts } = useGetProducts();

	useEffect(() => {
		getAllProducts();
	}, []);

	useEffect(() => {
		setProducts(allProducts);
	}, [allProducts]);

	return (
		<div className="flex flex-col lg:flex-row">
			<div className="p-3 pt-6 md:p-6 md:pt-10 flex-[2.5]  md:border-r border-black">
				{!products || products.length === 0 ? <LoadingProducts /> : <Products products={products} />}
			</div>

			<div className="flex-1 relative">
				<Cart />
			</div>
		</div>
	);
}
