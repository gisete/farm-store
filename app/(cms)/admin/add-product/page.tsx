// File: app/(cms)/admin/add-product/page.tsx
import AddProductClient from "./AddProductClient";
import { createClient } from "@/lib/supabase/server";

export default async function AddProduct() {
	const supabase = await createClient();

	const { data: categories } = await supabase.from("categories").select("*");
	const { data: products } = await supabase.from("products").select("id");

	const productsLength = products ? products.length : 0;

	return <AddProductClient categoryData={categories || []} productsLength={productsLength} />;
}
