"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
	const [cart, setCart] = useState([
		{
			name: "Product 1",
			slug: "product-1",
			price: 4,
			quantity: 2,
			unit: "un",
			get subTotal() {
				return this.price * this.quantity;
			},
		},
		{
			name: "Product 2",
			slug: "product-2",
			price: 2,
			quantity: 5,
			unit: "un",
			get subTotal() {
				return this.price * this.quantity;
			},
		},
	]);

	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const cartTotal = cart.reduce((acc, item) => acc + item.subTotal, 0);
		setCartTotal(cartTotal);
	}, [cart]);

	const value = {
		cart,
		setCart,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
