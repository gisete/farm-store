"use client";

import TableRow from "./TableRow";
import { useEffect, useState } from "react";
import { database } from "@/lib/firebase-config";
import { ref, onValue } from "firebase/database";

export default function ProductsTable() {
	const productsRef = ref(database, "products");
	const [allProducts, setAllProducts] = useState([]);

	useEffect(() => {
		onValue(productsRef, (snapshot) => {
			const data = snapshot.val();
			var result = [];

			for (var slug in data) {
				const product = data[slug];
				result.push(product);
			}

			setAllProducts(result);
		});
	}, []);

	return (
		<div className="overflow-hidden ">
			<table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
				<thead className="bg-gray-50">
					<tr>
						<th scope="col" className="px-6 py-4 font-medium text-gray-900">
							Name
						</th>
						<th scope="col" className="px-6 py-4 font-medium text-gray-900">
							Status
						</th>
						<th scope="col" className="px-6 py-4 font-medium text-gray-900">
							Price (kg)
						</th>
						<th scope="col" className="px-6 py-4 font-medium text-gray-900">
							Price (un)
						</th>
						<th scope="col" className="px-6 py-4 font-medium text-gray-900">
							Low Stock
						</th>
						<th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
					</tr>
				</thead>
				{allProducts && (
					<tbody className="divide-y divide-gray-100 border-t border-gray-100">
						{allProducts.map((product, index) => (
							<TableRow product={product} key={`prod-${index}`} />
						))}
					</tbody>
				)}
			</table>
		</div>
	);
}

export const revalidate = 60;
