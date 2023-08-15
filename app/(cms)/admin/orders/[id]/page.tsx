import { getOrderById } from "@/lib/firebase";

async function getFiredbaseOrder(id: string) {
	const res = await getOrderById(id);
	return res;
}

export default async function Page({ params }: { params: { id: string } }) {
	const { data } = await getFiredbaseOrder(params.id);

	return (
		<section>
			<div className="mb-8">
				<h1 className="text-2xl">Order Summary</h1>
			</div>

			<div className="mb-4">
				<h3 className="text-xl mb-4 text-zinc-400">Invoice #{data.id}</h3>

				<div className="mb-3">
					<h4 className="block uppercase tracking-wide text-zinc-400 text-xs">Order Total</h4>
					<p className="text-emerald-500 text-xl">€{data.total}</p>
				</div>

				<div className="mb-3">
					<h4 className="block uppercase tracking-wide text-zinc-400 text-xs">Date</h4>
					<p>{data.date}</p>
				</div>

				<div className="mb-3">
					<h4 className="block uppercase tracking-wide text-zinc-400 text-xs">Customer</h4>
					<p>{data.name}</p>
				</div>

				<div className="mb-3">
					<h4 className="block uppercase tracking-wide text-zinc-400 text-xs">Phone</h4>
					<p>{data.phone}</p>
				</div>
			</div>
			<hr></hr>
			<div className="mt-4 mb-8">
				<h3 className="block uppercase tracking-wide text-zinc-400 text-xs">Notes</h3>
				<p>{data.comment}</p>
			</div>
			<hr></hr>
			<div className="mt-4 mb-8">
				<h3 className="text-xl mb-4">Itens</h3>

				<table className="w-full border-collapse bg-white text-left text-sm text-zinc-500">
					<thead className="bg-zinc-50">
						<tr>
							<th scope="col" className="font-mono px-2 py-2 font-medium text-zinc-900">
								Nome
							</th>
							<th scope="col" className="font-mono px-2 text-center py-2 font-medium text-zinc-900">
								Preço
							</th>
							<th scope="col" className="font-mono px-2 text-center py-2 font-medium text-zinc-900">
								Quantidade
							</th>
							<th scope="col" className="font-mono px-2 text-center py-2 font-medium text-zinc-900">
								Subtotal
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-zinc-100 border-t border-zinc-50">
						{data.products.map((product, index) => (
							<tr key={`prod-${index}`}>
								<td className="font-mono px-2 py-2 text-sm">{product.name}</td>
								<td className="font-mono px-2 py-2 text-center text-sm">
									€{product.price}/{product.unit}
								</td>
								<td className="font-mono px-2 py-2 text-center text-sm">
									{product.quantity} {product.unit}
								</td>
								<td className="px-2 py-2 font-mono text-center text-sm">€{product.subTotal}</td>
							</tr>
						))}
					</tbody>
					<tfoot className="border-t border-zinc-100">
						<tr>
							<td></td>
							<td></td>
							<th scope="row" className="text-center font-mono text-zinc-900 text-l px-2 pt-3">
								Total
							</th>
							<td className="px-2 pt-3 text-center font-mono font-bold text-l text-zinc-900">€{data.total}</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</section>
	);
}
