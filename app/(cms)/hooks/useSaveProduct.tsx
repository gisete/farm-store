"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/lib/supabase/actions";

export default function useSaveProduct() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const saveProduct = async (formValues: any) => {
		setIsLoading(true);
		setError(null);
		try {
			if (formValues.id) {
				await updateProduct(formValues);
			} else {
				await createProduct(formValues);
			}
		} catch (err: any) {
			setError(err);
			console.error("Error in saveProduct hook:", err);
			// Re-throw the error so the component's try/catch can handle it for toasts
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		saveProduct,
		error,
	};
}
