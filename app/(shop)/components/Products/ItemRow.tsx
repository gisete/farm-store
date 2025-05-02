"use client";
import { useState, useContext } from "react";
import { CartContext } from "../../providers/CartProvider"; // Context for managing the shopping cart

const ItemRow = ({ product }) => {
	// Access cart state and setter from context
	const { cart, setCart } = useContext(CartContext);

	// Determine the primary display price and unit label based on product data
	const displayPrice = product.price ? parseFloat(product.price) : parseFloat(product.priceUnit || 0);
	const displayUnitLabel = product.price ? "kg" : "unidade";

	// Determine initial unit selection (defaults to 'kg' if price exists, else 'un')
	const initialUnit = product.price ? "kg" : "un";

	// State for the quantity input field (stores raw user input including comma/period)
	const [quantity, setQuantity] = useState("");
	// State for the currently selected unit ('kg' or 'un')
	const [chosenUnit, setchosenUnit] = useState(initialUnit);

	// State for the product details to be added to the cart (no price/subtotal stored)
	const [cartProduct, setCartProduct] = useState({
		name: product.name,
		id: product.slug,
		quantity: 0, // Stores the parsed, numeric quantity
		unit: chosenUnit,
	});

	// Updates the chosen unit state when a radio button is clicked
	const handleRadioButton = (e) => {
		const newUnit = e.target.value;
		setchosenUnit(newUnit);
		setCartProduct((prev) => ({ ...prev, unit: newUnit }));
	};

	// Selects the input field's content on focus
	function handleFocus(event) {
		event.target.select();
	}

	// Handles changes in the quantity input field, allowing comma or period
	function handleQuantityChange(e) {
		const rawValue = e.target.value;
		if (rawValue === "") {
			setQuantity("");
			setCartProduct((prev) => ({ ...prev, quantity: 0 }));
			return;
		}
		// Standardize to period for parsing, validate format
		const sanitizedValue = rawValue.replace(",", ".");
		if (!/^(0|[1-9]\d*)?([,.]\d*)?$/.test(rawValue) || (rawValue.match(/[,.]/g)?.length ?? 0) > 1) {
			return; // Invalid format
		}
		const parsedValue = parseFloat(sanitizedValue);
		// Update state if valid number parsed
		if (!isNaN(parsedValue) && parsedValue >= 0) {
			setQuantity(rawValue); // Keep raw display value
			setCartProduct((prev) => ({ ...prev, quantity: parsedValue })); // Store numeric value
		} else if (rawValue === "0" || rawValue.endsWith(",") || rawValue.endsWith(".")) {
			// Allow intermediate valid typing (like "1,") but treat quantity as 0 for cart state
			setQuantity(rawValue);
			setCartProduct((prev) => ({ ...prev, quantity: 0 }));
		}
	}

	// Handles adding the item (quantity and unit) to the cart state
	function handleAddToCart(event) {
		event.preventDefault();
		// Validate quantity before adding
		if (cartProduct.quantity <= 0 || isNaN(cartProduct.quantity)) {
			return;
		}
		// Check if item with same ID and Unit already exists in cart
		const existingCartItemIndex = cart.findIndex(
			(item) => item.id === cartProduct.id && item.unit === cartProduct.unit
		);
		if (existingCartItemIndex > -1) {
			// Item exists: update quantity
			const updatedCart = [...cart];
			const existingItem = updatedCart[existingCartItemIndex];
			updatedCart[existingCartItemIndex] = {
				...existingItem,
				quantity: existingItem.quantity + cartProduct.quantity,
			};
			setCart(updatedCart);
		} else {
			// Item doesn't exist: add new item
			setCart([...cart, { ...cartProduct }]);
		}
		// Reset input field and quantity state for this row
		setQuantity("");
		setCartProduct((prev) => ({
			...prev,
			quantity: 0,
		}));
	}

	return (
		<form
			className="grid border-b border-zinc-100 grid-cols-5 md:grid-cols-5 py-3 md:py-2 font-body"
			role="rowgroup"
			onSubmit={handleAddToCart}
		>
			{/* Column 1: Product Name & Description */}
			<div className="col-span-4 md:col-span-2 flex flex-col mb-2 md:mb-0" role="cell">
				<div className="text-lg md:text-base">
					{product.name}
					{product.lowStock && (
						<div className="inline-flex items-center ml-2 px-3 py-1 text-gray-500 rounded gap-x-2 bg-gray-100/60 dark:bg-gray-800">
							<span className="relative text-red-400 uppercase font-semibold text-xs pr-px">low stock</span>
						</div>
					)}
				</div>
				{product.description && (
					<div>
						<span className="text-zinc-400">{`${product.description}`}</span>
					</div>
				)}
			</div>

			{/* Column 2: Static Price Display */}
			<div
				className="col-start-5 md:col-auto col-span-2 md:col-span-1 flex md:items-center justify-self-end md:justify-self-auto"
				role="cell"
			>
				€{displayPrice.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/
				{displayUnitLabel}
			</div>

			{/* Column 3: Input, Units, Button */}
			<div className="col-span-5 md:col-span-1 flex mt-2 md:mt-0 mb-2 md:mb-0 flex-col md:flex-row" role="cell">
				<div className="flex">
					{" "}
					{/* Input + Radios Container */}
					{/* Quantity Input */}
					<input
						type="text"
						inputMode="decimal"
						id={`quantity-${product.slug}`}
						name="quantity"
						min="0"
						className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-right text-body rounded focus:ring-blue-500 focus:border-blue-500 block w-[90px] md:w-[70px] md:h-[52px] p-2 md:p-1 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2 leading-6"
						onChange={handleQuantityChange}
						onFocus={handleFocus}
						value={quantity}
						placeholder="0"
						autoComplete="off"
					/>
					{/* Unit Selection Radio Buttons */}
					<div className="flex">
						{/* KG Option */}
						<div className="flex items-center custom-radio-container mr-1">
							<input
								type="radio"
								id={`${product.slug}-kg`}
								name={`unit-${product.slug}`}
								value="kg"
								checked={chosenUnit === "kg"}
								onChange={handleRadioButton}
							/>
							<span className="radio-checkmark"></span>
							<label htmlFor={`${product.slug}-kg`} className="pl-1 mr-2 text-sm text-light font-body cursor-pointer">
								kg
							</label>
						</div>
						{/* UN Option */}
						<div className="flex items-center custom-radio-container">
							<input
								type="radio"
								id={`${product.slug}-un`}
								name={`unit-${product.slug}`}
								value="un"
								checked={chosenUnit === "un"}
								onChange={handleRadioButton}
							/>
							<span className="radio-checkmark"></span>
							<label htmlFor={`${product.slug}-un`} className="pl-1 text-sm text-light font-body cursor-pointer">
								un
							</label>
						</div>
					</div>
				</div>

				{/* Add to Cart Button */}
				<button
					type="submit"
					className="text-white bg-amber-500 focus:ring-4 rounded w-full md:w-[130px] h-[45px] md:h-[40px] inline-flex items-center shrink-0 text-sm tracking-wide focus:outline-none focus:ring-blue-300 flex justify-center mt-4 md:mt-0 md:ml-4 uppercase"
					disabled={cartProduct.quantity <= 0 || isNaN(cartProduct.quantity)}
				>
					Adicionar
				</button>
			</div>
		</form>
	);
};

export default ItemRow;
