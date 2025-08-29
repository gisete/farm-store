// File: app/hooks/useGetProducts.tsx
import { useState } from "react";
import { getProducts as getProductsSupabase } from "@/lib/supabase/actions";

export default function useGetProducts() {
	const [allProducts, setAllProducts] = useState([]);
	const [productsLength, setProductsLength] = useState(0);

	async function getAllProducts() {
		const { data, error } = await getProductsSupabase();
		if (data) {
			setAllProducts(data);
			setProductsLength(data.length);
		}
		if (error) {
			console.error(error);
		}
	}

	function getProductsLength() {
		getAllProducts();
	}

	return { allProducts, getAllProducts, getProductsLength, productsLength };
}
