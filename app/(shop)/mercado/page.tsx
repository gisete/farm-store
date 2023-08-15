import Products from "../components/Products";
import Cart from "../components/Cart";
import { getProducts } from "@lib/firebase";

type ProductsProps = {
	products: [
		product: {
			image: string;
			name: string;
			description: string;
			price: number;
			unit: string;
			slug: string;
		}
	];
};

async function getMyProducts() {
	const res = await getProducts();
	return res;
}

export default async function Home() {
	const { data }: ProductsProps | any = await getMyProducts();

	return (
		<div className="flex flex-row items-start">
			<div className="flex flex-col z-10 max-w-5xl items-center text-sm lg:flex pt-8 mr-auto">
				{!data || data.length === 0 ? <p>No products found.</p> : <Products products={data} />}
			</div>

			<div className="flex items-center justify-between">
				<Cart />
			</div>
		</div>
	);
}
