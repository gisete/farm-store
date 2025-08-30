import ProductsTable from "../components/ProductsTable";
import { createClient } from "@/lib/supabase/server";

export default async function Admin() {
	const supabase = await createClient();
	const { data: products, error } = await supabase.from("products").select("*").order("name", { ascending: true });

	if (error) {
		console.error("Error fetching products:", error);
	}

	return (
		<section>
			<div className="mb-5">
				<h1 className="text-2xl">Products</h1>
			</div>
			<ProductsTable products={products || []} />
		</section>
	);
}
