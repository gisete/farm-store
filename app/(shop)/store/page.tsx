import Image from "next/image";
import Products from "../../components/Products";
import Cart from "../../components/Cart";
import { getProducts } from "@lib/firebase";

async function getMyProducts() {
	const res = await getProducts();
	return res;
}

export default async function Home() {
	const { data } = await getMyProducts();

	return (
		<div className="flex flex-col items-center justify-between p-10">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
				<h2>Week of June 30th</h2>
			</div>

			<Products products={data} />
		</div>
	);
}
