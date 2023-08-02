"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

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
