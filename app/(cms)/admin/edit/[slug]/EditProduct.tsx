"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useSaveProduct from "../../../hooks/useSaveProduct";
import Notification from "../../../components/Notification";
import ProductForm from "../../../components/ProductForm";
import { getCategories } from "@/lib/firebase";

export default function EditProduct({ product }) {
	const [categoryData, setData] = useState([]);
	const { saveProduct, error } = useSaveProduct();
	const [formValues, setFormValues] = useState(product);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (error) {
			toast.error("Error saving product");
		}
	}, [error]);

	const getInputValue = (e) => {
		switch (e.target.type) {
			case "file":
				return e.target.files[0];
			case "checkbox":
				return e.target.checked;
			default:
				return e.target.value;
		}
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
		saveProduct(formValues);

		if (!error) {
			toast.success("Product updated");
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
