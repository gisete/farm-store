"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import { CartContext } from "../../providers/CartProvider";

type SingleProductProps = {
	product: {
		image: string;
		name: string;
		slug: string;
		description: string;
		price: number;
		unit: string;
	};
};

const SingleProduct = ({ product }: SingleProductProps) => {
	const { cart, setCart } = useContext(CartContext);

	const [order, setOrder] = useState({
		name: product.name,
		price: product.price,
		quantity: 0,
		unit: product.unit,
		subTotal: 0,
	});

	function isInputValid(e: any) {
		const value = e.target.value;
		return value !== "" ? true : false;
	}

	function productExistsInCart() {
		return cart.some((item) => item.name === order.name);
	}

	function handleQuantityChange(e: any) {
		const canAddToCart = isInputValid(e);
		const parsedValue = parseFloat(e.target.value.replace(/,/, "."));

		if (canAddToCart)
			setOrder({
				...order,
				quantity: parsedValue,
				subTotal: order.price * parsedValue,
			});
	}

	function handleAddToCart() {
		if (productExistsInCart()) {
			const updatedCart = cart.map((item) => {
				if (item.name === order.name) {
					console.log("item", item);
					console.log("order", order);
					return {
						...item,
						quantity: item.quantity + order.quantity,
						subTotal: item.subTotal + order.subTotal,
					};
				}
				return item;
			});
			setCart(updatedCart);
			return;
		}
		setCart([...cart, order]);
	}

	return (
		<div className="block bg-white p-6">
			<img src={product.image} className="relative" alt="" width={140} height={140} />
			<h5 className="mb-2 text-l font-medium leading-tight text-neutral-800 dark:text-neutral-50 pt-2">
				{product.name}
			</h5>
			<p>{product.description}</p>
			<p className="mb-2 text-base text-neutral-600 dark:text-neutral-200">
				€{product.price} <span className="text-sm text-gray-400">/{product.unit}</span>
			</p>

			<form>
				<div className="mb-6 flex items-center">
					<input
						type={product.unit === "kg" ? "text" : "number"}
						id="quantity"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-right text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
						placeholder="0"
						required
						onChange={handleQuantityChange}
					/>
					{/* <p className="mr-auto text-gray-400 text-sm">un</p> */}
					<button
						type="button"
						className="text-white border bg-green-500 border-green-500 hover:bg-green-600 hover:text-white focus:ring-4 rounded-lg w-[40px] h-[40px] inline-flex items-center shrink-0 focus:outline-none focus:ring-blue-300 flex justify-center"
						onClick={handleAddToCart}
					>
						<Image className="relative" src="/img/icon-plus.svg" alt="" width={16} height={16} priority />
					</button>
				</div>
			</form>
		</div>
	);
};

export default SingleProduct;
