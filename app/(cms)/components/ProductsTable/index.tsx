"use client";

import TableRow from "./TableRow";
import useSWR from "swr";

export default function ProductsTable() {
	const fetcher = (...args) => fetch(...args).then((res) => res.json());
	const { data } = useSWR("/api/getProducts", fetcher);
	const allProducts = data?.data;

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
				{data && (
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

// {
//   "data": [
//       {
//           "description": "sdsd",
//           "hasKg": true,
//           "hasUn": false,
//           "isProductActive": true,
//           "lowStock": false,
//           "name": "sdsdsd",
//           "position": 0,
//           "price": "3",
//           "priceUnit": "3",
//           "slug": "sdsdsd",
//           "unit": "kg"
//       },
//       {
//           "description": "test",
//           "hasKg": true,
//           "hasUn": false,
//           "isProductActive": true,
//           "lowStock": false,
//           "name": "test",
//           "position": 0,
//           "price": "4",
//           "priceUnit": 0,
//           "slug": "test",
//           "unit": "kg"
//       }
//   ]
// }
