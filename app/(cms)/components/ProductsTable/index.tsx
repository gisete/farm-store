import { getProducts } from "@lib/firebase";
import TableRow from "./TableRow";

async function getMyProducts() {
	const res = await getProducts();
	return res;
}

export default async function ProductsTable() {
	const { data } = await getMyProducts();

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
				<tbody className="divide-y divide-gray-100 border-t border-gray-100">
					{data &&
						data.length > 0 &&
						data.map((product, index) => <TableRow product={product} key={`prod-${index}`} />)}
				</tbody>
			</table>
		</div>
	);
}
