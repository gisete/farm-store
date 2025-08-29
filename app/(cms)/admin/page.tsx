import ProductsTable from "../components/ProductsTable";
import { getProducts } from "@/lib/supabase/actions";

export default async function Admin() {
	// Fetch data on the server
	const { data: products } = await getProducts();

	return (
		<section>
			<div className="mb-5">
				<h1 className="text-2xl">Products</h1>
			</div>
			{/* Pass the fetched products as a prop */}
			<ProductsTable products={products} />
		</section>
	);
}
