import SingleProduct from "./SingleProduct";
import ItemRow from "./ItemRow";

type ProductsProps = {
	products: [
		product: {
			image: string;
			name: string;
			description: string;
			price: number;
			unit: string;
			slug: string;
			category: string;
			isProductActive: boolean;
			lowStock: boolean;
			priceUnit: number;
		}
	];
};

const Products = ({ products }: ProductsProps) => {
	return (
		<>
			<h2 className="text-lg uppercase mb-2 tracking-wide font-semibold">Produção Própria</h2>
			<div className="flex flex-col" role="table">
				{products &&
					products
						.filter((product) => product.isProductActive && product.category !== "Parceiros")
						.map((product, index) => <ItemRow key={`prod-${index}`} product={product} />)}
			</div>

			<h2 className="text-lg mt-8 mb-2 uppercase tracking-wide font-semibold">Parceiros</h2>
			<div className="flex flex-col" role="table">
				{products &&
					products
						.filter((product) => product.isProductActive && product.category === "Parceiros")
						.map((product, index) => <ItemRow key={`prod-${index}`} product={product} />)}
			</div>
		</>
	);
};

export default Products;
