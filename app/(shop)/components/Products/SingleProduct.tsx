"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import { CartContext } from "../../providers/CartProvider";
import { set } from "firebase/database";

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
	const [chosenUnit, setchosenUnit] = useState(product.unit);

	const [order, setOrder] = useState({
		name: product.name,
		id: product.slug,
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

	const handleRadioButton = (e) => {
		setchosenUnit(e.target.value);
		setOrder({
			...order,
			unit: e.target.value,
		});
	};

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
			<Image
				src={product.image}
				alt=""
				width={140}
				height={186}
				className="w-[140px] h-[186px] object-cover border border-gray-900 mb-2"
			/>
			<h5 className="mb-1 text-l font-medium leading-tight text-neutral-800 dark:text-neutral-50 pt-2 text-base">
				{product.name}
			</h5>
			<p className="font-light italic mb-3">{product.description}</p>
			<p className="mb-2">
				€{product.price} /{product.unit}
			</p>

			<form>
				<div className="mb-2 flex items-center">
					<input
						type="text"
						id="quantity"
						className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-right text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-16 p-2 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
						placeholder="0"
						required
						onChange={handleQuantityChange}
					/>
					{/* <p className="mr-auto text-gray-400 text-sm">un</p> */}
					<button
						type="button"
						className="text-white border bg-green-500 border-green-500 hover:bg-green-600 hover:text-white focus:ring-4 rounded w-[40px] h-[40px] inline-flex items-center shrink-0 focus:outline-none focus:ring-blue-300 flex justify-center"
						onClick={handleAddToCart}
					>
						<Image className="relative" src="/img/icon-plus.svg" alt="" width={16} height={16} priority />
					</button>
				</div>
				<div>
					<div className="flex">
						<div className="flex items-center custom-radio-container mr-2">
							<input
								type="radio"
								id={`${product.slug}-kg`}
								name="unit"
								value="kg"
								checked={chosenUnit === "kg"}
								onChange={handleRadioButton}
							/>
							<span className="radio-checkmark"></span>
							<label htmlFor={`${product.slug}-kg`} className="pl-1 mr-2 text-sm text-light font-body">
								kg
							</label>
						</div>

						<div className="flex items-center custom-radio-container">
							<input
								type="radio"
								id={`${product.slug}-un`}
								name="unit"
								value="un"
								checked={chosenUnit === "un"}
								onChange={handleRadioButton}
							/>
							<span className="radio-checkmark"></span>
							<label htmlFor={`${product.slug}-un`} className="pl-1 text-sm text-light font-body">
								un
							</label>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SingleProduct;
