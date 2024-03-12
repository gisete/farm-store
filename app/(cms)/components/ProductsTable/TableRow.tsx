"use client";

import { deleteProduct } from "@/lib/firebase";
import Link from "next/link";

type SingleProductProps = {
	product: {
		image: string;
		name: string;
		description: string;
		price: number;
		priceUnit: number;
		lowStock: boolean;
		slug: string;
		isProductActive: boolean;
	};
};

const TableRow = ({ product }: SingleProductProps) => {
	return (
		<tr className="">
			<th className="px-6 py-4 font-medium text-gray-600">
				<Link href={`/admin/edit/${product.slug}`}> {product.name}</Link>
			</th>
			<td className="px-6 py-4">
				{product.isProductActive ? (
					<div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
						<h2 className="text-sm font-normal">Active</h2>
					</div>
				) : (
					<div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-orange-500 bg-orange-100/60 dark:bg-gray-800">
						<h2 className="text-sm font-normal">Inactive</h2>
					</div>
				)}
			</td>
			<td className="px-6 py-4 text-gray-900">{product.price > 0 ? "€" + product.price : "-"}</td>
			<td className="px-6 py-4 text-gray-900">{product.priceUnit > 0 ? "€" + product.priceUnit : "-"}</td>
			<td className="px-6 py-4">
				{product.lowStock && (
					<div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10 3L4.5 8.5L2 6"
								stroke="#667085"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>

						<h2 className="text-sm font-normal"></h2>
					</div>
				)}
			</td>
			<td className="px-6 py-4">
				<div className="flex justify-end gap-4">
					<button
						x-data="{ tooltip: 'Delete' }"
						onClick={() => {
							const shouldDeleteProduct = confirm("Are you sure you want to delete this product?");
							if (shouldDeleteProduct) {
								deleteProduct(product.slug);
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-6 w-6"
							x-tooltip="tooltip"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</button>
					{/* <a x-data="{ tooltip: 'Edite' }" href="#">
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
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </a> */}
				</div>
			</td>
		</tr>
	);
};

export default TableRow;
