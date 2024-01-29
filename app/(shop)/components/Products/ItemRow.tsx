"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import { CartContext } from "../../providers/CartProvider";
import { set } from "firebase/database";

const ItemRow = ({ product }) => {
	const { cart, setCart } = useContext(CartContext);
	const [chosenUnit, setchosenUnit] = useState(product.unit);
	const [quantity, setQuantity] = useState(0);

	function isInputValid(e: any) {
		const value = e.target.value;
		return value !== "" ? true : false;
	}

	const [order, setOrder] = useState({
		name: product.name,
		id: product.slug,
		price: product.price,
		quantity: 0,
		unit: product.unit,
		subTotal: 0,
	});

	const handleRadioButton = (e) => {
		setchosenUnit(e.target.value);
		setOrder({
			...order,
			unit: e.target.value,
		});
	};

	function handleFocus(event: any) {
		event.target.select();
	}

	function productExistsInCart() {
		return cart.some((item) => item.name === order.name);
	}

	function handleQuantityChange(e: any) {
		if (isNaN(e.target.value)) return;
		const parsedValue = parseFloat(e.target.value.replace(/,/, "."));
		setQuantity(e.target.value);

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
			setQuantity(0);
			return;
		}

		setQuantity(0);

		setCart([...cart, order]);
	}

	return (
		<form className="grid border-b grid-cols-6 py-2 font-body" role="rowgroup">
			<div className="col-span-3 flex items-center" role="cell">
				{product.name} ({product.description})
			</div>
			<div className=" flex items-center" role="cell">
				€{product.price}/{product.unit}
			</div>

			<div className="flex" role="cell">
				<input
					type="text"
					id="quantity"
					className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-right text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-14 p-1 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
					value={quantity === 0 ? "" : quantity}
					required
					onChange={handleQuantityChange}
					onFocus={handleFocus}
				/>

				<div className="flex">
					<div className="flex items-center custom-radio-container mr-1">
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

						<button
							type="button"
							className="ml-6 text-white border bg-green-500 border-green-500 hover:bg-green-600 hover:text-white focus:ring-4 rounded w-[40px] h-[40px] inline-flex items-center shrink-0 focus:outline-none focus:ring-blue-300 flex justify-center"
							onClick={handleAddToCart}
						>
							<Image className="relative" src="/img/icon-plus.svg" alt="" width={16} height={16} priority />
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default ItemRow;
