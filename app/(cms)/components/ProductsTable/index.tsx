import TableRow from "./TableRow";

// This is now a Server Component that receives products as a prop.
export default function ProductsTable({ products }) {
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
				{products && products.length > 0 && (
					<tbody className="divide-y divide-gray-100 border-t border-gray-100">
						{products.map((product, index) => (
							<TableRow product={product} key={`prod-${index}`} />
						))}
					</tbody>
				)}
			</table>
		</div>
	);
}
