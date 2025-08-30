import { useState } from "react";

export default function useGetProducts() {
	const [allProducts, setAllProducts] = useState([]);
	const [productsLength, setProductsLength] = useState(0);

	async function getAllProducts() {
		try {
			const response = await fetch("/api/getProducts");
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const { data } = await response.json();
			setAllProducts(data || []);
			setProductsLength(data?.length || 0);
		} catch (error) {
			console.error(error);
			setAllProducts([]);
			setProductsLength(0);
		}
	}

	return { allProducts, getAllProducts, productsLength };
}
