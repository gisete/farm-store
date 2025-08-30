// File: app/(cms)/admin/categories/page.tsx
import AddCategoryForm from "../../components/AddCategoryForm";
import CategoriesTable from "../../components/CategoriesTable";
import { createClient } from "@/lib/supabase/server";

export default async function Categories() {
	const supabase = await createClient();
	const { data: categories } = await supabase.from("categories").select("*");

	return (
		<section>
			<div className="mb-5">
				<h1 className="text-2xl">Categories</h1>
			</div>
			<AddCategoryForm />
			<CategoriesTable categories={categories || []} />
		</section>
	);
}
