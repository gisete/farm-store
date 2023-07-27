import Image from "next/image";
import Products from "./(shop)/components/Products";
import Cart from "./(shop)/components/Cart";
import { getProducts } from "@lib/firebase";

// export async function getServerSideProps() {
// 	const products = await getProducts();

// 	return {
// 		props: {
// 			products,
// 		},
// 	};
// }
async function getMyProducts() {
	const res = await getProducts();
	const products = await res.json();

	return products;
}

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-between p-10">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
				<h2>Week of June 30th</h2>
			</div>

			<Products />
		</div>
	);
}
