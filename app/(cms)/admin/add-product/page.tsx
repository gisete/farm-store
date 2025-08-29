"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/supabase/actions";
import toast from "react-hot-toast";
import Notification from "../../components/Notification";
import ProductForm from "../../components/ProductForm";
import useSaveProduct from "../../hooks/useSaveProduct";
import useGetProducts from "../../hooks/useGetProducts";
import { useRouter } from "next/navigation"; // Import useRouter

type Category = {
	name: string;
	slug: string;
};

export default function AddProduct() {
	const [categoryData, setData] = useState<Category[]>([]);
	const { saveProduct, isLoading, error } = useSaveProduct();
	const { getProductsLength, productsLength } = useGetProducts();
	const router = useRouter(); // Initialize router

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

	useEffect(() => {
		getProductsLength();
	}, []);

	useEffect(() => {
		getCategories()
			.then(({ data }) => {
				if (data) {
					setData(data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const resetForm = () => {
		setFormValues(initialFormValues);
	};

	const getInputValue = (e: React.ChangeEvent<any>) => {
		const { type, id, value, checked, files } = e.target;

		// Convert price fields to numbers, default to 0 if invalid
		if (id === "price" || id === "priceUnit") {
			const numValue = parseFloat(value);
			return isNaN(numValue) ? 0 : numValue;
		}
		if (type === "checkbox") {
			return checked;
		}
		if (type === "file") {
			return files[0];
		}
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
				.replace(/\p{Diacritic}/gu, "");

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
		try {
			await saveProduct(formValues);
			toast.success("Product added successfully!");
			resetForm();
			// --- FIX: Add delay before redirect ---
			setTimeout(() => {
				router.push("/admin");
			}, 1500);
		} catch (err) {
			toast.error("Failed to add product.");
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

			<Notification />
		</section>
	);
}
