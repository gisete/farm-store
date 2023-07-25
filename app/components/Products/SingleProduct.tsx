import Image from "next/image";

type SingleProductProps = {
	product: {
		image: string;
		name: string;
		description: string;
		price: number;
	};
};

const SingleProduct = ({ product }: SingleProductProps) => {
	return (
		<div className="block bg-white p-6">
			<img src={product.image} className="relative" alt="" width={140} height={140} />
			<h5 className="mb-2 text-l font-medium leading-tight text-neutral-800 dark:text-neutral-50 pt-2">
				{product.name}
			</h5>
			<p>{product.description}</p>
			<p className="mb-2 text-base text-neutral-600 dark:text-neutral-200">
				€{product.price} <span className="text-sm text-gray-400">/un</span>
			</p>

			<form>
				<div className="mb-6 flex items-center">
					<input
						type="text"
						id="quantity"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-right text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
						placeholder="0"
						required
					/>
					{/* <p className="mr-auto text-gray-400 text-sm">un</p> */}
					<button
						type="button"
						className="text-white border bg-green-500 border-green-500 hover:bg-green-600 hover:text-white focus:ring-4 rounded-lg w-[40px] h-[40px] inline-flex items-center shrink-0 focus:outline-none focus:ring-blue-300 flex justify-center"
					>
						<Image className="relative" src="/img/icon-plus.svg" alt="" width={16} height={16} priority />
					</button>
				</div>
			</form>
		</div>
	);
};

export default SingleProduct;
