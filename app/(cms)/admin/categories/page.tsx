"use client";

import { useState, useEffect } from "react";
import AddCategoryForm from "../../components/AddCategoryForm";
import CategoriesTable from "../../components/CategoriesTable";
import { getCategories } from "@/lib/supabase/actions";

export default function Categories() {
	const [allCategories, setAllCategories] = useState([]);

	const fetchCategories = async () => {
		const { data } = await getCategories();
		if (data) {
			setAllCategories(data);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	//todo: add loading state
	//todo: add error state
	return (
		<section>
			<div className="mb-5">
				<h1 className="text-2xl">Categories</h1>
			</div>

			<AddCategoryForm onCategoryAdded={fetchCategories} />

			<CategoriesTable categories={allCategories} onCategoryDeleted={fetchCategories} />
		</section>
	);
}
