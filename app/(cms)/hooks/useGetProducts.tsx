import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function useGetProducts() {
	const [allProducts, setAllProducts] = useState([]);
	const [productsLength, setProductsLength] = useState(0);

	async function getAllProducts() {
		const supabase = createClient();
		const { data, error } = await supabase.from("products").select("id");

		if (error) {
			console.error("Error fetching products:", error);
			setAllProducts([]);
			setProductsLength(0);
		} else {
			setAllProducts(data || []);
			setProductsLength(data?.length || 0);
		}
	}

	return { allProducts, getAllProducts, productsLength };
}
