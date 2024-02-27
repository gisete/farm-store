import { database } from "@/lib/firebase-config";
import { ref, onValue } from "firebase/database";

export async function getProducts() {
	var result = [];

	const productsRef = ref(database, "products");

	onValue(productsRef, (snapshot) => {
		const data = snapshot.val();
		for (var slug in data) {
			const product = data[slug];
			result.push(product);
		}
	});
	return { result };
}
