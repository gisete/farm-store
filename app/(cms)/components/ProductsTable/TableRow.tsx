"use client";

import { deleteProduct, toggleProductStatus, updateProductField } from "@/lib/supabase/actions";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

type SingleProductProps = {
	product: {
		id: string;
		image: string;
		name: string;
		description: string;
		price: number;
		price_unit: number;
		low_stock: boolean;
		slug: string;
		is_active: boolean;
	};
};

// --- Reusable component for inline price editing ---
const EditablePrice = ({
	productId,
	field,
	initialValue,
}: {
	productId: string;
	field: "price" | "price_unit";
	initialValue: number;
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(initialValue);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus();
			inputRef.current?.select();
		}
	}, [isEditing]);

	const handleSave = async () => {
		setIsEditing(false);
		if (value === initialValue) {
			return;
		}

		try {
			await updateProductField(productId, field, value);
			toast.success("Price updated successfully!");
		} catch (error) {
			toast.error("Failed to update price");
			setValue(initialValue);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSave();
		} else if (e.key === "Escape") {
			setValue(initialValue);
			setIsEditing(false);
		}
	};

	if (isEditing) {
		return (
			<input
				ref={inputRef}
				type="number"
				value={value}
				onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
				onKeyDown={handleKeyDown}
				onBlur={handleSave}
				className="w-20 px-2 py-1 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
				step="0.01"
			/>
		);
	}

	return (
		<div
			onClick={() => setIsEditing(true)}
			className="cursor-pointer h-full p-1 rounded-md hover:bg-gray-100 transition-colors min-w-[5rem] flex items-center"
		>
			{initialValue > 0 ? `€${initialValue.toFixed(2)}` : "-"}
		</div>
	);
};

const TableRow = ({ product }: SingleProductProps) => {
	const [isActive, setIsActive] = useState(product.is_active);

	const handleDelete = async () => {
		const shouldDeleteProduct = confirm("Are you sure you want to delete this product?");
		if (shouldDeleteProduct) {
			try {
				await deleteProduct(product.slug);
				toast.success("Product deleted successfully!");
			} catch (error) {
				toast.error("Failed to delete product");
			}
		}
	};

	const handleStatusChange = async () => {
		const newStatus = !isActive;
		setIsActive(newStatus);

		try {
			await toggleProductStatus(product.id, newStatus);
			toast.success("Status updated successfully!");
		} catch (error) {
			setIsActive(!newStatus);
			toast.error("Failed to update status");
		}
	};

	return (
		<tr className="">
			<th className="px-6 py-4 font-medium text-base text-gray-600">
				<Link href={`/admin/edit/${product.slug}`}> {product.name}</Link>
			</th>
			<td className="px-6 py-4">
				<button
					onClick={handleStatusChange}
					className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-full"
				>
					{isActive ? (
						<div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
							<h2 className="text-sm font-normal">Active</h2>
						</div>
					) : (
						<div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-orange-500 bg-orange-100/60 dark:bg-gray-800">
							<h2 className="text-sm font-normal">Inactive</h2>
						</div>
					)}
				</button>
			</td>
			<td className="px-6 py-4 text-gray-900">
				<EditablePrice productId={product.id} field="price" initialValue={product.price} />
			</td>
			<td className="px-6 py-4 text-gray-900">
				<EditablePrice productId={product.id} field="price_unit" initialValue={product.price_unit} />
			</td>
			<td className="px-6 py-4">
				{product.low_stock && (
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
					<button x-data="{ tooltip: 'Delete' }" onClick={handleDelete}>
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
				</div>
				{/* The Notification component is no longer needed here */}
			</td>
		</tr>
	);
};

export default TableRow;
