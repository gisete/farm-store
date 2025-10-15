"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/lib/supabase/actions";
import ProductForm from "../../../components/ProductForm";

export default function EditProduct({ product, categories }) {
	const [formValues, setFormValues] = useState(product);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const getInputValue = (e: React.ChangeEvent<any>): any => {
		const { type, id, value, checked, files } = e.target;
		if (type === "checkbox") return checked;
		if (type === "file") return files[0];
		// For price fields, keep as string to allow comma input
		return value;
	};

	const handleFormChange = (e: React.ChangeEvent<any>) => {
		const id = e.target.id;
		const newValue = getInputValue(e);
		setFormValues({ ...formValues, [id]: newValue });
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			// Map camelCase form values to snake_case database fields
			// Convert comma to period for decimal separator and parse to number
			const normalizePrice = (value: any) => {
				const normalized = String(value).replace(",", ".");
				return parseFloat(normalized) || 0;
			};

			const productData = {
				...formValues,
				price: normalizePrice(formValues.price),
				price_unit: normalizePrice(formValues.priceUnit),
				low_stock: formValues.lowStock,
			};
			await updateProduct(productData);
			toast.success("Product updated successfully!");
			setTimeout(() => {
				router.push("/admin");
			}, 1500);
		} catch (error) {
			toast.error("Failed to update product.");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section>
			<div className="mb-8">
				<h1 className="text-2xl">Edit Product</h1>
			</div>

			<ProductForm
				formValues={formValues}
				setFormValues={setFormValues}
				handleFormChange={handleFormChange}
				handleFormSubmit={handleFormSubmit}
				categoryData={categories}
				isLoading={isLoading}
			/>
		</section>
	);
}
