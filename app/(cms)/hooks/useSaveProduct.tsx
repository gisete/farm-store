import { useState, useEffect, useRef } from "react";
import { createProduct } from "@/lib/firebase";
import { set } from "firebase/database";

export default function () {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	function saveProduct(newFormValues) {
		createProduct(newFormValues)
			.then(() => {
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				console.error(err);
			});
	}

	return {
		isLoading,
		saveProduct,
		error,
	};
}
