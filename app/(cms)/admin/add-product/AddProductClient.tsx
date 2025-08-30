"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductForm from "../../components/ProductForm";
import { createProduct } from "@/lib/supabase/actions";

export default function AddProductClient({ categoryData, productsLength }) {
	const router = useRouter();

	const initialFormValues = {
		name: "",
		description: "",
		price: 0,
		unit: "kg",
		hasKg: true,
		hasUn: false,
		priceUnit: 0,
		lowStock: false,
		isProductActive: true,
		slug: "",
		position: 0,
		category: "producao-propria",
	};

	const [formValues, setFormValues] = useState(initialFormValues);
	const [isLoading, setIsLoading] = useState(false);

	const getInputValue = (e: React.ChangeEvent<any>): any => {
		const { type, id, value, checked, files } = e.target;
		if (type === "checkbox") return checked;
		if (type === "file") return files[0];
		if (id === "price" || id === "priceUnit") return parseFloat(value) || 0;
		return value;
	};

	const handleFormChange = (e: React.ChangeEvent<any>): void => {
		const id = e.target.id;
		const newValue = getInputValue(e);

		setFormValues((prevValues) => {
			const newName = id === "name" ? newValue : prevValues.name;
			const productSlug = newName
				.toLowerCase()
				.replace(/\s+/g, "-")
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");

			return {
				...prevValues,
				[id]: newValue,
				slug: productSlug,
				position: productsLength + 1,
			};
		});
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await createProduct(formValues);
			toast.success("Product added successfully!");
			setTimeout(() => {
				router.push("/admin");
			}, 1500);
		} catch (error) {
			toast.error("Failed to add product.");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section>
			<div className="mb-8">
				<h1 className="text-2xl">Add Product</h1>
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
