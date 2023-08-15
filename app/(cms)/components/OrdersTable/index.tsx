import { getOrders } from "@lib/firebase";
import TableRow from "./TableRow";

async function getMyOrders() {
	const res = await getOrders();
	return res;
}

export default async function OrdersTable() {
	const { data } = await getMyOrders();

	return (
		<div className="overflow-hidden ">
			{data && data.length > 0 && (
				<table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
					<thead className="bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">
								Name
							</th>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">
								Phone
							</th>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">
								Date
							</th>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">
								Total
							</th>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 border-t border-gray-100">
						{data.map((order, index) => (
							<TableRow order={order} key={`ord-${index}`} />
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
