"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/lib/supabase/actions";
import ProductForm from "../../../components/ProductForm";

export default function EditProduct({ product, categoryData }) {
	const [formValues, setFormValues] = useState(product);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const getInputValue = (e: React.ChangeEvent<any>): any => {
		const { type, id, value, checked, files } = e.target;
		if (type === "checkbox") return checked;
		if (type === "file") return files[0];
		if (id === "price" || id === "priceUnit") return parseFloat(value) || 0;
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
			await updateProduct(formValues);
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
				categoryData={categoryData}
				isLoading={isLoading}
			/>
		</section>
	);
}
