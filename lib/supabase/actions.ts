// File: lib/supabase/actions.ts
"use server";

import { createClient } from "./server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	// Validate inputs
	if (!email || !password) {
		return redirect("/login?message=Email and password are required");
	}

	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		// Log error for debugging (won't expose to user)
		console.error("Login error:", error.message);

		// Provide user-friendly error message
		const message = encodeURIComponent("Invalid email or password");
		return redirect(`/login?message=${message}`);
	}

	// Revalidate to ensure fresh data after login
	revalidatePath("/admin");
	return redirect("/admin");
}

export async function signOut() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	return redirect("/login");
}

export async function createProduct(productData: any) {
	const supabase = await createClient();

	// Map the form field names to database column names
	const mappedData = {
		name: productData.name,
		description: productData.description,
		category: productData.category,
		price: productData.price,
		unit: productData.unit,
		price_unit: productData.price_unit, // Form sends price_unit
		is_active: productData.is_active, // Form sends is_active
		low_stock: productData.low_stock, // Form sends low_stock
		has_kg: productData.has_kg, // Form sends has_kg
		has_un: productData.has_un, // Form sends has_un
		slug: productData.slug,
		position: productData.position,
	};

	const { data, error } = await supabase.from("products").insert([mappedData]).select();

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
			price_unit: productData.price_unit, // Changed from priceUnit
			is_active: productData.is_active, // Changed from isProductActive
			low_stock: productData.low_stock, // Changed from lowStock
			has_kg: productData.has_kg, // Changed from hasKg
			has_un: productData.has_un, // Changed from hasUn
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
