"use server";
import { createClient } from "@lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// AUTH ACTIONS
export async function signIn(email, password) {
	const supabase = createClient();
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		console.error("Error signing in:", error);
		throw error;
	}
	return data;
}

export async function signOut() {
	const supabase = createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error("Error signing out:", error);
		throw error;
	}
}

// PRODUCTS

export const getProducts = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from("products").select().order("name", { ascending: true });
	if (error) {
		console.error("Error fetching products:", error);
		return { data: null, error };
	}
	return { data, error: null };
};

export const getProductBySlug = async (slug: string) => {
	const supabase = createClient();
	const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
	if (error) {
		console.error("Error fetching product by slug:", error);
		return null;
	}
	return data;
};

export const createProduct = async (product: any) => {
	const supabase = createClient();
	const { data, error } = await supabase.from("products").insert([
		{
			name: product.name,
			description: product.description,
			price: product.price,
			unit: product.unit,
			price_unit: product.priceUnit,
			low_stock: product.lowStock,
			is_active: product.isProductActive,
			slug: product.slug,
			position: product.position,
			category: product.category,
			has_kg: product.hasKg,
			has_un: product.hasUn,
		},
	]);
	if (error) {
		console.error("Error creating product:", error);
		throw error;
	}

	revalidatePath("/admin");
};

export const updateProduct = async (product: any) => {
	const supabase = createClient();

	const productData = {
		name: product.name,
		description: product.description,
		price: product.price,
		unit: product.unit,
		price_unit: product.priceUnit,
		low_stock: product.lowStock,
		is_active: product.isProductActive,
		slug: product.slug,
		position: product.position,
		category: product.category,
		has_kg: product.hasKg,
		has_un: product.hasUn,
	};

	const { data, error } = await supabase.from("products").update(productData).eq("id", product.id).select();

	if (error) {
		console.error("Error updating product:", error);
		throw error;
	}

	revalidatePath("/admin");
	revalidatePath(`/admin/edit/${product.slug}`);
};

export const toggleProductStatus = async (productId: string, isActive: boolean) => {
	const supabase = createClient();
	const { error } = await supabase.from("products").update({ is_active: isActive }).eq("id", productId);

	if (error) {
		console.error("Error updating product status:", error);
		throw error;
	}

	revalidatePath("/admin");
};

// --- NEW FUNCTION to handle in-place price edits ---
export const updateProductField = async (productId: string, field: "price" | "price_unit", value: number) => {
	const supabase = createClient();
	const { error } = await supabase
		.from("products")
		.update({ [field]: value })
		.eq("id", productId);

	if (error) {
		console.error(`Error updating ${field}:`, error);
		throw error;
	}

	revalidatePath("/admin");
};

export const deleteProduct = async (slug: string) => {
	const supabase = createClient();
	const { error } = await supabase.from("products").delete().eq("slug", slug);
	if (error) {
		console.error("Error deleting product:", error);
		throw error;
	}
	revalidatePath("/admin");
};

// CATEGORIES

export const getCategories = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from("categories").select();
	if (error) {
		console.error("Error fetching categories:", error);
		return { data: null, error };
	}
	return { data, error: null };
};

export const createCategory = async (category: { name: string; slug: string }) => {
	const supabase = createClient();
	const { data, error } = await supabase.from("categories").insert([category]);
	if (error) {
		console.error("Error creating category:", error);
		throw error;
	}
	revalidatePath("/admin/categories");
};

export const deleteCategory = async (slug: string) => {
	const supabase = createClient();
	const { error } = await supabase.from("categories").delete().eq("slug", slug);
	if (error) {
		console.error("Error deleting category:", error);
		throw error;
	}
	revalidatePath("/admin/categories");
};
