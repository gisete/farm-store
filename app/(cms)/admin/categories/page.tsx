import { useState } from "react";
import { getCategories } from "@/lib/firebase";
import AddCategoryForm from "../../components/AddCategoryForm";
import CategoriesTable from "../../components/CategoriesTable";

async function getFirebaseCategories() {
	const res = await getCategories();
	return res;
}

export default async function Categories() {
	const { data } = await getFirebaseCategories();
	//todo: add loading state
	//todo: add error state
	return (
		<section className="p-10">
			<div className="mb-5">
				<h1 className="text-2xl">Categories</h1>
			</div>

			<AddCategoryForm />

			<CategoriesTable categories={data} />
		</section>
	);
}
