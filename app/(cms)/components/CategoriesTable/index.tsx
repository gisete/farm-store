"use client";
import { deleteCategory } from "@lib/firebase";

type CategoriesTableProps = {
	categories: Array<any>;
};

export default function CategoriesTable({ categories }: CategoriesTableProps) {
	return (
		<div className="overflow-hidden ">
			{categories && categories.length > 0 && (
				<table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
					<thead className="bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900">
								Name
							</th>
							<th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100 border-t border-gray-100">
						{categories.map((category, index) => (
							<tr className="" key={category.slug}>
								<th className="px-6 py-4 font-medium text-gray-900">{category.name}</th>
								<td className="px-6 py-4">
									<div className="flex justify-end gap-4">
										<button
											x-data="{ tooltip: 'Delete' }"
											onClick={() => {
												const shouldDeleteCategory = confirm("Are you sure you want to delete this product?");
												if (shouldDeleteCategory) {
													deleteCategory(category.slug);
												}
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												className="h-6 w-6"
												x-tooltip="tooltip"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
												/>
											</svg>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
