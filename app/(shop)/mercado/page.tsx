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
		<div className="flex flex-col lg:flex-row">
			<div className="p-3 md:p-6 flex-[2.5]  md:border-r border-black">
				{!data || data.length === 0 ? <p>No products found.</p> : <Products products={data} />}
			</div>

			<div className="flex-1">
				<Cart />
			</div>
		</div>
	);
}
