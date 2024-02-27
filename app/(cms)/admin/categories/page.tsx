"use client";

import { useState, useEffect } from "react";
import { database } from "@/lib/firebase-config";
import { ref, onValue } from "firebase/database";
import AddCategoryForm from "../../components/AddCategoryForm";
import CategoriesTable from "../../components/CategoriesTable";

export default function Categories() {
	const categoriesRef = ref(database, "categories");
	const [allCategories, setAllCategories] = useState([]);

	useEffect(() => {
		onValue(categoriesRef, (snapshot) => {
			const data = snapshot.val();
			var result = [];

			for (var slug in data) {
				const categories = data[slug];
				result.push(categories);
			}

			setAllCategories(result);
		});
	}, []);

	//todo: add loading state
	//todo: add error state
	return (
		<section>
			<div className="mb-5">
				<h1 className="text-2xl">Categories</h1>
			</div>

			<AddCategoryForm />

			<CategoriesTable categories={allCategories} />
		</section>
	);
}
