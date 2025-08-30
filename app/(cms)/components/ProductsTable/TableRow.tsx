"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { deleteProduct, updateProductField } from "@/lib/supabase/actions";
import Link from "next/link";

const EditablePrice = ({ initialValue, onSave, fieldName }) => {
	const [isEditing, setIsEditing] = useState(false);
	// Store the value as a string to handle intermediate input states correctly
	const [value, setValue] = useState(String(initialValue || ""));

	const handleSave = async () => {
		setIsEditing(false);
		const numericValue = Number.parseFloat(value);

		// Check if the new value is a valid number and different from the initial value
		if (!isNaN(numericValue) && numericValue !== initialValue) {
			try {
				await onSave(fieldName, numericValue);
				toast.success("Price updated successfully");
			} catch (error) {
				toast.error("Failed to update price.");
				// Revert the value on error
				setValue(String(initialValue || ""));
			}
		} else {
			// If the value hasn't changed or is invalid, just revert the display
			setValue(String(initialValue || ""));
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSave();
		}
	};

	return (
		<div className="min-w-[100px] text-left">
			{isEditing ? (
				<input
					type="number"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onBlur={handleSave}
					onKeyDown={handleKeyDown}
					autoFocus
					className="w-full px-2 py-1 border rounded bg-zinc-50"
				/>
			) : (
				<div
					onClick={() => setIsEditing(true)}
					className="cursor-pointer w-full px-2 py-1 text-left"
					role="button"
					tabIndex={0}
					onKeyDown={(e) => e.key === "Enter" && setIsEditing(true)}
				>
					{initialValue > 0 ? `€${initialValue.toFixed(2)}` : "-"}
				</div>
			)}
		</div>
	);
};

type SingleProductProps = {
	product: {
		id: number;
		name: string;
		price: number;
		price_unit: number;
		low_stock: boolean;
		slug: string;
		is_active: boolean;
	};
};

const TableRow = ({ product }: SingleProductProps) => {
	const [isActive, setIsActive] = useState(product.is_active);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleStatusToggle = async () => {
		const newStatus = !isActive;
		setIsActive(newStatus); // Optimistic UI update

		try {
			await updateProductField(product.id, "is_active", newStatus);
			toast.success("Status updated");
		} catch (error) {
			setIsActive(!newStatus); // Revert on error
			toast.error("Failed to update status.");
		}
	};

	const handlePriceSave = (fieldName, newValue) => {
		return updateProductField(product.id, fieldName, newValue);
	};

	return (
		<tr className="">
			<th className="px-6 py-4 font-medium text-base text-gray-600">
				<Link href={`/admin/edit/${product.slug}`}> {product.name}</Link>
			</th>
			<td className="px-6 py-4">
				<button
					onClick={handleStatusToggle}
					className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-sm font-normal transition-colors ${
						isActive ? "text-emerald-500 bg-emerald-100/60" : "text-orange-500 bg-orange-100/60"
					}`}
				>
					{isActive ? "Active" : "Inactive"}
				</button>
			</td>
			<td className="px-6 py-4 text-gray-900">
				<EditablePrice initialValue={product.price || 0} onSave={handlePriceSave} fieldName="price" />
			</td>
			<td className="px-6 py-4 text-gray-900">
				<EditablePrice initialValue={product.price_unit || 0} onSave={handlePriceSave} fieldName="price_unit" />
			</td>
			<td className="px-6 py-4">
				{product.low_stock && (
					<div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-gray-100/60">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10 3L4.5 8.5L2 6"
								stroke="#667085"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				)}
			</td>
			<td className="px-6 py-4">
				<div className="flex justify-end gap-4">
					<button
						onClick={() => {
							if (mounted && window.confirm("Are you sure you want to delete this product?")) {
								deleteProduct(product.id);
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
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244-2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</button>
				</div>
			</td>
		</tr>
	);
};

export default TableRow;
