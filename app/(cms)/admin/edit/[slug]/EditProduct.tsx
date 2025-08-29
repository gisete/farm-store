"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useSaveProduct from "../../../hooks/useSaveProduct";
import Notification from "../../../components/Notification";
import ProductForm from "../../../components/ProductForm";
import { getCategories } from "@/lib/supabase/actions";
import { useRouter } from "next/navigation"; // Import useRouter

export default function EditProduct({ product }) {
	const [categoryData, setData] = useState([]);
	const { saveProduct, isLoading } = useSaveProduct();
	const [formValues, setFormValues] = useState(product);
	const router = useRouter(); // Initialize router

	const getInputValue = (e) => {
		const { type, id, value, checked, files } = e.target;

		if (id === "price" || id === "priceUnit") {
			if (value === "") return "";
			const numValue = parseFloat(value);
			return isNaN(numValue) ? "" : numValue;
		}
		if (type === "checkbox") {
			return checked;
		}
		if (type === "file") {
			return files[0];
		}
		return value;
	};

	const handleFormChange = (e) => {
		const id = e.target.id;
		const newValue = getInputValue(e);

		setFormValues({
			...formValues,
			[id]: newValue,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			await saveProduct(formValues);
			toast.success("Product updated successfully!");
			// --- FIX: Add delay before redirect ---
			setTimeout(() => {
				router.push("/admin");
			}, 1000);
		} catch (err) {
			toast.error("Failed to update product.");
		}
	};

	useEffect(() => {
		getCategories()
			.then(({ data }) => {
				if (!data) return;
				setData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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

			<Notification />
		</section>
	);
}
