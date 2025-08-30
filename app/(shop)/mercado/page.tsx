import Products from "../components/Products";
import Cart from "../components/Cart";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const revalidate = 3600; // 1 hour instead of 60 seconds

async function getProducts() {
	const supabase = await createClient();

	try {
		const { data, error } = await supabase.from("products").select("*");

		if (error) {
			console.error("Error fetching products:", error);
			return [];
		}

		return (data || []).sort((a, b) => a.name.localeCompare(b.name, "pt-PT"));
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}

export default async function Home() {
	const allProducts = await getProducts();

	return (
		<div className="flex flex-col lg:flex-row">
			<div className="p-3 pt-6 md:p-6 md:pt-10 flex-[2.5] md:border-r border-black">
				<Products products={allProducts} />
			</div>

			<div className="flex-1 relative">
				<Cart />
			</div>
		</div>
	);
}
