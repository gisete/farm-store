import { database } from "@/lib/firebase-config";
import { ref, onValue } from "firebase/database";
import { useState } from "react";

export default function () {
	const productsRef = ref(database, "products");
	const [allProducts, setAllProducts] = useState([]);
	const [productsLength, setProductsLength] = useState(0);

	function getAllProducts() {
		onValue(productsRef, (snapshot) => {
			const data = snapshot.val();
			var result = [];

			for (var slug in data) {
				const product = data[slug];
				result.push(product);
			}
			setProductsLength(result.length);
			setAllProducts(result);
		});
	}

	function getProductsLength() {
		getAllProducts();
	}

	return { allProducts, getAllProducts, getProductsLength, productsLength };
}
