import Image from "next/image";
import Products from "../components/Products";
import Cart from "../components/Cart";
import { getProducts } from "@lib/firebase";

async function getMyProducts() {
	const res = await getProducts();
	return res;
}

export default async function Home() {
	const { data } = await getMyProducts();

	return (
		<div className="flex flex-row">
			<div className="flex flex-col z-10 max-w-5xl items-center font-mono text-sm lg:flex">
				<h2>Week of June 30th</h2>
				<Products products={data} />
			</div>

			<div className="flex items-center justify-between">
				<Cart />
			</div>
		</div>
	);
}
