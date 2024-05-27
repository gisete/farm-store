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
			isProductActive: boolean;
		}
	];
};

const Products = ({ products }: ProductsProps) => {
	return (
		<>
			<div className="flex flex-col" role="table">
				{products &&
					products
						.filter((product) => product.isProductActive)
						.map((product, index) => <ItemRow key={`prod-${index}`} product={product} />)}
			</div>
		</>
	);
};

export default Products;
