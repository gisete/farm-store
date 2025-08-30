// File: lib/supabase/actions.ts
"use server";

import { createClient } from "./server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return redirect("/login?message=Could not authenticate user");
	}

	return redirect("/admin");
}

export async function signOut() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	return redirect("/login");
}

export async function createProduct(productData: any) {
	const supabase = await createClient();
	const { data, error } = await supabase.from("products").insert([productData]).select();

	if (error) {
		console.error("Error creating product:", error);
		throw new Error("Failed to create product.");
	}

	revalidatePath("/admin");
	return data;
}

export async function updateProduct(productData: any) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("products")
		.update({
			name: productData.name,
			description: productData.description,
			category: productData.category,
			price: productData.price,
			price_unit: productData.priceUnit,
			is_active: productData.isProductActive,
			low_stock: productData.lowStock,
			has_kg: productData.hasKg,
			has_un: productData.hasUn,
		})
		.eq("id", productData.id);

	if (error) {
		console.error("Error updating product:", error);
		throw new Error("Failed to update product.");
	}

	revalidatePath("/admin");
	revalidatePath(`/admin/edit/${productData.slug}`);
	return data;
}

export async function deleteProduct(id: number) {
	const supabase = await createClient();
	const { error } = await supabase.from("products").delete().eq("id", id);

	if (error) {
		console.error("Error deleting product:", error);
		throw new Error("Failed to delete product.");
	}

	revalidatePath("/admin");
}

export async function updateProductField(id: number, field: string, value: any) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("products")
		.update({ [field]: value })
		.eq("id", id);

	if (error) {
		console.error(`Error updating product field ${field}:`, error);
		throw new Error(`Failed to update product ${field}.`);
	}

	revalidatePath("/admin");
	return data;
}

// --- CATEGORY ACTIONS ---

export async function createCategory(formData: FormData) {
	const name = formData.get("name") as string;
	const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/\s+/g, "-");

	if (!name || !slug) {
		throw new Error("Name and slug are required.");
	}

	const supabase = await createClient();
	const { data, error } = await supabase.from("categories").insert([{ name, slug }]).select();

	if (error) {
		console.error("Error creating category:", error);
		throw new Error("Failed to create category.");
	}

	revalidatePath("/admin/categories");
	return data;
}

export async function deleteCategory(slug: string) {
	const supabase = await createClient();
	const { error } = await supabase.from("categories").delete().eq("slug", slug);

	if (error) {
		console.error("Error deleting category:", error);
		throw new Error("Failed to delete category.");
	}

	revalidatePath("/admin/categories");
}
