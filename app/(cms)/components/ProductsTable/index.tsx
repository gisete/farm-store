import TableRow from "./TableRow";

async function getProductsData() {
	const res = await fetch(process.env.URL + "/api/getProducts", { method: "GET", cache: "no-store" });
	const { data } = await res.json();

	if (!res.ok) {
		return null;
	}

	return data;
}

export default async function ProductsTable() {
	const data = await getProductsData();

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
						{Object.keys(data).map((product, index) => (
							<TableRow product={data[product]} key={`prod-${index}`} />
						))}
					</tbody>
				)}
			</table>
		</div>
	);
}
