import { getProductBySlug } from "@/lib/supabase/actions";
import EditProduct from "./EditProduct";
import Link from "next/link";

async function getProduct(slug: string) {
	const productData = await getProductBySlug(slug);

	if (!productData) {
		return null;
	}

	const formattedProduct = {
		id: productData.id,
		name: productData.name,
		description: productData.description,
		price: productData.price,
		unit: productData.unit,
		priceUnit: productData.price_unit,
		lowStock: productData.low_stock,
		isProductActive: productData.is_active,
		slug: productData.slug,
		position: productData.position,
		category: productData.category,
		hasKg: productData.has_kg,
		hasUn: productData.has_un,
	};

	return formattedProduct;
}

export default async function GetProductBySlug({ params }: { params: { slug: string } }) {
	const product = await getProduct(params.slug);

	if (!product) {
		return (
			<section>
				<div className="mb-8">
					<h1 className="text-2xl">Product Not Found</h1>
					<p>
						The product you are trying to edit does not exist.{" "}
						<Link href="/admin" className="text-green-500 hover:underline">
							Return to Products list
						</Link>
					</p>
				</div>
			</section>
		);
	}

	return <EditProduct product={product} />;
}
