// File: app/(shop)/components/Products/index.tsx
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
			// NOTE: Field name change
			is_active: boolean;
			low_stock: boolean;
			price_unit: number;
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
						// NOTE: Field name change from is_active to is_active
						.filter((product) => product.is_active && product.category !== "Parceiros")
						.map((product, index) => <ItemRow key={`prod-${index}`} product={product} />)}
			</div>

			<h2 className="text-lg mt-8 mb-2 uppercase tracking-wide font-semibold">Parceiros</h2>
			<div className="flex flex-col" role="table">
				{products &&
					products
						// NOTE: Field name change from is_active to is_active
						.filter((product) => product.is_active && product.category === "Parceiros")
						.map((product, index) => <ItemRow key={`prod-${index}`} product={product} />)}
			</div>
		</>
	);
};

export default Products;
