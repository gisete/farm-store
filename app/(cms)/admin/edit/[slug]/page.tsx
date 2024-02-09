import { getProductBySlug } from "@lib/firebase";
import EditProduct from "./EditProduct";

async function getProduct(slug: string) {
	const res = await getProductBySlug(slug);
	return res;
}

export default async function GetProductBySlug({ params }: { params: { slug: string } }) {
	const product = await getProduct(params.slug);

	return <EditProduct product={product ? product : {}} />;
}
