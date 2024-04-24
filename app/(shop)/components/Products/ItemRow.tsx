"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import { CartContext } from "../../providers/CartProvider";
import { set } from "firebase/database";

const ItemRow = ({ product }) => {
	const { cart, setCart } = useContext(CartContext);
	const productUnit = product.price ? "kg" : "un";
	const [chosenUnit, setchosenUnit] = useState(productUnit);
	const [quantity, setQuantity] = useState(0);
	const productPrice = product.price ? parseFloat(product.price) : parseFloat(product.priceUnit);

	function isInputValid(e: any) {
		const value = e.target.value;
		return value !== "" ? true : false;
	}

	const [order, setOrder] = useState({
		name: product.name,
		id: product.slug,
		price: productPrice,
		quantity: 0,
		unit: productUnit,
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
		const calculatedSubtotal = product.priceUnit ? product.priceUnit * parsedValue : 0;

		setOrder({
			...order,
			quantity: parsedValue,
			subTotal: calculatedSubtotal,
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
		<form className="grid border-b border-zinc-100 grid-cols-5 md:grid-cols-4 py-3 md:py-2 font-body" role="rowgroup">
			<div className="col-span-4 md:col-span-2 flex flex-col mb-2 md:mb-0" role="cell">
				<div> {product.name}</div>
				{product.description && (
					<div>
						<span className="font-light">{`${product.description}`}</span>
					</div>
				)}
			</div>
			<div
				className="col-start-5 md:col-auto col-span-2 md:col-span-1 flex md:items-center justify-self-end md:justify-self-auto"
				role="cell"
			>
				€{productPrice.toLocaleString("pt")}/{productUnit}
			</div>

			<div className="col-span-5 md:col-span-1 flex mt-2 md:mt-0 mb-2 md:mb-0 flex-col md:flex-row" role="cell">
				<div className="flex">
					<input
						type="text"
						id="quantity"
						className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-right text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-[80px] p-2 md:p-1 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2 leading-6"
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
						</div>
					</div>
				</div>

				<button
					type="button"
					className="text-white border bg-green-500 border-green-500 hover:bg-green-600 hover:text-white focus:ring-4 rounded w-full md:w-[40px] h-[45px] md:h-[40px] inline-flex items-center shrink-0 focus:outline-none focus:ring-blue-300 flex justify-center mt-4 md:mt-0 md:ml-6 "
					onClick={handleAddToCart}
				>
					Adicionar
				</button>
			</div>
		</form>
	);
};

export default ItemRow;
