// File: app/(cms)/admin/edit/[slug]/page.tsx
import EditProduct from "./EditProduct";
import { createClient } from "@/lib/supabase/server";

async function getProductAndCategories(slug: string) {
	const supabase = await createClient();

	const { data: product } = await supabase.from("products").select("*").eq("slug", slug).single();
	const { data: categories } = await supabase.from("categories").select("*");

	// Map product data to camelCase for the form
	const formattedProduct = product
		? {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
				unit: product.unit,
				has_kg: product.has_kg,
				has_un: product.has_un,
				priceUnit: product.price_unit,
				lowStock: product.low_stock,
				is_active: product.is_active,
				slug: product.slug,
				position: product.position,
				category: product.category,
		  }
		: {};

	return { product: formattedProduct, categories: categories || [] };
}

export default async function GetProductBySlug({ params }: { params: { slug: string } }) {
	const { product, categories } = await getProductAndCategories(params.slug);

	return <EditProduct product={product} categories={categories} />;
}
