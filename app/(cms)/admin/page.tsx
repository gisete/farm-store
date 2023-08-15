import Image from "next/image";
import ProductsTable from "../components/ProductsTable";

export default function Admin() {
	return (
		<section>
			<div className="mb-5">
				<h1 className="text-2xl">Products</h1>
			</div>
			<ProductsTable />
		</section>
	);
}
