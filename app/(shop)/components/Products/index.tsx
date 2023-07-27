import SingleProduct from "./SingleProduct";

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

const Products = ({ products }: ProductsProps) => {
	return (
		<div className="grid grid-cols-5 gap-4">
			{products.map((product, index) => (
				<SingleProduct product={product} key={`prod-${index}`} />
			))}
		</div>
	);
};

export default Products;
