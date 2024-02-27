"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/lib/firebase";
import toast from "react-hot-toast";
import Notification from "../../components/Notification";
import ProductForm from "../../components/ProductForm";
import useSaveProduct from "../../hooks/useSaveProduct";
import useGetProducts from "../../hooks/useGetProducts";
import { get } from "http";

type CategoryState = string[];

export default function AddProduct() {
	const [categoryData, setData] = useState<CategoryState>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { saveProduct, error } = useSaveProduct();
	const { getProductsLength, productsLength } = useGetProducts();

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
	};

	const [formValues, setFormValues] = useState(initialFormValues);

	useEffect(() => {
		getProductsLength();
	}, []);

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

	useEffect(() => {
		if (error) {
			toast.error("Error saving product");
		}
	}, [error]);

	const resetForm = () => {
		setFormValues(initialFormValues);
	};

	const getInputValue = (e: React.ChangeEvent<any>): void => {
		switch (e.target.type) {
			case "file":
				return e.target.files[0];
			case "checkbox":
				return e.target.checked;
			default:
				return e.target.value;
		}
	};

	const handleFormChange = (e: React.ChangeEvent<any>): void => {
		const id = e.target.id;
		const newValue = getInputValue(e);
		const productSlug = formValues.name.toLowerCase().replace(/\s+/g, "-");
		const productQuantity = formValues.priceUnit;

		setFormValues({
			...formValues,
			[id]: newValue,
			slug: productSlug,
			position: productsLength + 1,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		saveProduct(formValues);

		if (!error) {
			toast.success("Product added");
			resetForm();
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
